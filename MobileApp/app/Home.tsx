import React, { useEffect, useState } from 'react';
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
  Dimensions 
} from 'react-native';
import axios from 'axios';
import { 
  Search, 
  ShoppingBag, 
  Star, 
  Home as HomeIcon, 
  ClipboardList, 
  Heart, 
  User, 
  ChevronDown 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Interface matching foodModel.js
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
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  // Configuration based on Server.js
  const API_BASE_URL = "http://localhost:3000"; 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // Endpoint from foodRoutes.js
        const response = await axios.get(`${API_BASE_URL}/api/foods/list`); 
        // Logic to handle "Data" key from foodControler.js
        if (response.data.success && response.data.Data) { 
          setFoods(response.data.Data); 
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const categories = ['All', 'Pizza', 'Burgers', 'Salad'];
  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(item => item.catagory === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
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
            <View style={styles.notificationDot}><Text style={styles.dotText}>2</Text></View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.section}>
          <Text style={styles.welcomeText}>Good morning, Alex!</Text>
          <View style={styles.searchContainer}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search for dishes, restaurants..."
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Promo Card */}
        <View style={styles.section}>
          <View style={styles.promoCard}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}> Today s Special</Text>
              <Text style={styles.promoSubtitle}>Free drink with any main course!</Text>
            </View>
            <View style={styles.promoCircle} />
          </View>
        </View>

        {/* Categories */}
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

        {/* Popular Dishes */}
        <View style={[styles.section, { marginBottom: 120 }]}>
          <Text style={styles.sectionTitle}>Popular Dishes</Text>
          {loading ? (
            <ActivityIndicator color="#f97316" size="large" />
          ) : (
            filteredFoods.map((item) => (
              <View key={item._id} style={styles.foodCard}>
                {/* Static path from Server.js */}
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
                    <TouchableOpacity style={styles.addButton}>
                      <ShoppingBag size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <HomeIcon size={24} color="#ea580c" />
        <ClipboardList size={24} color="#d1d5db" />
        <Heart size={24} color="#d1d5db" />
        <User size={24} color="#d1d5db" />
      </View>
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
  profileBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff7ed', borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  notificationDot: { position: 'absolute', top: -2, right: -2, backgroundColor: '#ea580c', width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  dotText: { color: 'white', fontSize: 8, fontWeight: 'bold' },
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
  foodCard: { backgroundColor: '#fff', borderRadius: 32, marginBottom: 32, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
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
  bottomNav: { position: 'absolute', bottom: 24, left: 24, right: 24, backgroundColor: 'rgba(255,255,255,0.95)', height: 80, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }
});

export default Home;