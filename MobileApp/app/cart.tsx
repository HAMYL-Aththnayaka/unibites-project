import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState({});
  const API_BASE_URL = "http://192.168.1.10:3000";

  const fetchCart = async () => {
    const token = "YOUR_JWT_TOKEN";
    const res = await axios.post(`${API_BASE_URL}/api/cart/get`, {}, { headers: { token } });
    if (res.data.success) {
      setCartItems(res.data.cartData);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {/* Map through cartItems using IDs from the backend */}
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  checkoutBtn: { backgroundColor: '#ea580c', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 'auto' },
  checkoutText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});