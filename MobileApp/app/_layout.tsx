<<<<<<< HEAD
import React from 'react';
import { Slot } from 'expo-router';
=======

import { Stack } from 'expo-router';
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
import { StoreContextProvider } from '../context/StoreContext';

export default function RootLayout() {
  return (
    <StoreContextProvider>
<<<<<<< HEAD
      <Slot />  
    </StoreContextProvider>
  );
}
=======
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="(tabs)" /> 
        <Stack.Screen name="cart" />
      </Stack>
    </StoreContextProvider>
  );
}
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
