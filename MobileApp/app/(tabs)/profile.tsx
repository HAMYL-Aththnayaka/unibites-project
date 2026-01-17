import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Mail, LogOut } from 'lucide-react-native';
import { StoreContext } from '../../context/StoreContext';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const { token, setToken } = useContext(StoreContext)!;
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name?: string; id?: string }>({});

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }
  }, [token]);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken('');
      router.replace('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>{userInfo.name || "User Name"}</Text>
        <Text style={styles.userRole}>UniBites Member</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <User size={20} color="#ea580c" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{userInfo.name || "Not available"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Mail size={20} color="#ea580c" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>{userInfo.id || "Not available"}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  header: {
    padding: 24,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827'
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatarContainer: { marginBottom: 15 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ea580c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827'
  },
  userRole: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: 'bold',
    marginTop: 4
  },
  infoSection: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 20
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  iconCircle: {
    width: 40,
    height: 40, borderRadius: 20,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  infoTextContainer: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: 'bold'
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    marginTop: 2
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    marginHorizontal: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#fef2f2'
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '900',
    fontSize: 16, marginLeft: 10
  }
});

export default Profile;