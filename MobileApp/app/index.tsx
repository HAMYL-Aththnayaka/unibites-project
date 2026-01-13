import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreContext } from '../context/StoreContext';
import api from '../lib/axios';

export default function LoginScreen() {
  const [state, setState] = useState<'Login' | 'Sign-up'>('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');

<<<<<<< HEAD
  const storeContext = useContext(StoreContext);
  if (!storeContext) throw new Error('LoginScreen must be used inside StoreContextProvider');

  const { setToken } = storeContext;
=======
  const { setToken } = useContext(StoreContext)!;
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const url = state === 'Login' ? '/api/user/login' : '/api/user/register';
<<<<<<< HEAD
      const payload = state === 'Login' ? { email, password } : { name, email, password, role };
=======

      
      const payload = state === 'Login'
        ? { email, password }
        : { name, email, password, role };
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7

      const res = await api.post(url, payload);

      if (res.data.success) {
        await AsyncStorage.setItem('token', res.data.token);
        setToken(res.data.token);
<<<<<<< HEAD
        router.replace('/(tabs)/Home'); 
      } else {
        Alert.alert("Error", res.data.alert);
=======

        router.replace('/(tabs)/Home');
      } else {
        Alert.alert("Error", res.data.alert); 
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
      }
    } catch (err: any) {
      const msg = err.response?.data?.alert || "Server Error";
      Alert.alert("Registration Failed", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{state}</Text>

      {state === 'Sign-up' && (
        <>
          <TextInput style={styles.input} placeholder="Full Name" onChangeText={setName} />
<<<<<<< HEAD
=======

          <Text style={styles.label}>Select Role:</Text>
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
          <View style={styles.rolePicker}>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'Student' && styles.activeRole]}
              onPress={() => setRole('Student')}
            >
              <Text style={role === 'Student' ? styles.whiteText : styles.orangeText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'Staff' && styles.activeRole]}
              onPress={() => setRole('Staff')}
            >
              <Text style={role === 'Staff' ? styles.whiteText : styles.orangeText}>Staff</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} autoCapitalize="none" />
<<<<<<< HEAD
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
=======
      <TextInput style={styles.input} placeholder="Password (8+ chars & special char)" onChangeText={setPassword} secureTextEntry />
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7

      <TouchableOpacity style={styles.mainBtn} onPress={handleAuth}>
        <Text style={styles.btnText}>{state}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setState(state === 'Login' ? 'Sign-up' : 'Login')}>
        <Text style={styles.toggleText}>
          {state === 'Login' ? "New here? Create an account" : "Have an account? Login here"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

<<<<<<< HEAD


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 30,
     justifyContent: 'center',
      backgroundColor: '#fff' 
    },
  title: {
     fontSize: 32,
      fontWeight: 'bold', 
      color: '#ff6347', 
      marginBottom: 20
     },
  input: {
     borderBottomWidth: 1,
      borderColor: '#ccc',
       marginBottom: 20,
        padding: 10 
      },
  label: { marginBottom: 10,
     fontWeight: 'bold' 
    },
  rolePicker: { 
    flexDirection: 'row',
    marginBottom: 20 
  },
  roleBtn: {
     flex: 1,
      padding: 10, 
      borderWidth: 1, 
      borderColor: '#ff6347', 
      alignItems: 'center', 
      borderRadius: 5, 
      marginHorizontal: 5 
    },
  activeRole: { 
    backgroundColor: '#ff6347' 
  },
  whiteText: { 
    color: '#fff' 
  },
  orangeText: { 
    color: '#ff6347' 
  },
  mainBtn: { 
    backgroundColor: '#ff6347'
    , padding: 15, 
    borderRadius: 10,
     alignItems: 'center' 
    },
  btnText: { 
    color: '#fff',
     fontWeight: 'bold'
     },
  toggleText: { marginTop: 20,
     textAlign: 'center', 
     color: '#666' 
    }
=======
const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ff6347', marginBottom: 20 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10 },
  label: { marginBottom: 10, fontWeight: 'bold' },
  rolePicker: { flexDirection: 'row', marginBottom: 20 },
  roleBtn: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ff6347', alignItems: 'center', borderRadius: 5, marginHorizontal: 5 },
  activeRole: { backgroundColor: '#ff6347' },
  whiteText: { color: '#fff' },
  orangeText: { color: '#ff6347' },
  mainBtn: { backgroundColor: '#ff6347', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  toggleText: { marginTop: 20, textAlign: 'center', color: '#666' }
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
});