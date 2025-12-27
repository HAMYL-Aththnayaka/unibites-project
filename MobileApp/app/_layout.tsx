import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This redirects the initial launch to the tabs group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}