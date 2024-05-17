import * as React from 'react';
import { Card, Text } from 'react-native-paper';

const Dish = ({ title, category, imageSource, origin }) => (
  <Card>
    <Card.Cover source={imageSource} />
    <Card.Title title={title} titleStyle={{fontWeight: 'bold'}} />
    <Card.Content>
      <Text> {origin} - {category}</Text>
    </Card.Content>
  </Card>
);

export default Dish;
