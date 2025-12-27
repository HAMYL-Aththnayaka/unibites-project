import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';

interface Order {
  _id: string;
  amount: number;
  status: string;
  date: string;
  items: any[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "http://192.168.1.10:3000"; // Use your Local IP

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = "YOUR_JWT_TOKEN"; // Get from storage
        const response = await axios.post(`${API_BASE_URL}/api/order/userorders`, {}, { headers: { token } });
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {loading ? <ActivityIndicator color="#ea580c" /> : (
        <ScrollView contentContainerStyle={styles.list}>
          {orders.map((order) => (
            <View key={order._id} style={styles.orderCard}>
              <Text style={styles.status}>{order.status}</Text>
              <Text style={styles.amount}>Total: ${order.amount}</Text>
              <Text style={styles.date}>{new Date(order.date).toLocaleDateString()}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 24 },
  title: { fontSize: 24, fontWeight: '900', marginBottom: 20 },
  list: { paddingBottom: 100 },
  orderCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 15, elevation: 2 },
  status: { color: '#ea580c', fontWeight: 'bold', marginBottom: 5 },
  amount: { fontSize: 18, fontWeight: 'bold' },
  date: { color: '#9ca3af', marginTop: 5 }
});