// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, StyleSheet ,Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const isEmailValid = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    try {
      // Validate email
      if (!isEmailValid()) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      // Send password reset email
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Check your email for instructions.');
    } catch (error) {
      Alert.alert('Forgot Password Failed', error.message);
    }
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
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={{ color: 'white',fontSize:14,fontWeight:"bold" }}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#8d0fdb', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
          Back to Login
        </Text>
      </TouchableOpacity>
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
  backToLoginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    marginBottom: 20,
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
  forgotPasswordButton: {
    height: 45,
    width: '90%',
    marginLeft: 18,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 7,
  },
});

export default ForgotPasswordScreen;
