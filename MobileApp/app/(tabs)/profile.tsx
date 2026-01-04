import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token logic
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Alex Rodriguez</Text>
        <Text style={styles.email}>alex@campus.edu</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FAFAFA' },
  header: { alignItems: 'center', marginTop: 50 },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { color: '#9ca3af' },
  logoutBtn: { marginTop: 'auto', backgroundColor: '#fee2e2', padding: 20, borderRadius: 16, alignItems: 'center' },
  logoutText: { color: '#ef4444', fontWeight: 'bold' }
});