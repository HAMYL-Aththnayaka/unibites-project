import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StoreContext } from '../context/StoreContext';

export default function Cart() {
  const router = useRouter();
  const { cartItems, food_list, helping_food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)!;

  const API_BASE_URL = "http://localhost:3000";


  const all_foods = [...food_list, ...helping_food_list];

  const cartData = all_foods.filter(item => cartItems[item._id] > 0);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: `${API_BASE_URL}/images/${item.image}` }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>

        <Text style={item.isHelpingHand ? styles.freeLabel : styles.itemPrice}>
          {item.isHelpingHand ? "FREE CLAIM" : `Rs. ${item.price}.00`} x {cartItems[item._id]}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item._id)}
        style={styles.removeBtn}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
      </View>

      <FlatList
        data={cartData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalPrice}>Rs. {getTotalCartAmount()}.00</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/place-order')}
          disabled={getTotalCartAmount() === 0 && cartData.length === 0}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    color: '#ea580c',
    fontWeight: 'bold',
    marginRight: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827'
  },
  listContent: { padding: 20 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    color: '#6b7280',
    marginTop: 4
  },
  freeLabel: {
    color: '#10b981',
    fontWeight: 'bold',
    marginTop: 4
  },
  removeBtn: { padding: 8 },
  removeText: {
    color: '#ef4444',
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#9ca3af'
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  totalLabel: {
    fontSize: 18,
    color: '#374151'
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827'
  },
  checkoutBtn: {
    backgroundColor: '#ea580c',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center'
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});