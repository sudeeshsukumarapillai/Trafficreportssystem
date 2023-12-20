
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   PermissionsAndroid,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';
// import { useNavigation } from '@react-navigation/native';

// const DEFAULT_IMAGE_PICKER_OPTIONS = {
//   quality: 1,
//   noData: true,
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
//   customButtons: [
//     {
//       name: 'customOptionKey',
//       title: 'Choose file from library',
//     },
//   ],
//   maxWidth: 5160,
//   maxHeight: 1536,
// };

// const AddPublicReportScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [postTitle, setPostTitle] = useState('');
//   const [postDescription, setPostDescription] = useState('');
//   const [postLocation, setPostLocation] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     requestCameraPermission();
//     requestStoragePermission();
//     fetchUserInfo();
//   }, []);

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs access to your camera.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Camera permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to your storage.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Storage permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const fetchUserInfo = async () => {
//     const user = auth().currentUser;

//     if (user) {
//       const userDoc = await firestore().collection('users').doc(user.uid).get();
//       const userData = userDoc.data();

//       setUserInfo(userData);
//       setUsername(userData.fullName); // Automatically fill the username field
//     }
//   };

//   const handleImagePicker = () => {
//     ImagePicker.showImagePicker(DEFAULT_IMAGE_PICKER_OPTIONS, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log(`ImagePicker Error: ${response.error}`);
//       } else {
//         const source = { uri: response.uri.replace('file://', '') };
//         setSelectedImage(source);
//       }
//     });
//   };

//   const handlePostReport = async () => {
//     try {
//       const uid = auth().currentUser.uid;
//  // Validation
//  if (!postTitle || !postDescription || !postLocation) {
//   Alert.alert('Validation Error', 'Please fill in all required fields.');
//   return;
// }
//       let imageUrl = null;
//       if (selectedImage) {
//         const imageRef = storage().ref(`images/${uid}/${selectedImage.fileName}`);
//         await imageRef.putFile(selectedImage.uri);
//         imageUrl = await imageRef.getDownloadURL();
//       }

//       await firestore().collection('publicReports').add({
//         uid,
//         username,
//         postTitle,
//         postDescription,
//         postLocation,
//         imageUrl,
//         timestamp: firestore.FieldValue.serverTimestamp(),
//       });

//       Alert.alert('Report Posted', 'Your report has been submitted successfully.');
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error('Error posting report:', error);
//       Alert.alert('Error', 'Failed to post report. Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Add Public Report</Text>

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (<>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="black"
//         value={username}
//         editable={false} // Set this to false to make it not editable

//         onChangeText={text => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Post Title"
//         placeholderTextColor="black"
//         value={postTitle}
//         onChangeText={text => setPostTitle(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Post Description"
//         multiline
//         numberOfLines={4}
//         placeholderTextColor="black"
//         value={postDescription}
//         onChangeText={text => setPostDescription(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Post Location"
//         placeholderTextColor="black"
//         value={postLocation}
//         onChangeText={text => setPostLocation(text)}
//       />

//       <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
//         <Text style={{ color: 'white' }}>Select Image</Text>
//       </TouchableOpacity>

//       {selectedImage && (
//         <View>
//           <Text style={styles.previewText}>Image Preview:</Text>
//           <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
//         </View>
//       )}

//       <TouchableOpacity style={styles.submitButton} onPress={handlePostReport}>
//         <Text style={{ color: 'white' }}>Submit Report</Text>
//       </TouchableOpacity>
//          </>
//       )}
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
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: 'gray',
    
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingLeft: 8,
//     borderRadius: 10,
//     width: '100%',
//     color: 'black',
//   },
//   imagePickerButton: {
//     height: 40,
//     width: '80%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8d0fdb',
//     borderRadius: 7,
//     marginBottom: 16,
//   },
//   selectedImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   previewText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: 'black',
//   },
//   submitButton: {
//     height: 40,
//     width: '80%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8d0fdb',
//     borderRadius: 7,
//   },
// });

// export default AddPublicReportScreen;




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_IMAGE_PICKER_OPTIONS = {
  quality: 1,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  customButtons: [
    {
      name: 'customOptionKey',
      title: 'Choose file from library',
      titleTextColor: 'red', // Set the desired text color here
    },
  ],
  maxWidth: 5160,
  maxHeight: 1536,
};

const AddPublicReportScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestCameraPermission();
    requestStoragePermission();
    fetchUserInfo();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchUserInfo = async () => {
    const user = auth().currentUser;

    if (user) {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const userData = userDoc.data();

      setUserInfo(userData);
      setUsername(userData.fullName); // Automatically fill the username field
    }
  };

  const handleImagePicker = () => {
    
    ImagePicker.showImagePicker(DEFAULT_IMAGE_PICKER_OPTIONS, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log(`ImagePicker Error: ${response.error}`);
      } else {
        const source = { uri: response.uri.replace('file://', '') };
        setSelectedImage(source);
      }
    });
  };

  const handlePostReport = async () => {
    try {
      const uid = auth().currentUser.uid;
      // Validation
      if (!postTitle || !postDescription || !postLocation) {
        Alert.alert('Validation Error', 'Please fill in all required fields.');
        return;
      }

      setLoading(true);

      let imageUrl = null;
      if (selectedImage) {
        const imageRef = storage().ref(`images/${uid}/${selectedImage.fileName}`);
        await imageRef.putFile(selectedImage.uri);
        imageUrl = await imageRef.getDownloadURL();
      }

      await firestore().collection('publicReports').add({
        uid,
        username,
        postTitle,
        postDescription,
        postLocation,
        imageUrl,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Report Posted', 'Your report has been submitted successfully.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error posting report:', error);
      Alert.alert('Error', 'Failed to post report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Public Report</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#8d0fdb" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="gray"
            value={username}
            editable={false} // Set this to false to make it not editable
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            placeholderTextColor="gray"
            value={postTitle}
            onChangeText={text => setPostTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Description"
            multiline
            numberOfLines={4}
            placeholderTextColor="gray"
            value={postDescription}
            onChangeText={text => setPostDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Location"
            placeholderTextColor="gray"
            value={postLocation}
            onChangeText={text => setPostLocation(text)}
          />

          <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
            <Text style={{ color: 'white' }}>Select Image</Text>
          </TouchableOpacity>

          {selectedImage && (
            <View>
              <Text style={styles.previewText}>Image Preview:</Text>
              <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handlePostReport}>
            <Text style={{ color: 'white',fontSize:14,fontWeight:'bold' }}>Submit Report</Text>
          </TouchableOpacity>
        </>
      )}
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8d0fdb', // Purple header
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
    width: '100%',
    color: 'black',
  },
  imagePickerButton: {
    height: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb', // Purple button
    borderRadius: 7,
    marginBottom: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  submitButton: {
    height: 45,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d0fdb', // Purple button
    borderRadius: 7,
  },
});

export default AddPublicReportScreen;
