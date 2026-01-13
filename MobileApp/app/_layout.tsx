import React from 'react';
import { Slot } from 'expo-router';
import { StoreContextProvider } from '../context/StoreContext';

export default function RootLayout() {
  return (
    <StoreContextProvider>
      <Slot />  
    </StoreContextProvider>
  );
}
