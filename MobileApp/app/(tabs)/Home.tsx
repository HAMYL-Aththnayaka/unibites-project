import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, ScrollView, TextInput, TouchableOpacity, 
  SafeAreaView, ActivityIndicator, StyleSheet, Alert, Platform 
} from 'react-native';
import axios from 'axios';
import { Search, ShoppingBag, Star, ChevronDown, User } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string; 
  catagory: string; 
  canteen: string;
}

const Home: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // UPDATE THIS TO YOUR CURRENT IP ADDRESS
  const API_BASE_URL = "http://192.168.1.10:3000"; 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/foods/list`, {
          timeout: 5000 // 5 second timeout
        }); 
        
        if (response.data.success && response.data.Data) {
          setFoods(response.data.Data);
          setFilteredFoods(response.data.Data);
        }
      } catch (error: any) {
        console.error("Fetch Error:", error.message);
        Alert.alert(
          "Connection Error", 
          "Could not connect to the server. Please check if your backend is running and your IP is correct."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    let result = foods;
    if (activeCategory !== 'All') {
      result = result.filter(item => item.catagory === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredFoods(result);
  }, [activeCategory, searchQuery, foods]);

  const handleAddToCart = async (itemId: string) => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      if (!token) {
        Alert.alert("Login Required", "Please login to add items to your cart.");
        return;
      }
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/add`, 
        { itemId }, 
        { headers: { token } }
      );
      if (response.data.success) {
        Alert.alert("Success", response.data.alert || "Added to Cart");
      }
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart");
    }
  };

  const categories = ['All', 'Pizza', 'Burgers', 'Salad'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.deliveryLabel}>Delivering to</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>Main Campus</Text>
              <ChevronDown size={14} color="#f97316" />
            </View>
          </View>
          <View style={styles.profileBadge}>
            <User size={22} color="#f97316" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.welcomeText}>Good morning, Alex!</Text>
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

        <View style={styles.section}>
          <View style={styles.promoCard}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Today's Special</Text>
              <Text style={styles.promoSubtitle}>Free drink with any main course!</Text>
            </View>
            <View style={styles.promoCircle} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => (
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
          <Text style={styles.sectionTitle}>Popular Dishes</Text>
          {loading ? (
            <ActivityIndicator color="#f97316" size="large" />
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((item) => (
              <View key={item._id} style={styles.foodCard}>
                <Image 
                  source={{ uri: `${API_BASE_URL}/images/${item.image}` }} 
                  style={styles.foodImage} 
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.foodName}>{item.name}</Text>
                      <Text style={styles.canteenName}>{item.canteen}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Star size={12} color="#f97316" fill="#f97316" />
                      <Text style={styles.ratingText}>4.8</Text>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item._id)}
                    >
                      <ShoppingBag size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No dishes found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  section: { paddingHorizontal: 24, marginTop: 24 },
  header: { paddingHorizontal: 24, paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deliveryLabel: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontWeight: '900', fontSize: 16, color: '#111827', marginRight: 4 },
  profileBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff7ed', borderWeight: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  welcomeText: { fontSize: 24, fontWeight: '900', color: '#111827' },
  searchContainer: { marginTop: 16, position: 'relative' },
  searchIcon: { position: 'absolute', left: 16, top: 16, zIndex: 10 },
  searchInput: { backgroundColor: '#f3f4f6', paddingVertical: 14, paddingLeft: 48, paddingRight: 16, borderRadius: 16, fontSize: 14 },
  promoCard: { backgroundColor: '#f97316', borderRadius: 32, padding: 24, height: 160, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  promoTextContainer: { flex: 1, zIndex: 10 },
  promoTitle: { color: 'white', fontWeight: '900', fontSize: 20 },
  promoSubtitle: { color: '#ffedd5', fontSize: 14, fontWeight: '600', marginTop: 4 },
  promoCircle: { position: 'absolute', right: -40, bottom: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.1)' },
  categoryScroll: { paddingHorizontal: 24, marginTop: 32 },
  categoryBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 16, marginRight: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#f3f4f6' },
  categoryBtnActive: { backgroundColor: '#ea580c', borderColor: '#ea580c' },
  categoryBtnText: { fontWeight: 'bold', color: '#9ca3af', fontSize: 14 },
  categoryBtnTextActive: { color: '#fff' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#111827', marginBottom: 24 },
  foodCard: { backgroundColor: '#fff', borderRadius: 32, marginBottom: 32, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 }, android: { elevation: 2 }, web: { cursor: 'pointer' } }) },
  foodImage: { width: '100%', height: 200 },
  cardContent: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  foodName: { fontSize: 18, fontWeight: '900', color: '#111827' },
  canteenName: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  ratingText: { fontSize: 12, fontWeight: '900', marginLeft: 4, color: '#374151' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  priceText: { fontSize: 22, fontWeight: '900', color: '#111827' },
  addButton: { backgroundColor: '#ea580c', padding: 12, borderRadius: 16 },
  emptyText: { textAlign: 'center', color: '#9ca3af', marginTop: 20 }
});

export default Home;