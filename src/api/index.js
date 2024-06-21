// api.js

// Fetch all categories
export const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      return data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
  // Fetch all areas
  export const fetchAreas = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  };
  
  // Fetch all meals
  export const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  };
  
  // Fetch meals by search term
  export const fetchMealsBySearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching meals by search:', error);
      throw error;
    }
  };
  
  // Fetch meals by category
  export const fetchMealsByCategory = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const dat = await response.json();
      
      const mealDetailsPromises = dat.meals.map(async meal => {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        return resp.json();
      });
  
      const mealsDetails = await Promise.all(mealDetailsPromises);
      return mealsDetails.map(mealData => mealData.meals[0]);
    } catch (error) {
      console.error('Error fetching meals by category:', error);
      throw error;
    }
  };
  
  // Fetch meals by area
  export const fetchMealsByArea = async (area) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const dat = await response.json();
      
      const mealDetailsPromises = dat.meals.map(async meal => {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        return resp.json();
      });
  
      const mealsDetails = await Promise.all(mealDetailsPromises);
      return mealsDetails.map(mealData => mealData.meals[0]);
    } catch (error) {
      console.error('Error fetching meals by area:', error);
      throw error;
    }
  };

  // Fetch dish by ID
export const fetchDishById = async (dishId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  };