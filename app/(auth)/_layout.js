import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthContextProvider, useAuth } from '../../context/authContext'


// const MainLayout = () =>{
//   const {isAuthenticated} = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(()=>{
//     // if(typeof isAuthenticated == 'undefined'){
//     //   return
//     // }
//     const inApp = segments[0]== '(app)';


//     if(!isAuthenticated && !inApp){
      
//       router.replace('/LetIn')
//     }
//     else if(isAuthenticated== false)
//     {
//        router.replace('/SignIn')
//     } 
//   }, [isAuthenticated])

//   return <Slot />
// }
const AuthLayout = () => {


  return (
    <>
        <Stack>
            <Stack.Screen name="LetIn" options={{headerShown: false}} />
            <Stack.Screen name="SignIn" options={{headerShown: false}}  />
            <Stack.Screen name="SignUp" options={{ headerShown: false}} />
            <StatusBar style="light" backgroundColor="#161622" />
        </Stack>
    </>
    // <AuthContextProvider>
    //   <MainLayout />
    // </AuthContextProvider>
  )
}

export default AuthLayout