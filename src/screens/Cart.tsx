import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItemQuantity } from '../redux/slices/cartSlice';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>{item.price} €</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {calculateTotal()} €</Text>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Text onPress={() => navigation.goBack()} style={styles.homeButton}>◀ Back</Text>

{cartItems.length !== 0 ? (
        <Text onPress={() => navigation.goBack()} style={styles.homeButton}>Pay</Text>
    ) : <Text></Text>}
      </View>
    </View>
  );    
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    homeButton: {
        marginTop: 24,
        backgroundColor: '#FF6F61',
        elevation: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 10,
        width: 150, 
        alignItems: 'center', 
        fontSize: 18,
        color: '#fff',
      },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#FF6F61',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        fontSize: 24,
        paddingHorizontal: 10,
        color: '#FF6F61',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    totalContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6F61',
    },
});

export default Cart;
