// // screens/LoginScreen.js
// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../context/AuthContext';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const { login } = useAuth();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const isEmailValid = () => {
//     // Simple email validation using regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isPasswordValid = () => {
//     // Password must be at least 6 characters
//     return password.length >= 6;
//   };

//   const handleLogin = async () => {
//     try {
//       // Validate email
//       if (!isEmailValid()) {
//         Alert.alert('Login Failed', 'Please enter a valid email address.');
//         return;
//       }

//       // Validate password
//       if (!isPasswordValid()) {
//         Alert.alert('Login Failed', 'Password must be at least 6 characters.');
//         return;
//       }

//       // Attempt to sign in
//       await auth().signInWithEmailAndPassword(email, password);
//       await AsyncStorage.setItem('isLoggedIn', 'true');
//       login();
//       navigation.navigate('Home');
//     } catch (error) {
//       // Handle login failure
//       console.error('Login Failed', error.message);
//       Alert.alert('Login Failed', error.message);
//     }
//   };

//   const handleReg = () => {
//     navigation.navigate('Register');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="black"
//         onChangeText={(text) => setEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="black"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//       />

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={{ color: 'white' }}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.forgotPassword}
//         onPress={() => {
//           navigation.navigate('ForgotPassword');
//         }}
//       >
//         <Text style={{ color: 'blue' }}>Forgot password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.googleLogin}>
//         <Text style={{ color: 'white' }}>Login with Google</Text>
//       </TouchableOpacity>
//       <View style={styles.registerContainer}>
//         <Text style={{ marginRight: 5, color: 'gray' }}>Don't have an account?</Text>
//         <TouchableOpacity style={styles.register} onPress={handleReg}>
//           <Text style={{ color: 'white' }}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor:"#ffffff"

//   },
//   input: {
//     height: 45,
//     color:'black',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 8,
//     borderRadius: 10,
//   },
//   loginButton: {
//     height: 40,
//     width: '90%',
//     marginLeft: 18,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8d0fdb',
//     borderRadius: 7,
//   },
//   forgotPassword: {
//     height: 40,
//     width: '90%',
//     marginLeft: 18,
//     margin: 10,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   googleLogin: {
//     height: 40,
//     width: '90%',
//     marginLeft: 18,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8d0fdb',
//     borderRadius: 7,
//   },
//   register: {
//     height: 35,
//     width: '20%',
//     marginLeft: 5,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8d0fdb',
//     borderRadius: 7,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = () => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    // Password must be at least 6 characters
    return password.length >= 6;
  };

  GoogleSignin.configure({
    webClientId:
      '500024395973-cfsek2ahgbuc73chdaqku5neiq9oh1dj.apps.googleusercontent.com',
  });
  const handleLogin = async () => {
    try {
      // Validate email
      if (!isEmailValid()) {
        Alert.alert('Login Failed', 'Please enter a valid email address.');
        return;
      }

      // Validate password
      if (!isPasswordValid()) {
        Alert.alert('Login Failed', 'Password must be at least 6 characters.');
        return;
      }

      // Attempt to sign in
      await auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      login();
      navigation.navigate('Home');
    } catch (error) {
      // Handle login failure
      console.error('Login Failed', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Store user data in Firestore
      const authUser = await auth().signInWithCredential(auth.GoogleAuthProvider.credential(userInfo.idToken));
      await firestore().collection('users').doc(authUser.user.uid).set({
        email: authUser.user.email,
        fullName: userInfo.user.givenName, // Adjust this based on the user information available
      });

      // Navigate to Home screen or perform other actions
      await AsyncStorage.setItem('isLoggedIn', 'true');
      login();
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available or outdated.');
      } else {
        console.log('Something went wrong:', error);
      }
    }
  };
  const handleReg = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assects/appIcon.png')} // Add your app logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}
      >
        <Text style={{ color: '#8d0fdb', fontSize: 14, fontWeight: 'bold', }}>Forgot password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleLogin}
       onPress={handleSignIn}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Login with Google</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={{ marginRight: 5, color: '#666', fontSize: 14 }}>Don't have an account?</Text>
        <TouchableOpacity style={styles.register} onPress={handleReg}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 45,
    color: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 16,
    borderRadius: 10,
    width: '100%',
  },
  loginButton: {
    height: 45,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 10,
  },
  forgotPassword: {
    height: 40,
    width: '90%',
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  googleLogin: {
    height: 45,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 10,
  },
  register: {
    height: 35,
    width: '30%',
    marginLeft: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb',
    borderRadius: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;
