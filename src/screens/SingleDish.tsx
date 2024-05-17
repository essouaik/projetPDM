import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SingleDish = ({ route }) => {
  const { dishId } = route.params;
  const [dishData, setDishData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandedIng, setExpandedIng] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`);
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

  const formatInstructions = (instructions) => {
    const sentences = instructions.split('.');
    const filteredSentences = sentences.filter(sentence => sentence.trim() !== '');

    return filteredSentences.map((sentence, index) => (
      <Text key={index} style={styles.instructionText}>
        - {sentence.trim()}
      </Text>
    ));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (!dishData) {
    return <Text style={styles.errorText}>Erreur lors de la récupération des données.</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: dishData.strMealThumb }} />
          <Card.Title 
            title={dishData.strMeal} 
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.categoryAreaText}>{dishData.strCategory} - {dishData.strArea}</Text>
          </Card.Content>
        </Card>

        <TouchableOpacity 
          onPress={() => setExpanded(!expanded)} 
          style={styles.touchable}
        >
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.chevron}>{expanded ? ' ▲ '  : ' ▼ '}</Text>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.expandedSection}>
            {formatInstructions(dishData.strInstructions)}
          </View>
        )}

        <TouchableOpacity 
          onPress={() => setExpandedIng(!expandedIng)} 
          style={styles.touchable}
        >
          <Text style={styles.sectionTitle}>Ingrédients</Text>
          <Text style={styles.chevron}>{expandedIng ? ' ▲ '  : ' ▼ '}</Text>
        </TouchableOpacity>

        {expandedIng && (
          <View style={styles.expandedSection}>
            {Object.keys(dishData).map((key, index) => {
              if (key.startsWith('strIngredient')) {
                const ingredientNumber = key.slice(13); // Récupère le numéro de l'ingrédient
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
              return null; // Ignorer les clés autres que strIngredientX
            })}
          </View>
        )}

        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')} 
          style={styles.homeButton}
        >
          Retour à l'accueil
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  categoryAreaText: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chevron: {
    marginLeft: 'auto',
    fontSize: 18,
    color: '#6c757d',
  },
  expandedSection: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  instructionText: {
    marginVertical: 5,
    fontSize: 14,
    lineHeight: 20,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  ingredientText: {
    fontSize: 14,
  },
  measureText: {
    fontSize: 14,
    color: '#6c757d',
  },
  homeButton: {
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default SingleDish;
