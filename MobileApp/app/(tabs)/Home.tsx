import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StoreContext } from '../../context/StoreContext';
import { ShoppingBag, Star, Heart, AlertCircle, MapPin, User } from 'lucide-react-native';

const logo = require('../../assets/images/logo.png');
const API_BASE_URL = 'http://localhost:3000';

const HelpingHand = () => {
  const router = useRouter();
  const context = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  if (!context) return null;

  const { food_list, cartItems, addToCart, removeFromCart, token } = context;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [food_list]);

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartIcon}>
              <ShoppingBag size={24} color="#ea580c" />
              {Object.keys(cartItems).length > 0 && <View style={styles.dot} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <View style={styles.profileBadge}>
                <User size={22} color="#ea580c" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Full Menu</Text>
          <Text style={styles.subtitle}>Explore our delicious variety</Text>
        </View>

        {/* Food List */}
        <View style={[styles.section, { marginBottom: 120 }]}>
          {!token ? (
            <View style={styles.centerContent}>
              <AlertCircle size={50} color="#9ca3af" />
              <Text style={styles.loginMsg}>Please login to see all dishes.</Text>
            </View>
          ) : food_list.length > 0 ? (
            food_list.map((item) => {
              const quantity = cartItems[item._id] || 0;
              return (
                <View key={item._id} style={styles.card}>
                  <Image
                    source={{ uri: `${API_BASE_URL}/images/${item.image}` }}
                    style={styles.image}
                    resizeMode="cover"
                  />

                  <View style={styles.cardInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      <View style={styles.ratingBox}>
                        <Star size={14} color="#f59e0b" fill="#f59e0b" />
                        <Text style={styles.ratingText}>{item.rating || "4.5"}</Text>
                      </View>
                    </View>

                    <View style={styles.detailRow}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.detailText}>{item.canteen || "Main Canteen"}</Text>
                    </View>

                    <Text style={styles.descriptionText} numberOfLines={2}>
                      {item.description}
                    </Text>

                    <View style={styles.footer}>
                      <Text style={[styles.freeText, item.price !== 0 && { color: '#111827' }]}>
                        {item.price === 0 ? "FREE" : `Rs. ${item.price}.00`}
                      </Text>

                      {quantity === 0 ? (
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => addToCart(item._id, item.price === 0)}
                        >
                          <Text style={styles.addBtnText}>Add to Cart</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.counter}>
                          <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.countBtn}>
                            <Text style={styles.countText}>−</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{quantity}</Text>
                          <TouchableOpacity onPress={() => addToCart(item._id, item.price === 0)} style={styles.countBtn}>
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
            <View style={styles.centerContent}>
              <Heart size={48} color="#ea580c" />
              <Text style={styles.noDataTitle}>No Food Found</Text>
              <Text style={styles.noDataText}>
                We couldn't find any dishes at the moment.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpingHand;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingBottom: 20 },
  header: { paddingHorizontal: 24, paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  cartIcon: { marginRight: 15, position: 'relative' },
  dot: { position: 'absolute', right: -2, top: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ea580c' },
  logo: { width: 110, height: 50, resizeMode: 'contain' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  profileBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },

  section: { paddingHorizontal: 24, marginTop: 24 },
  title: { fontSize: 28, fontWeight: '900', color: '#030303' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },

  card: { backgroundColor: '#fff', borderRadius: 24, marginBottom: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  image: { width: '100%', height: 180 },
  cardInfo: { padding: 16 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  foodName: { fontSize: 20, fontWeight: 'bold', color: '#111827', flex: 1 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#d97706', marginLeft: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 },
  detailText: { fontSize: 14, color: '#4b5563', fontWeight: '500' },
  descriptionText: { fontSize: 13, color: '#6b7280', flex: 1, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  freeText: { fontSize: 22, fontWeight: '900', color: '#10b981' },
  addBtn: { backgroundColor: '#ea580c', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ea580c', borderRadius: 12, padding: 6 },
  countBtn: { paddingHorizontal: 10 },
  countText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  quantityText: { color: 'white', fontWeight: 'bold', marginHorizontal: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerContent: { alignItems: 'center', marginTop: 60 },
  loginMsg: { color: '#6b7280', marginTop: 10 },
  noDataTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, color: '#111827' },
  noDataText: { textAlign: 'center', marginTop: 10, color: '#6b7280', lineHeight: 20 },
});
