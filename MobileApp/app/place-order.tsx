import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StoreContext } from '../context/StoreContext';
import api from '../lib/axios';

const PlaceOrder = () => {
  const context = useContext(StoreContext);
  if (!context) return null;

  const { getTotalCartAmount, token, food_list, cartItems } = context;
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [orderType, setOrderType] = useState('delivery');
  const router = useRouter();

  const [data, setData] = useState({
<<<<<<< HEAD
    firstName: '', 
    lastName: '', 
    email: '', 
    nearest_town: '',
    street: '', 
    address: '', 
    phone_number: ''
  });

=======
    firstName: '', lastName: '', email: '', nearest_town: '',
    street: '', address: '', phone_number: ''
  });

  
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  const subtotal = getTotalCartAmount();
  const deliveryFee = orderType === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD


const onPlaceOrder = async (addressData: any) => {
  try {

    const isHelpingHand = food_list.some(item => cartItems[item._id] > 0 && item.price === 0);

    const orderData = {
      address: addressData,
      items: food_list.filter(item => cartItems[item._id] > 0).map(item => ({...item, quantity: cartItems[item._id]})),
      totalAmount: isHelpingHand ? 0 : total, 
      paymentMethod: paymentMethod,
      orderType: orderType
    };

    const response = await api.post('/api/order/create-order', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

if (response.data.success) {
      Alert.alert("Success", "Order placed successfully!");

      if (router.canGoBack()) {
          router.replace('/Home'); 
      } else {
          router.replace('/Home'); 
      }
    }


  } catch (err: any) {
  
    const msg = err.response?.data?.message || err.message;
    Alert.alert("Order Failed", msg);
  }
};
=======
  const onPlaceOrder = async () => {
    if (!token) {
      Alert.alert("Error", "Please login first.");
      router.push('/');
      return;
    }

    if (subtotal === 0) {
      Alert.alert("Error", "Your cart is empty!");
      return;
    }

    try {
      const items = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        userId: token,      
        items,
        amount: total,
        address: data,
        paymentMethod,
        orderType,
        payment: paymentMethod === 'online' 
      };

      const res = await api.post('/api/order/create-order', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        router.replace('/(tabs)/orders');
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to place order.");
    }
  };
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
<<<<<<< HEAD
          <Text style={styles.backText}>← Back to Cart</Text>
=======
            <Text style={styles.backText}>← Back to Cart</Text>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
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
              <TextInput style={[styles.input, { flex: 1, marginRight: 10 }]} placeholder="First Name" onChangeText={(v) => handleInputChange('firstName', v)} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Last Name" onChangeText={(v) => handleInputChange('lastName', v)} />
            </View>
            <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" onChangeText={(v) => handleInputChange('email', v)} />
            <TextInput style={styles.input} placeholder="Nearest Town" onChangeText={(v) => handleInputChange('nearest_town', v)} />
            <TextInput style={styles.input} placeholder="Street" onChangeText={(v) => handleInputChange('street', v)} />
            <TextInput style={styles.input} placeholder="Address" onChangeText={(v) => handleInputChange('address', v)} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(v) => handleInputChange('phone_number', v)} />
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
<<<<<<< HEAD
            <Text style={styles.label}>Payment Method:</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setPaymentMethod('online')} style={[styles.radioBtn, paymentMethod === 'online' && styles.activeRadio]}>
                <Text style={paymentMethod === 'online' ? styles.whiteText : styles.blackText}>Online</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaymentMethod('counter')} style={[styles.radioBtn, paymentMethod === 'counter' && styles.activeRadio]}>
                <Text style={paymentMethod === 'counter' ? styles.whiteText : styles.blackText}>Counter</Text>
              </TouchableOpacity>
            </View>
          </View>

          
          <TouchableOpacity style={styles.placeBtn} onPress={() => onPlaceOrder(data)}>
=======
             <Text style={styles.label}>Payment Method:</Text>
             <View style={styles.radioGroup}>
                <TouchableOpacity onPress={() => setPaymentMethod('online')} style={[styles.radioBtn, paymentMethod === 'online' && styles.activeRadio]}>
                    <Text style={paymentMethod === 'online' ? styles.whiteText : styles.blackText}>Online</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPaymentMethod('counter')} style={[styles.radioBtn, paymentMethod === 'counter' && styles.activeRadio]}>
                    <Text style={paymentMethod === 'counter' ? styles.whiteText : styles.blackText}>Counter</Text>
                </TouchableOpacity>
             </View>
          </View>

          <TouchableOpacity style={styles.placeBtn} onPress={onPlaceOrder}>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
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
  form: { marginTop: 10 }
});

export default PlaceOrder;