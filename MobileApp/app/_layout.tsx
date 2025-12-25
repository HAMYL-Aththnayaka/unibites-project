import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

/**
 * The Layout file defines the navigation structure.
 * We use a Stack to manage screen transitions.
 */
export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* Sets the status bar (time, battery, etc.) to a dark style */}
      <StatusBar style="dark" />
      
      <Stack
        screenOptions={{
          // Global header configuration
          headerShown: false, // We hide the default header to use our custom one in Home.tsx
          contentStyle: { backgroundColor: '#FAFAFA' },
          animation: 'fade_from_bottom',
        }}
      >
        {/* The 'index' corresponds to your index.tsx or Home.tsx depending on your file names */}
        <Stack.Screen name="index" /> 
        {/* Add more screens here as you create them */}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});