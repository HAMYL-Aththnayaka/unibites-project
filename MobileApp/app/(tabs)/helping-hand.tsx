import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { StoreContext } from '../../context/StoreContext';
import { Heart, AlertCircle } from 'lucide-react-native';

const API_BASE_URL = 'http://localhost:3000'; 

const HelpingHand = () => {
  const context = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  if (!context) return null;

  const { helping_food_list, cartItems, addToCart, removeFromCart, token } = context;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [helping_food_list]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#ea580c" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Helping Hand</Text>
          <Text style={styles.subtitle}>University Charity Program</Text>
        </View>

        {!token ? (
          <View style={styles.center}>
            <AlertCircle size={50} color="#9ca3af" />
            <Text style={styles.loginMsg}>Please login to check eligibility.</Text>
          </View>
        ) : helping_food_list.length > 0 ? (
          helping_food_list.map((item) => {
            const quantity = cartItems[item._id] || 0;
            return (
              <View key={item._id} style={styles.card}>
                <Image 
                  source={{ uri: `${API_BASE_URL}/images/${item.image}` }} 
                  style={styles.image} 
                  resizeMode="cover"
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <View style={styles.footer}>
                    <Text style={styles.freeText}>FREE</Text>
                    {quantity === 0 ? (
                      <TouchableOpacity 
                        style={styles.addBtn} 
                        onPress={() => addToCart(item._id, true)}
                      >
                        <Text style={styles.addBtnText}>Add to Cart</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.counter}>
                        <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.countBtn}>
                          <Text style={styles.countText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={() => addToCart(item._id, true)} style={styles.countBtn}>
                          <Text style={styles.countText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.center}>
            <Heart size={48} color="#ea580c" />
            <Text style={styles.noDataTitle}>Not Enrolled</Text>
            <Text style={styles.noDataText}>
              Your account is not in the aid database.{"\n"}
              Please apply through the profile section.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 24 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '900', color: '#ea580c' },
  subtitle: { fontSize: 14, color: '#6b7280' },
  card: { backgroundColor: '#fff', borderRadius: 24, marginBottom: 20, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 180 },
  cardInfo: { padding: 20 },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  freeText: { fontSize: 18, fontWeight: '900', color: '#10b981' },
  addBtn: { backgroundColor: '#ea580c', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ea580c', borderRadius: 12, padding: 6 },
  countBtn: { paddingHorizontal: 10 },
  countText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  quantityText: { color: 'white', fontWeight: 'bold', marginHorizontal: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  loginMsg: { color: '#6b7280', marginTop: 10 },
  noDataTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, color: '#111827' },
  noDataText: { textAlign: 'center', marginTop: 10, color: '#6b7280', lineHeight: 20 }
});

export default HelpingHand;