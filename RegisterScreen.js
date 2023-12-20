// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const isEmailValid = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    // Password must be at least 6 characters
    return password.length >= 6;
  };

  const isFullNameValid = () => {
    // Full Name is required
    return fullName.trim() !== '';
  };

  const handleRegister = async () => {
    try {
      // Validate email
      if (!isEmailValid()) {
        Alert.alert('Registration Failed', 'Please enter a valid email address.');
        return;
      }

      // Validate password
      if (!isPasswordValid()) {
        Alert.alert('Registration Failed', 'Password must be at least 6 characters.');
        return;
      }

      // Validate Full Name
      if (!isFullNameValid()) {
        Alert.alert('Registration Failed', 'Full Name is required.');
        return;
      }

      // Check if the email is already in use
      const emailInUse = await auth().fetchSignInMethodsForEmail(email);

      if (emailInUse && emailInUse.length > 0) {
        // Email is already in use
        Alert.alert('Registration Failed', 'The email address is already in use by another account.');
      } else {
        // Create a new account
        const authUser = await auth().createUserWithEmailAndPassword(email, password);
        // Store additional user information in Firestore
        await firestore().collection('users').doc(authUser.user.uid).set({
          email: authUser.user.email,
          fullName,
        });
        // Navigate to the login screen after successful registration
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  const handleLog = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems:"center"}}>
      <Image
        source={require('../assects/appIcon.png')} // Add your app logo path
        style={styles.logo}
        resizeMode="contain"
      />
      </View>
     
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleRegister}
      >
        <Text style={{ color: 'white',fontSize:14 ,fontWeight: 'bold'}}>Register</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={{ marginRight: 5, color: 'gray' ,}}>Already have an account?</Text>
        <TouchableOpacity style={styles.register} onPress={handleLog}>
          <Text style={{ color: 'white',fontWeight: 'bold' ,fontSize:14}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    color:"black"
  },
  forgotPassword: {
    height: 45,
    width: '90%',
    marginLeft: 18,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 7,
  },
  register: {
    height: 35,
    width: '20%',
    marginLeft: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 7,
  }, 
  logo: {
    height: 100,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default RegisterScreen;
