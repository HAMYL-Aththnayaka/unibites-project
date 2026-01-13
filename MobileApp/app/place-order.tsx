import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StoreContext } from '../context/StoreContext';
import api from '../lib/axios';

const PlaceOrder = () => {
  const context = useContext(StoreContext);
  if (!context) return null;

  const { getTotalCartAmount, token, food_list, cartItems } = context;
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'counter'>('online');
  const [orderType, setOrderType] = useState<'delivery' | 'dinein'>('delivery');
  const router = useRouter();

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', nearest_town: '',
    street: '', address: '', phone_number: ''
  });

  const subtotal = getTotalCartAmount();
  const deliveryFee = orderType === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const onPlaceOrder = async () => {
  if (!token) {
    Alert.alert("Error", "Please login first.");
    router.push('/');
    return;
  }

  if (Object.values(cartItems).every(qty => qty === 0)) {
    Alert.alert("Error", "Your cart is empty!");
    return;
  }

  try {
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id],
        isHelpingHand: item.price === 0,
      }));

    const isHelpingHandOrder = orderItems.every(item => item.isHelpingHand);

    const orderData = {
      userId: token,
      items: orderItems,
      amount: isHelpingHandOrder ? 0 : subtotal + (orderType === 'delivery' ? 200 : 0),
      address: data,
      paymentMethod,
      orderType,
      payment: isHelpingHandOrder ? false : paymentMethod === 'online',
    };

    const res = await api.post('/api/order/create-order', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.success) {
      
      router.replace('/(tabs)/Home');
      Alert.alert("Success", res.data.message || "Order placed successfully!");
    } else {
      Alert.alert("Error", "Something went wrong.");
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message || "Failed to place order";
    Alert.alert("Error", msg);
  }
};



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back to Cart</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Order Information</Text>

        <Text style={styles.label}>Select Order Type:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioBtn, orderType === 'delivery' && styles.activeRadio]}
            onPress={() => setOrderType('delivery')}
          >
            <Text style={orderType === 'delivery' ? styles.whiteText : styles.blackText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioBtn, orderType === 'dinein' && styles.activeRadio]}
            onPress={() => setOrderType('dinein')}
          >
            <Text style={orderType === 'dinein' ? styles.whiteText : styles.blackText}>Dine-in</Text>
          </TouchableOpacity>
        </View>

        {orderType === 'delivery' && (
          <View style={styles.form}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                placeholder="First Name"
                onChangeText={(v) => handleInputChange('firstName', v)}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Last Name"
                onChangeText={(v) => handleInputChange('lastName', v)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={(v) => handleInputChange('email', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Nearest Town"
              onChangeText={(v) => handleInputChange('nearest_town', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              onChangeText={(v) => handleInputChange('street', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={(v) => handleInputChange('address', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={(v) => handleInputChange('phone_number', v)}
            />
          </View>
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cart Total</Text>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>LKR {subtotal}.00</Text>
          </View>
          {orderType === 'delivery' && (
            <View style={styles.summaryRow}>
              <Text>Delivery Fee</Text>
              <Text>LKR {deliveryFee}.00</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalBorder]}>
            <Text style={styles.boldText}>Total</Text>
            <Text style={styles.boldText}>LKR {total}.00</Text>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.label}>Payment Method:</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('online')}
                style={[styles.radioBtn, paymentMethod === 'online' && styles.activeRadio]}
              >
                <Text style={paymentMethod === 'online' ? styles.whiteText : styles.blackText}>Online</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaymentMethod('counter')}
                style={[styles.radioBtn, paymentMethod === 'counter' && styles.activeRadio]}
              >
                <Text style={paymentMethod === 'counter' ? styles.whiteText : styles.blackText}>Counter</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.placeBtn} onPress={onPlaceOrder}>
            <Text style={styles.placeBtnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 20 },
  backBtn: { marginBottom: 15 },
  backText: { color: '#ea580c', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, color: '#555', marginTop: 10 },
  radioGroup: { flexDirection: 'row', marginBottom: 20 },
  radioBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ea580c', borderRadius: 12, alignItems: 'center', marginHorizontal: 5 },
  activeRadio: { backgroundColor: '#ea580c' },
  whiteText: { color: 'white', fontWeight: 'bold' },
  blackText: { color: '#111827' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  row: { flexDirection: 'row' },
  summaryCard: { backgroundColor: 'white', padding: 20, borderRadius: 24, marginTop: 10, elevation: 3 },
  summaryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalBorder: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 10 },
  boldText: { fontWeight: 'bold', fontSize: 18 },
  paymentSection: { marginTop: 10 },
  placeBtn: { backgroundColor: '#ea580c', padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  placeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  form: { marginTop: 10 },
});

export default PlaceOrder;
