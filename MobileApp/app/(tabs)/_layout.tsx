import React from 'react';
import { Tabs } from 'expo-router';
import { Home as HomeIcon, ClipboardList } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ea580c',
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          height: 80,
          borderRadius: 32,
          backgroundColor: 'white',
          elevation: 5,
        },
      }}
    >
       {/*  Home tab */}
      <Tabs.Screen
        name="Home" 
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
          title: '', // Hides text label for a cleaner look
        }}
      />
      
      {/*  orders tab */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
          title: '',
        }}
      />
    </Tabs>
  );
}