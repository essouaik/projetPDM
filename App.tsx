/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home.tsx';
import SplashScreen from './src/screens/Splash.tsx';
import SingleDish from './src/screens/SingleDish.tsx';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SingleDish" component={SingleDish} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}


export default App;
