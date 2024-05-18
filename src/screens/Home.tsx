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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

const HomeScreen = () => {
  const [dishesData, setDishesData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
          {},
        );
        const data = await response.json();
        setDishesData(data.meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
                  Available 1 December - 30 December 2023
                </Text>
              </View>

              <View style={styles.tabsContainer}>
                <TouchableOpacity style={styles.tabButton}>
                  <Text style={styles.tabButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                  <Text style={styles.tabButtonText}>Asian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                  <Text style={styles.tabButtonText}>Drink</Text>
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
});

export default HomeScreen;
