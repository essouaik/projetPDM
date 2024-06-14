import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/screens/Home';
import SplashScreen from './src/screens/Splash';
import SingleDish from './src/screens/SingleDish';
import CustomDrawerContent from './src/screens/SideBar';
import Cart from './src/screens/Cart';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define your stack navigator as before
function MyStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingleDish" component={SingleDish} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </Provider>
  );
}

// Integrate MyStack inside MyDrawer instead of a single screen
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack" // Renamed for clarity; it represents the whole stack
        component={MyStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;
