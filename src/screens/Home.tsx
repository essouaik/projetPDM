import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Dish from '../components/Dish';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [dishesData, setDishesData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', {});
        const data = await response.json();
        setDishesData([data]);
        console.log(dishesData[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
  <ScrollView>
    <View>
      {dishesData.length > 0 && dishesData[0].meals.map((meal, index) => (
        <View key={index} style={{ paddingVertical: 10, paddingHorizontal: 15, marginTop: 15 }}>
          <TouchableOpacity 
            key={index} 
            style={{ paddingVertical: 10, paddingHorizontal: 15, marginTop: 15 }}
            onPress={() => navigation.navigate('SingleDish', { dishId: meal.idMeal })}
          >
            <Dish 
              title={meal.strMeal} 
              category={meal.strCategory}
              origin = {meal.strArea}
              imageSource={{ uri: meal.strMealThumb }} 
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>


  );
};

export default HomeScreen;
