import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CartButton = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const hasItemsInCart = cartItems.length > 0;

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => navigation.navigate('Cart')}
    >
      {hasItemsInCart && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
        </View>
      )}
      <Text style={styles.cartButtonText}>🛒</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartButtonText: {
    color: '#ff6347',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartButton;