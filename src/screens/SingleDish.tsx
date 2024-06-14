import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

const SingleDish = ({ route }) => {
  const { dishId } = route.params;
  const [dishData, setDishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandedIng, setExpandedIng] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`,
        );
        const data = await response.json();
        setDishData(data.meals[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dishId]);

  const handleAddToCart = () => {
    const item = {
      id: dishData.idMeal,
      title: dishData.strMeal,
      price: Math.floor(Math.random() * 10) + 10,
      image: dishData.strMealThumb,
    };
    Alert.alert('Added to cart', `${dishData.strMeal} has been added to your cart.`);
    dispatch(addItem(item));
  };

  const formatInstructions = (instructions) => {
    const sentences = instructions.split('.');
    const filteredSentences = sentences.filter(
      (sentence) => sentence.trim() !== '',
    );

    return filteredSentences.map((sentence, index) => (
      <Text key={index} style={styles.instructionText}>
        - {sentence.trim()}
      </Text>
    ));
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.loadingIndicator}
      />
    );
  }

  if (!dishData) {
    return (
      <Text style={styles.errorText}>
        Erreur lors de la récupération des données.
      </Text>
    );
  }

  return (
    <ImageBackground
      source={require('../img/image.png')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
              source={{ uri: dishData.strMealThumb }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>{dishData.strMeal}</Text>
            <Text style={styles.categoryAreaText}>
              {dishData.strCategory} - {dishData.strArea}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            style={styles.touchable}>
            <Text style={styles.sectionTitle}>Constructions</Text>
            <Text style={styles.chevron}>{expanded ? ' ▲ ' : ' ▼ '}</Text>
          </TouchableOpacity>

          {expanded && (
            <View style={styles.expandedSection}>
              {formatInstructions(dishData.strInstructions)}
            </View>
          )}

          <TouchableOpacity
            onPress={() => setExpandedIng(!expandedIng)}
            style={styles.touchable}>
            <Text style={styles.sectionTitle}>Ingrédients</Text>
            <Text style={styles.chevron}>{expandedIng ? ' ▲ ' : ' ▼ '}</Text>
          </TouchableOpacity>

          {expandedIng && (
            <View style={styles.expandedSection}>
              {Object.keys(dishData).map((key, index) => {
                if (key.startsWith('strIngredient')) {
                  const ingredientNumber = key.slice(13);
                  const ingredient = dishData[key];
                  const measureKey = `strMeasure${ingredientNumber}`;
                  const measure = dishData[measureKey];
                  return (
                    <View key={index} style={styles.ingredientRow}>
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                      <Text style={styles.measureText}>{measure}</Text>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Home')}
              style={styles.homeButton}>
              ◀ Back
            </Button>
            <Button
              mode="contained"
              onPress={handleAddToCart}
              style={styles.homeButton}>
              🛒 Add to cart
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: width * 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FF6F61',
    textAlign: 'center',
    marginVertical: 12,
  },
  categoryAreaText: {
    fontSize: 18,
    color: '#FF6F61',
    textAlign: 'center',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  chevron: {
    fontSize: 24,
    color: '#FF6F61',
  },
  expandedSection: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  instructionText: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  measureText: {
    fontSize: 16,
    color: '#6c757d',
  },
  homeButton: {
    marginTop: 24,
    backgroundColor: '#FF6F61',
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF6F61',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SingleDish;
