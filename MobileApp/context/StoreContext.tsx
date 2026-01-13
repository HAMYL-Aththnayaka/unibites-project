import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/axios';

export interface FoodItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  catagory: string;
  canteen: string;
  isHelpingHand?: boolean;
}

interface StoreContextType {
  food_list: FoodItem[];
  helping_food_list: FoodItem[];
  cartItems: Record<string, number>;
  token: string;
  setToken: (t: string) => void;
  addToCart: (id: string, helping?: boolean) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  getTotalCartAmount: () => number;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState<FoodItem[]>([]);
  const [helping_food_list, setHelpingFoodList] = useState<FoodItem[]>([]);

<<<<<<< HEAD
  // Load food and helping hand items
  const loadData = async (userToken: string) => {
    try {
      const fRes = await api.get('/api/foods/list');
      setFoodList(fRes.data?.Data || []);

=======
const loadData = async (userToken: string) => {
    try {
      const fRes = await api.get('/api/foods/list');
      setFoodList(fRes.data?.Data || []);
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      if (userToken) {
        const hRes = await api.get('/api/HelpingHand/foods/listfront', {
          headers: { Authorization: `Bearer ${userToken}` }
        });
<<<<<<< HEAD
        setHelpingFoodList(hRes.data?.Data || []);
=======
        
        console.log("Helping Hand Response Raw:", hRes.data);

        if (hRes.data?.Data) {
          setHelpingFoodList(hRes.data.Data);
        } else {
          setHelpingFoodList([]); 
        }
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      }
    } catch (err) {
      console.error("Fetch error in StoreContext:", err);
    }
  };

<<<<<<< HEAD
  // Load cart
=======
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  const loadCartData = async (userToken: string) => {
    try {
      const response = await api.post('/api/cart/get', {}, { 
        headers: { Authorization: `Bearer ${userToken}` } 
      });
<<<<<<< HEAD
      if (response.data.success) setCartItems(response.data.cartData);
=======
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
    } catch (err) {
      console.error("Cart load error:", err);
    }
  };

  const addToCart = async (itemId: string, isHelpingHand = false) => {
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
<<<<<<< HEAD
    if (token) await api.post('/api/cart/add', { itemId, isHelpingHand }, { headers: { Authorization: `Bearer ${token}` } });
=======
    if (token) {
      await api.post('/api/cart/add', { itemId, isHelpingHand }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
    }
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems(prev => {
      const updated = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
      if (updated[itemId] === 0) delete updated[itemId];
      return updated;
    });
<<<<<<< HEAD
    if (token) await api.post('/api/cart/remove', { itemId }, { headers: { Authorization: `Bearer ${token}` } });
=======
    if (token) {
      await api.post('/api/cart/remove', { itemId }, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
    }
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = food_list.find(p => p._id === id) || helping_food_list.find(p => p._id === id);
        if (item) total += (item.isHelpingHand ? 0 : item.price) * cartItems[id];
      }
    }
    return total;
  };

  useEffect(() => {
    const init = async () => {
      const savedToken = await AsyncStorage.getItem('token');
<<<<<<< HEAD
      if (savedToken) setToken(savedToken);
      await loadData(savedToken || '');
      if (savedToken) await loadCartData(savedToken);
    };
    init();
  }, []);
=======
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
        await loadData(savedToken);
      } else {
        await loadData('');
      }
    };
    init();
  }, [token]);
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7

  return (
    <StoreContext.Provider value={{ 
      food_list, helping_food_list, cartItems, token, setToken, 
      addToCart, removeFromCart, getTotalCartAmount 
    }}>
      {children}
    </StoreContext.Provider>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
