import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

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

  // fetch all categories 
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php',
          {},
        );
        const data = await response.json();
        setCategData(data.categories);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    
    fetchInitialData();
  }, []);

  // fetch all areas
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
          {},
        );
        const data = await response.json();
        setAreaData(data.meals);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        {},
      );
      const data = await response.json();
      setDishesData(data.meals);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  useEffect(() => {    
    fetchInitialData();
  }, []);

  const fetchAllMeals = ()=>{
    fetchInitialData();
    setCurrCategory("Category")
    setCurrArea("Area")
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
          {},
        );
        const data = await response.json();
        setDishesData(data.meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handleCategorySelect = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const dat = await response.json();
      
      const mealDetailsPromises = dat.meals.map(async meal => {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        return resp.json();
      });
  
      const mealsDetails = await Promise.all(mealDetailsPromises);
      const detailedMeals = mealsDetails.map(mealData => mealData.meals[0]);
      setCurrCategory(category)
      setDishesData(detailedMeals);
      setIsDropdownVisible(false);
      setCurrArea("Area")
    } catch (error) {
      console.error('Error fetching data by category:', error);
    }
  };

  const handleAreaSelect = async (area) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const dat = await response.json();
      
      const mealDetailsPromises = dat.meals.map(async meal => {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        return resp.json();
      });
  
      const mealsDetails = await Promise.all(mealDetailsPromises);
      const detailedMeals = mealsDetails.map(mealData => mealData.meals[0]);
      setCurrArea(area)
      setDishesData(detailedMeals);
      setIsAreaDropdownVisible(false);
      setCurrCategory("Category")
    } catch (error) {
      console.error('Error fetching data by category:', error);
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
    <ImageBackground
      source={require('../img/image.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.overlay}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image
                    source={require('../img/left.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Order&Go</Text>
                <TouchableOpacity>
                  <Image
                    source={require('../img/splash.png')}
                    style={styles.icon}
                  />
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
                  source={require('../img/banner2.png')}
                  style={styles.bannerImage}
                />
                <Text style={styles.bannerText}>Recipe in Minutes!</Text>
                <Text style={styles.bannerSubText}>
                  Available 1 August 2024
                </Text>
              </View>

              <View style={styles.tabsContainer}>
                <TouchableOpacity style={styles.tabButton} onPress={() => fetchAllMeals()}>
                  <Text style={styles.tabButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => setIsDropdownVisible(true)}>
                  <Text style={styles.tabButtonText}>{currCategory}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => setIsAreaDropdownVisible(true)}>
                  <Text style={styles.tabButtonText}>{currArea}</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={dishesData}
          keyExtractor={item => item.idMeal}
          renderItem={renderDish}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDropdownVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsDropdownVisible(false)}>
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {categData.map((category) => (
                <TouchableOpacity key={category.idCategory} style={styles.dropdownItem}
                                  onPress={() => handleCategorySelect(category.strCategory)}>
                  <Text style={styles.dropdownItemText}>{category.strCategory}</Text>
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
        onRequestClose={() => setIsAreaDropdownVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsAreaDropdownVisible(false)}>
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {areaData.map((area) => (
                <TouchableOpacity key={area.idArea} style={styles.dropdownItem}
                                  onPress={() => handleAreaSelect(area.strArea)}>
                  <Text style={styles.dropdownItemText}>{area.strArea}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    color: '#FFFFFF',
    fontSize: 24,
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
    color: '#FF6F61',
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
    color: '#FF6F61',
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
