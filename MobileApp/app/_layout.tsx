import React from 'react';
import { Stack } from 'expo-router';
import { StoreContextProvider } from '../context/StoreContext';

export default function RootLayout() {
  return (
    <StoreContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cart" />
      </Stack>
    </StoreContextProvider>
  );
}
