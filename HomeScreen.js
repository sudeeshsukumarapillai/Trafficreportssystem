// // HomeScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext'; // Adjust the path based on your project structure

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const { logout, clearLoginStatus, isUserLoggedIn } = useAuth();

//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const user = auth().currentUser;

//       if (user) {
//         const userDoc = await firestore().collection('users').doc(user.uid).get();
//         setUserInfo(userDoc.data());
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleLogout = async () => {
//     await auth().signOut();
//     await clearLoginStatus();
//     logout()
//   };
//   return (
//     <View style={styles.container}>
//       {userInfo ? (
//         <Text style={styles.text}>Welcome, {userInfo.fullName}!</Text>
//       ) : (
//         <Text style={styles.text}>Welcome to Home Screen</Text>
//       )}

//       <TouchableOpacity style={{height:160,width:200,borderRadius:15,backgroundColor:"skyblue",alignItems:"center",justifyContent:"center"}}
//         onPress={()=>{ navigation.navigate('Services')}}>
//         <Text style={{color:"white",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Report Public Transport Services</Text>
//       </TouchableOpacity>

//        <TouchableOpacity
//         style={{
//           marginTop: 20,
//           padding: 10,
//           backgroundColor: 'red',
//           borderRadius: 8,
//         }}
//         onPress={handleLogout}
//       >
//         <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff', // Set your background color
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333', // Set your text color
//   },
// });

// export default HomeScreen;











// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const { logout, clearLoginStatus, isUserLoggedIn } = useAuth();
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const user = auth().currentUser;

//       if (user) {
//         const userDoc = await firestore().collection('users').doc(user.uid).get();
//         setUserInfo(userDoc.data());
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleLogout = async () => {
//     await auth().signOut();
//     await clearLoginStatus();
//     logout();
//   };

//   return (
//     <View style={styles.container}>
//       {userInfo ? (
//         <Text style={styles.welcomeText}>Welcome {userInfo.fullName}!</Text>
//       ) : (
//         <Text style={styles.welcomeText}>Welcome to Public Transport Reporting</Text>
//       )}


//       <Text style={styles.descriptionText}>
//         Report issues, feedback, or suggestions related to public transport services in your area.
//         Your input helps us enhance the commuting experience for everyone. Whether it's a delayed bus,
//         a cleanliness concern, or an idea for improvement, your voice matters.
//         Join us in shaping a more efficient and comfortable public transportation system!
//       </Text>


//       <TouchableOpacity
//         style={styles.reportButton}
//         onPress={() => {
//           navigation.navigate('Services');
//         }}
//       >
//         <Text style={styles.reportButtonText}>Report Public Transport Services</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   descriptionText: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   reportButton: {
//     height: 50,
//     width: '80%',
//     borderRadius: 15,
//     backgroundColor: '#3498db',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   reportButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign:"center"
//   },
//   logoutButton: {
//     padding: 10,
//     backgroundColor: 'red',
//     borderRadius: 8,
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default HomeScreen;







import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, clearLoginStatus, isUserLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth().currentUser;

      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        setUserInfo(userDoc.data());
      }
    };

    fetchUserInfo();
  }, []);

  // const handleLogout = async () => {
  //   await auth().signOut();
  //   await clearLoginStatus();
  //   logout();
  // };
  const handleLogout = async () => {
    // Sign out the user regardless of the authentication method
    await auth().signOut();

    // If the user signed in with Google, sign them out from Google as well
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign Out Error:', error);
    }

    // Clear login status and perform any other necessary logout tasks
    await clearLoginStatus();
    logout();
  };
  return (
    <View style={styles.container}>
      {userInfo ? (
        <Text style={styles.welcomeText}>Welcome, {userInfo.fullName}!</Text>
      ) : (
        <Text style={styles.welcomeText}>Welcome to Public Transport Reporting</Text>
      )}

      <Text style={styles.descriptionText}>
        Report issues, feedback, or suggestions related to public transport services in your area.
        Your input helps us enhance the commuting experience for everyone. Whether it's a delayed bus,
        a cleanliness concern, or an idea for improvement, your voice matters.
        Join us in shaping a more efficient and comfortable public transportation system!
      </Text>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => {
          navigation.navigate('Services');
        }}
      >
        <Text style={styles.reportButtonText}>Report Public Transport Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light Gray background
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  reportButton: {
    height: 50,
    width: '80%',
    borderRadius: 15,
    backgroundColor: '#3498db', // Blue button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#e74c3c', // Red button
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
