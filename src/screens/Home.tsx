import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  fetchCategories,
  fetchAreas,
  fetchMeals,
  fetchMealsBySearch,
  fetchMealsByCategory,
  fetchMealsByArea,
} from '../api';
import { useSelector } from 'react-redux';
import CartButton from '../components/CartButton';

const HomeScreen = () => {
  const [dishesData, setDishesData] = useState([]);
  const [categData, setCategData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currCategory, setCurrCategory] = useState('Category');
  const [currArea, setCurrArea] = useState('Area');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAreaDropdownVisible, setIsAreaDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const hasItemsInCart = cartItems.length > 0;

  // fetch all categories 
  useEffect(() => {
    const fetchInitialCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategData(categories);
      } catch (error) {
        console.error('Error fetching initial categories:', error);
      }
    };

    fetchInitialCategories();
  }, []);

  useEffect(() => {
    const fetchInitialAreas = async () => {
      try {
        const areas = await fetchAreas();
        setAreaData(areas);
      } catch (error) {
        console.error('Error fetching initial areas:', error);
      }
    };

    fetchInitialAreas();
  }, []);

  useEffect(() => {
    const fetchInitialMeals = async () => {
      try {
        const meals = await fetchMeals();
        setDishesData(meals);
      } catch (error) {
        console.error('Error fetching initial meals:', error);
      }
    };

    fetchInitialMeals();
  }, []);

  useEffect(() => {
    const fetchMealsBySearchTerm = async () => {
      try {
        if (searchTerm) {
          const meals = await fetchMealsBySearch(searchTerm);
          setDishesData(meals);
        }
      } catch (error) {
        console.error('Error fetching meals by search term:', error);
      }
    };

    fetchMealsBySearchTerm();
  }, [searchTerm]);

  const handleCategorySelect = async (category) => {
    try {
      const meals = await fetchMealsByCategory(category);
      setCurrCategory(category);
      setDishesData(meals);
      setIsDropdownVisible(false);
      setCurrArea('Area');
    } catch (error) {
      console.error('Error fetching meals by category:', error);
    }
  };

  const handleAreaSelect = async (area) => {
    try {
      const meals = await fetchMealsByArea(area);
      setCurrArea(area);
      setDishesData(meals);
      setIsAreaDropdownVisible(false);
      setCurrCategory('Category');
    } catch (error) {
      console.error('Error fetching meals by area:', error);
    }
  };

  const fetchAllMeals = async () => {
    try {
      const meals = await fetchMeals();
      setDishesData(meals);
      setCurrCategory('Category');
      setCurrArea('Area');
    } catch (error) {
      console.error('Error fetching all meals:', error);
    }
  };
  

  const renderDish = ({item}) => (
    <TouchableOpacity
      style={styles.dishContainer}
      onPress={() => navigation.navigate('SingleDish', {dishId: item.idMeal})}>
      <View style={styles.dishItem}>
        <Image source={{uri: item.strMealThumb}} style={styles.dishImage} />
        <Text style={styles.dishTitle}>{item.strMeal}</Text>
        <View style={styles.dishInfo}>
          <Text style={styles.dishCategory}>{item.strCategory}</Text>
          <Text style={styles.dishOrigin}>{item.strArea}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Text style={styles.hamburger}>☰</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Order&Go</Text>
              <TouchableOpacity>

              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search here"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Image
                  source={require('../img/filtre.png')}
                  style={styles.filterIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.banner}>
              <Image
                source={require('../img/logoWithoutBG.png')}
                style={styles.bannerImage}
              />
              <Text style={styles.bannerText}>Recipe in Minutes!</Text>
              <Text style={styles.bannerSubText}>Available 1 August 2024</Text>
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() => fetchAllMeals()}
              >
                <Text style={styles.tabButtonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() => setIsDropdownVisible(true)}
              >
                <Text style={styles.tabButtonText}>{currCategory}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabButton}
                onPress={() => setIsAreaDropdownVisible(true)}
              >
                <Text style={styles.tabButtonText}>{currArea}</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={dishesData}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderDish}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {categData.map((category) => (
                <TouchableOpacity
                  key={category.idCategory}
                  style={styles.dropdownItem}
                  onPress={() => handleCategorySelect(category.strCategory)}
                >
                  <Text style={styles.dropdownItemText}>
                    {category.strCategory}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isAreaDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAreaDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsAreaDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {areaData.map((area) => (
                <TouchableOpacity
                  key={area.idArea}
                  style={styles.dropdownItem}
                  onPress={() => handleAreaSelect(area.strArea)}
                >
                  <Text style={styles.dropdownItemText}>{area.strArea}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
      <CartButton navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7dcbb7',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent', // Removed the red overlay
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  hamburger: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  bannerText: {
    color: '#047a46',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    color: '#047a46',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 8,
  },
  dishContainer: {
    flex: 1,
    margin: 8,
  },
  touchable: {
    flex: 1,
  },
  dishItem: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    overflow: 'hidden',
    padding: 10,
  },
  dishImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dishCategory: {
    fontSize: 14,
    color: '#666666',
  },
  dishOrigin: {
    fontSize: 14,
    color: '#666666',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
