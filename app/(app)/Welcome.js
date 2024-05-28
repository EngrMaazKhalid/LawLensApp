
import { View, Text, SafeAreaView, ScrollView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images, images } from '../../constants'
import { Image } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { useAuth } from '../../context/authContext'
import { FontAwesome } from '@expo/vector-icons';



const Welcome = () => {
  const { user, logout, getChats, deleteChat } = useAuth(); // Destructure getChats and deleteChat from useAuth
  const [savedChats, setSavedChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      setSavedChats(chats);
    };
    fetchChats();
  }, []);

  const handleDeleteChat = async (chatId) => {
    await deleteChat(chatId);
    setSavedChats(savedChats.filter(chat => chat._id !== chatId));
  };
  const handleLogout = async () => {
    await logout();
    router.push('/LetIn');
  };
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
      {/* <Text style={{ flex: 1, fontFamily: 'Poppins-Medium' }}>{item.text}</Text> */}
      <Text style={{ flex: 1, fontFamily: 'Poppins-Medium' }}>{item.messages[0]?.text || "Chat"}</Text>
      <TouchableOpacity onPress={() => handleDeleteChat(item._id)}>
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );


  return (
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
handlePress={()=> router.push('/Gpt')}
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