<<<<<<< HEAD
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
=======
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
import { StoreContext } from '../../context/StoreContext';
import api from '../../lib/axios';
import { Package, Clock } from 'lucide-react-native';

const Orders = () => {
  const { token } = useContext(StoreContext)!;
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

<<<<<<< HEAD
  const prevOrdersRef = useRef<string[]>([]);

=======
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  const fetchOrders = async () => {
    try {
      const res = await api.post('/api/order/userorders', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
<<<<<<< HEAD
      
      if (res.data.success) {
        let allFetchedOrders = res.data.data;

        const currentOrderIds = allFetchedOrders.map((o: any) => o._id);
        const prevOrderIds = prevOrdersRef.current;

        if (prevOrderIds.length > 0) {
          prevOrderIds.forEach(id => {
            if (!currentOrderIds.includes(id)) {
              Alert.alert('Order Updated', `Your order has been completed or moved to Helping Hand.`);
            }
          });
        }

        const activeOrders = allFetchedOrders.filter((o: any) => 
          o.status !== 'Delivered' && o.status !== 'Moved to HH'
        ).reverse();

        setOrders(activeOrders);
       
        prevOrdersRef.current = activeOrders.map((o: any) => o._id);
=======
      if (res.data.success) {
        setOrders(res.data.data.reverse());
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      }
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

<<<<<<< HEAD
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [token]);

=======
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Package size={24} color="#ea580c" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.orderAmount}>LKR {item.amount}.00</Text>
          <Text style={styles.itemCount}>Items: {item.items.length}</Text>
        </View>
<<<<<<< HEAD
        <View style={[styles.statusBadge, { backgroundColor: '#fff7ed' }]}>
          <Text style={[styles.statusText, { color: '#9a3412' }]}>
=======
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Delivered' ? '#dcfce7' : '#fff7ed' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Delivered' ? '#166534' : '#9a3412' }]}>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        <Text style={styles.itemsText}>
          {item.items.map((i: any) => `${i.name} x ${i.quantity}`).join(", ")}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Clock size={14} color="#9ca3af" />
        <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
<<<<<<< HEAD
        <Text style={styles.title}>Active Orders</Text>
=======
        <Text style={styles.title}>My Orders</Text>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ea580c" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Package size={48} color="#9ca3af" />
<<<<<<< HEAD
              <Text style={styles.emptyText}>No active orders found.</Text>
=======
              <Text style={styles.emptyText}>No orders found yet.</Text>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { padding: 24, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: '900', color: '#111827' },
  listContent: { padding: 20 },
  orderCard: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1, marginLeft: 12 },
  orderAmount: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  itemCount: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  itemsList: { marginTop: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  itemsText: { fontSize: 14, color: '#4b5563', lineHeight: 20 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dateText: { fontSize: 12, color: '#9ca3af', marginLeft: 6 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, color: '#9ca3af' }
});

export default Orders;