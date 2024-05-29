
import { View, Text, SafeAreaView, ScrollView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images, images } from '../../constants'
import { Image } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { useAuth } from '../../context/authContext'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc, updateDoc, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Welcome = () => {

  const { user, isAuthenticated, getChats } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
        const fetchChats = async () => {
            try {
                const savedChats = await getChats();
                setChats(savedChats);
            } catch (error) {
                console.error('Error retrieving chats:', error);
            }
        };
        fetchChats();
    }
}, [isAuthenticated, user]);
// const handleDeleteChat = async (chatId) => {
//   try {
//       // Delete chat from Firestore
//       await deleteDoc(doc(db, 'chats', chatId));
//       // Remove chat reference from user document
//       const userDocRef = doc(db, 'users', user.uid);
//       await updateDoc(userDocRef, {
//           chats: arrayRemove(chatId),
//       });
//       // Update local state
//       setChats(chats.filter(chat => chat._id !== chatId));
//   } catch (error) {
//       console.error('Error deleting chat:', error);
//   }
// };


// const handleDeleteChat = async (chatId) => {
//   try {
//       // Fetch user document to ensure chat list consistency
//       const userDocRef = doc(db, 'users', user.uid);
//       const userDoc = await getDoc(userDocRef);
//       if (userDoc.exists()) {
//           const userData = userDoc.data();
//           const userChats = userData.chats || [];
//           console.log('Current user chats:', userChats);

//           // Delete chat from Firestore
//           await deleteDoc(doc(db, 'chats', chatId));
          
//           // Remove chat reference from user document
//           await updateDoc(userDocRef, {
//               chats: arrayRemove(chatId),
//           });

//           // Update local state
//           setChats(chats.filter(chat => chat._id !== chatId));
//       } else {
//           console.error('User document does not exist');
//       }
//   } catch (error) {
//       console.error('Error deleting chat:', error);
//   }
// };

const handleDeleteChat = async (chatId) => {
  try {
      if (!chatId) {
          console.error('Invalid chat ID');
          return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
          const userData = userDoc.data();
          const userChats = userData.chats || [];

          console.log('Current user chats:', userChats);

          if (!userChats.includes(chatId)) {
              console.error('Chat ID not found in user chats');
              return;
          }

          await deleteDoc(doc(db, 'chats', chatId));

          await updateDoc(userDocRef, {
              chats: arrayRemove(chatId),
          });

          setChats(chats.filter(chat => chat._id !== chatId));
      } else {
          console.error('User document does not exist');
      }
  } catch (error) {
      console.error('Error deleting chat:', error);
  }
};

  const renderChatItem = ({ item }) => (
    <View className='bg-gray-800 p-4 my-2 rounded-2xl mt-5 w-full flex-row justify-between items-center'>
    <TouchableOpacity className='bg-gray-800 p-4 my-2 rounded-2xl mt-5 w-full' onPress={() => router.push(`/Gpt/${item._id}`)}>
        <Text className='font-poppins-medium text-white'>{item.messages[item.messages.length - 1].text}</Text>
        <Text className='font-poppins-regular text-secondary mt-3'>  {new Date(item.messages[item.messages.length - 1].createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleDeleteChat(item._id)}>
                <AntDesign name="delete" size={50} color="red" />
            </TouchableOpacity>
            </View>
);
 

  return (
//     <SafeAreaView className="bg-primary h-full">
// <StatusBar style="auto" backgroundColor="#161622" />

//            <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
           
//            <Image source={images.logoLaw} className='w-10 h-10 align-center justify-center flex-1 right-5 top-12' resizeMode='contain' />
//            <View className="flex-1 flex items-start justify-center">
          
//     {/* <Text className='text-white mt-9 ml-5 text-2xl font-psemibold'>LawLens</Text> */}
//   </View>
//         <TouchableOpacity className='h-14 w-10 align-center justify-center absolute bottom-1 right-4'
//           onPress={() => router.push('/Settings')} activeOpacity={0.7}>
//           {user?.photoURL !== null ? (
//               <Image source={{ uri: user?.photoURL }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 3}} />
//             ) : (
//               <FontAwesome name="user" style={{display: 'flex', alignItems:'center' , justifyContent:'center', paddingLeft: 8 , paddingTop: 3, overflow: 'hidden' , backgroundColor:'#CDCDE0', height: 40, width: 40, borderRadius: 50}} size={35}  color="white" />
//             )}
         
//           {/* <Image source={{ uri: user?.photoURL }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 3 }} /> */}
//         </TouchableOpacity>
//            </View>
           
// <ScrollView contentContainerStyle={{ height: "100%" }}>
//       {/* {savedChats.length === 0 ? ( */}

// {/* {fetchChats.length === 0 ? (       */}
//     {/* <View className="flex flex-1 justify-start h-full w-full mt-[-20px] px-4 min-h-[85vh]">
//         <FlatList
//                 data={chats}
//                 renderItem={renderChatItem}
//                 keyExtractor={(item) => item._id.toString()}
//                 contentContainerStyle={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
//             />

// <CustomButton 
//     title='Start Chat with you AI Lawyer'
// handlePress={()=> router.push('/Open')}
// containerStyle="mb-9"
// />
// </View> */}
// {/* ) : ( */}
  
//   <View className=" justify-start h-full w-full mt-[-20px] px-4 min-h-[85vh]">
//        <Image source={images.hammer}
//     className='min-w-[500px] w-full h-[400px]'
//     resizeMode="contain"
// />
// <View className="relative">
// <Text className="text-4xl text-white font-bold text-center mt-5 mb-5">Welcome to{' '}
// <Text className='text-secondary'>
//  LawLens
// </Text></Text>
// <Text className='text-white mt-9 text-center text-xl font-psemibold '>Let's have chat with LawLens!</Text>
// <Text className='text-white mt-2 mb-5 text-center text-sm font-pregular '>Resolve your problems using LawLens!</Text>
// <CustomButton 
//     title='Start Chat with you AI Lawyer'
// handlePress={()=> router.push('/Gpt')}
// containerStyle="mt-9"
// />
// </View> 

//      </View>
//      )} 
//             </ScrollView>
//     </SafeAreaView>
<SafeAreaView className="bg-primary h-full">
<StatusBar style="auto" backgroundColor="#161622" />

           <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
           
           <Image source={images.logoLaw} className='w-10 h-10 align-center justify-center flex-1 right-5 top-12' resizeMode='contain' />
           <View className="flex-1 flex items-start justify-center">
          
    {/* <Text className='text-white mt-9 ml-5 text-2xl font-psemibold'>LawLens</Text> */}
  </View>
        <TouchableOpacity className='h-14 w-10 align-center justify-center absolute bottom-1 right-4'
          onPress={() => router.push('/Settings')} activeOpacity={0.7}>
          {user?.photoURL !== null ? (
              <Image source={{ uri: user?.photoURL }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 3}} />
            ) : (
              <FontAwesome name="user" style={{display: 'flex', alignItems:'center' , justifyContent:'center', paddingLeft: 8 , paddingTop: 3, overflow: 'hidden' , backgroundColor:'#CDCDE0', height: 40, width: 40, borderRadius: 50}} size={35}  color="white" />
            )}
         
          {/* <Image source={{ uri: user?.photoURL }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 3 }} /> */}
        </TouchableOpacity>
           </View>
           
<ScrollView contentContainerStyle={{ height: "100%" }}>
      {/* {savedChats.length === 0 ? ( */}
        <View className=" justify-start items-center h-full w-full mt-[-20px] px-4 min-h-[85vh]">
      <Image source={images.hammer}
    className='min-w-[500px] w-full h-[400px]'
    resizeMode="contain"
/>
<View className="relative">
<Text className="text-4xl text-white font-bold text-center mt-5 mb-5">Welcome to{' '}
<Text className='text-secondary'>
 LawLens
</Text></Text>
<Text className='text-white mt-9 text-center text-xl font-psemibold '>Let's have chat with LawLens!</Text>
<Text className='text-white mt-2 mb-5 text-center text-sm font-pregular '>Resolve your problems using LawLens!</Text>
<CustomButton 
    title='Start Chat with you AI Lawyer'
handlePress={()=> router.push('/Option')}
containerStyle="mt-9"
/>
</View>

     </View>
            </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome

// import { View, Text, SafeAreaView, ScrollView, FlatList, StatusBar, TouchableOpacity, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { images } from '../../constants';
// import CustomButton from '../../components/CustomButton';
// import { router } from 'expo-router';
// import { useAuth } from '../../context/authContext';
// import { FontAwesome } from '@expo/vector-icons';

// const Welcome = () => {
//   const { user, logout, getChats, deleteChat } = useAuth(); // Destructure getChats and deleteChat from useAuth
//   const [savedChats, setSavedChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       const chats = await getChats();
//       setSavedChats(chats);
//     };
//     fetchChats();
//   }, []);

//   const handleDeleteChat = async (chatId) => {
//     await deleteChat(chatId);
//     setSavedChats(savedChats.filter(chat => chat._id !== chatId));
//   };

//   const renderItem = ({ item }) => (
//     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
//       <Text style={{ flex: 1, fontFamily: 'Poppins-Medium' }}>{item.text}</Text>
//       <TouchableOpacity onPress={() => handleDeleteChat(item._id)}>
//         <FontAwesome name="trash" size={24} color="red" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <StatusBar style="auto" backgroundColor="#161622" />
//       <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
//         <TouchableOpacity onPress={() => router.push('/Chat')}>
//           {/* Add any content or icon you want for navigation */}
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className="justify-start items-center h-full w-full mt-[-20px] px-4 min-h-[85vh]">
//           <Image source={images.hammer}
//             className='min-w-[500px] w-full h-[400px]'
//             resizeMode="contain"
//           />
//           <View className="relative">
//             <Text className="text-4xl text-white font-bold text-center mt-5 mb-5">Welcome to{' '}
//               <Text className='text-secondary'>
//                 LawLens
//               </Text>
//             </Text>
//             <Text className='text-white mt-9 text-center text-xl font-psemibold '>Let's have chat with LawLens!</Text>
//             <Text className='text-white mt-2 mb-5 text-center text-sm font-pregular '>Resolve your problems using LawLens!</Text>
//             <CustomButton
//               title='Start Chat with your AI Lawyer'
//               handlePress={() => router.push('/Chat')}
//               containerStyle="mt-9"
//             />
//           </View>
//           {savedChats.length === 0 ? (
//             // Render alternate view if no saved chats
//             <View className="flex-1 justify-center items-center">
//               <Image source={images.noChatsImage} // Replace with your actual image
//                 className='min-w-[300px] w-full h-[300px]'
//                 resizeMode="contain"
//               />
//               <Text className="text-white mt-5 text-center text-xl">No saved chats yet. Start a conversation!</Text>
//             </View>
//           ) : (
//             // Render FlatList if there are saved chats
//             <FlatList
//               data={savedChats}
//               renderItem={renderItem}
//               keyExtractor={item => item._id.toString()}
//               contentContainerStyle={{ padding: 16 }}
//             />
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default Welcome;

 {/* </View> */}
       
      
      {/* ) :(
        <View className=" justify-start items-center h-full w-full mt-[-20px] px-4 min-h-[85vh]">
        {/* <FlatList
        data={savedChats}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={{ padding: 16 }}
      /> */}

//       <FlatList
//               data={savedChats}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => item._id?.toString() || index.toString()}
//               contentContainerStyle={{ padding: 16 }}
//             />
// <CustomButton 
//     title='Start Chat with you AI Lawyer'
// handlePress={()=> router.push('/Chat')}
// containerStyle="mt-9"
// /><