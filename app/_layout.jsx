// import { View, Text, StyleSheet } from 'react-native'
// import React, { useEffect } from 'react'
// import { Slot, useRouter, useSegments } from 'expo-router'

// import { AuthContextProvider, useAuth } from '../context/authContext'


//   const MainLayout =()=>{
//     const {isAuthenticated} = useAuth();
//     const segments = useSegments();
//     const router = useRouter(); 

//     useEffect(()=>{
//         if (typeof isAuthenticated== 'undefined') 
//         return;

//         const inApp = segments[0]=='(app)'

//         if(isAuthenticated && !inApp){

//           //redirect to home
//           router.replace('home')
//         }else if(isAuthenticated==false){

//           //redirect to signin
//           router.replace('signIn')
//         }
//     },[isAuthenticated])



//     return <Slot />
//   }

// const RootLayout = () => {
//   return (
//     <AuthContextProvider style={styles.container}>
//     <MainLayout />
//     </AuthContextProvider>
//   )
// }

// export default RootLayout 
// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
    
    
//   }
// })
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from "expo-font";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      });
    
      useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
      }, [fontsLoaded, error]);
if (!fontsLoaded && !error) return null;

  return (
    <Stack>
       <Stack.Screen name="index" options={{headerShown: false}} />
       <Stack.Screen name="(auth)" options={{headerShown: false}} />
       <Stack.Screen name="(app)" options={{headerShown: false}} />
    </Stack>
  )
}

export default RootLayout
