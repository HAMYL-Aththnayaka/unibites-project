import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StoreContext } from '../context/StoreContext';

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  canteen?: string;
  isHelpingHand?: boolean;
}

const FoodItem = ({ id, name, price, description, image, canteen, isHelpingHand }: FoodItemProps) => {
  const context = useContext(StoreContext);
  if (!context) return null;

  const { cartItems, addToCart, removeFromCart } = context;

  const imageUrl = `http://localhost:3000/images/${image}`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>
            {isHelpingHand ? "Free" : `LKR ${price}.00`}
          </Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        {canteen && <Text style={styles.canteen}>Canteen: {canteen}</Text>}

        <View style={styles.counterRow}>
          {!cartItems[id] ? (
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(id, !!isHelpingHand)}>
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => removeFromCart(id)} style={styles.countBtn}>
                <Text style={styles.countBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{cartItems[id]}</Text>
              <TouchableOpacity onPress={() => addToCart(id, !!isHelpingHand)} style={styles.countBtn}>
                <Text style={styles.countBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 150 },
  info: { padding: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#ff6347', fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginBottom: 5 },
  canteen: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  counterRow: { marginTop: 10, alignItems: 'flex-end' },
  addButton: { backgroundColor: '#ff6347', padding: 8, borderRadius: 5 },
  addText: { color: '#fff', fontWeight: 'bold' },
  counter: { flexDirection: 'row', alignItems: 'center' },
  countBtn: { backgroundColor: '#eee', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  countBtnText: { fontSize: 20, fontWeight: 'bold' },
  quantity: { marginHorizontal: 15, fontSize: 16 }
});

export default FoodItem;