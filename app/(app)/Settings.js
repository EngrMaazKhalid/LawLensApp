import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import * as ImagePicker from 'expo-image-picker';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomAlert from '../../components/CustomAlert'
import Alert from '../../components/Alert'

const Settings = () => {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false); // State for logout confirmation alert

  const handleLogout = async () => {
    await logout();
    router.push('/LetIn');
    
  };



  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);


  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        console.log('Selected image URI:', selectedImageUri);

        if (!selectedImageUri) {
          throw new Error('Image URI is invalid');
        }

        const response = await fetch(selectedImageUri);

        if (!response.ok) {
          throw new Error('Failed to fetch image from device');
        }

        const blob = await response.blob();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);

        console.log('Uploading image to Firebase Storage...');
        await uploadBytes(storageRef, blob);
        console.log('Image uploaded successfully.');

        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);

        setPhotoURL(downloadURL);

        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          photoURL: downloadURL,
        });
        console.log('User document updated successfully.');
      }
    } catch (error) {
      console.error('Error picking or uploading image:', error);
      setAlertTitle('Error');
      setAlertMessage('Failed to upload image. Please try again.');
      setAlertVisible(true);
    }
  };

  const handleUpdateProfile = async () => {
    const userDoc = doc(db, "users", user.uid);
    await updateDoc(userDoc, {
        userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      photoURL: photoURL,
    });
    console.log(photoURL);
    // alert('Profile updated successfully');
    setAlertTitle('Updated');
      setAlertMessage('Profile updated successfully');
      setAlertVisible(true);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
    
      <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
        <TouchableOpacity className='h-14  flex align-center justify-center absolute bottom-1 left-5'
               onPress={() => router.back()} activeOpacity={0.7}>
               <AntDesign name="left" size={30} color={'#CDCDE0'} />
             </TouchableOpacity>
             {/* <Text className=' h-18 flex align-center justify-center text-white text-2xl font-psemibold'>Profile</Text> */}
             <View className="flex-1 flex items-center justify-center">
    <Text className='text-white mt-9 ml-5 text-2xl font-psemibold'>Profile</Text>
  </View>
  

      </View>
      <ScrollView>
      <View className="justify-start items-center h-full w-full mt-10 px-4 min-h-[85vh]">
      {/* <View className="flex flex-1 justify-center align-center px-4"> */}
        <TouchableOpacity   onPress={handleImagePick}>
          {/* <Image source={{ uri: photoURL }}  className='' style={{ height: 200, width: 200, borderRadius: 120 }} /> */}
          {photoURL ? (
              <Image source={{ uri: photoURL }} style={{ height: 200, width: 200, borderRadius: 120 }} />
            ) : (
              <FontAwesome name="user" style={{display: 'flex', alignItems:'center', paddingLeft: 35, paddingTop:12 , justifyContent:'center', backgroundColor:'#CDCDE0', borderRadius: 120, width: 200, height:200 }} size={180}  color="white" />
            )}
          <FontAwesome name="edit" style={{ position: 'absolute', bottom: 1, right: 1, padding: 5, borderRadius: 10 }}  size={50} color="#00CDBD" />
        </TouchableOpacity>
        <FormField
         value={userName}
         handleChangeText={setUserName}
          placeholder="Username"
          otherStyles={'mb-[-15px]'}
          className='text-white text-sm font-pmedium mb-[-40px]'
          />
        <FormField
         value={email}
         handleChangeText={setEmail}
          placeholder="Email"
          className='text-white text-sm font-pmedium'
          otherStyles={'mb-[-15px]'}
          />
        <FormField
           value={phoneNumber}
           handleChangeText={setPhoneNumber}
         
          placeholder="Phone Number"
          className='text-white text-sm  font-pmedium'
          />
       
        <CustomButton 
        handlePress={handleUpdateProfile}
        title={'Update Profile'}
        containerStyle="w-full mt-8"

        />
           <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        otherStyles={'bg-secondary'}
      />
   
          
       
        <TouchableOpacity className='w-full mt-4 border-2 border-red-500 rounded-3xl min-h-[62px] justify-center items-center' onPress={handleLogout}>
          <Text className='text-red-500 font-psemibold text-lg text-center '>Logout</Text>
        </TouchableOpacity>
        <Alert
        visible={logoutAlertVisible} />

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
