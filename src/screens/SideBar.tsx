import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const CustomDrawerContent = ({navigation}) => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <Image
          source={require('../img/splash.png')}
          style={styles.profilePic}
        />
        <Text style={styles.userName}>Moumou</Text>
      </View>
      <View style={styles.drawerSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.drawerItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.drawerItem}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.drawerItem}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItem: {
    fontSize: 14,
    padding: 10,
    paddingLeft: 20,
  },
});

export default CustomDrawerContent;
