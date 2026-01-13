import { Tabs } from 'expo-router';
import { HeartHandshake, Home, ShoppingBag, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#ea580c' }}>
      <Tabs.Screen name="Home" options={{ tabBarIcon: ({ color }) => <Home color={color} /> }} />
      <Tabs.Screen 
        name="helping-hand" 
        options={{ title: 'Helping Hand', tabBarIcon: ({ color }) => <HeartHandshake color={color} /> }} 
      />
      <Tabs.Screen name="orders" options={{ tabBarIcon: ({ color }) => <ShoppingBag color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <User color={color} /> }} />
    </Tabs>
  );
}
