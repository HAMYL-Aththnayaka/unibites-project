import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StoreContext } from '../../context/StoreContext';
import { Search, ShoppingBag, Star, User } from 'lucide-react-native';

const logo = require('../../assets/images/logo.png');
const API_BASE_URL = 'http://localhost:3000';

const HelpingHand: React.FC = () => {
  const router = useRouter();
  const context = useContext(StoreContext);

  if (!context) return <ActivityIndicator size="large" color="#f97316" style={{ flex: 1 }} />;

  const { food_list, cartItems, addToCart, removeFromCart, token } = context;

  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setFilteredFoods(food_list);
      setLoading(false);
    }
  }, [food_list]);

  useEffect(() => {
    let result = food_list || [];
    if (activeCategory !== 'All') {
      result = result.filter(item => item.catagory === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredFoods(result);
  }, [activeCategory, searchQuery, food_list]);

  const categories = ['All', 'Salad', 'Rolls', 'Dessert', 'Sandwich', 'Cake', 'Pure-Veg', 'Pasta', 'Drinks'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.locationRow}>
              <Image source={logo} style={styles.logo} />
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartIcon}>
              <ShoppingBag size={24} color="#f97316" />
              {Object.keys(cartItems).length > 0 && <View style={styles.dot} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <View style={styles.profileBadge}>
                <User size={22} color="#f97316" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.welcomeText}>Good morning!</Text>
          <View style={styles.searchContainer}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for dishes..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
            >
              <Text style={[styles.categoryBtnText, activeCategory === cat && styles.categoryBtnTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.section, { marginBottom: 120 }]}>
          {loading ? (
            <ActivityIndicator size="large" color="#f97316" />
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map(item => {
              const quantity = cartItems[item._id] || 0;
              return (
                <View key={item._id} style={styles.foodCard}>
                  <Image
                    source={{ uri: `${API_BASE_URL}/images/${item.image}` }}
                    style={styles.foodImage}
                  />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={styles.canteenName}>{item.canteen || "Main Canteen"}</Text>
                      </View>
                      <View style={styles.ratingBadge}>
                        <Star size={12} color="#f97316" fill="#f97316" />
                        <Text style={styles.ratingText}>4.8</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.foodDescription} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <View style={styles.cardFooter}>
                      <Text style={styles.priceText}>
                        {item.isHelpingHand ? "Free" : `Rs. ${item.price}.00`}
                      </Text>

                      {quantity === 0 ? (
                        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item._id)}>
                          <ShoppingBag size={20} color="white" />
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.counterContainer}>
                          <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.counterButton}>
                            <Text style={styles.counterText}>−</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{quantity}</Text>
                          <TouchableOpacity onPress={() => addToCart(item._id)} style={styles.counterButton}>
                            <Text style={styles.counterText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyText}>No dishes found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpingHand;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 24, paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  cartIcon: { marginRight: 15, position: 'relative' },
  dot: { position: 'absolute', right: -2, top: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ea580c' },
  logo: { width: 110, height: 50, resizeMode: 'contain' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  profileBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 24, marginTop: 24 },
  welcomeText: { fontSize: 24, fontWeight: '900', color: '#111827' },
  searchContainer: { marginTop: 16 },
  searchIcon: { position: 'absolute', left: 16, top: 16, zIndex: 1 },
  searchInput: { backgroundColor: '#f3f4f6', paddingVertical: 14, paddingLeft: 48, borderRadius: 16 },
  categoryScroll: { paddingHorizontal: 24, marginTop: 32 },
  categoryBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 16, marginRight: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#f3f4f6' },
  categoryBtnActive: { backgroundColor: '#ea580c', borderColor: '#ea580c' },
  categoryBtnText: { fontWeight: 'bold', color: '#9ca3af' },
  categoryBtnTextActive: { color: '#fff' },
  sectionTitle: { fontSize: 20, fontWeight: '900', marginBottom: 24, color: '#111827' },
  foodCard: { backgroundColor: '#fff', borderRadius: 32, marginBottom: 32, overflow: 'hidden', elevation: 2 },
  foodImage: { width: '100%', height: 200 },
  cardContent: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  foodName: { fontSize: 18, fontWeight: '900', color: '#111827' },
  canteenName: { fontSize: 12, color: '#9ca3af', fontWeight: 'bold', marginTop: 4 },
  foodDescription: { fontSize: 14, color: '#666', marginVertical: 10 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 12, backgroundColor: '#f9fafb' },
  ratingText: { marginLeft: 4, fontWeight: '900' },
  cardFooter: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 22, fontWeight: '900' },
  addButton: { backgroundColor: '#ea580c', padding: 12, borderRadius: 16 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ea580c', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  counterButton: { paddingHorizontal: 8 },
  counterText: { color: 'white', fontWeight: '900', fontSize: 18 },
  quantityText: { color: 'white', fontWeight: '900', fontSize: 16, marginHorizontal: 6 },
  emptyText: { textAlign: 'center', color: '#9ca3af' },
});
