import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isFirstLaunched, setIsFirstLaunched] = useState(null);

useEffect(() => {
  AsyncStorage.getItem('alreadyLaunched').then(value => {
    if(value == null){
      AsyncStorage.setItem('alreadyLaunched', 'true');
      setIsFirstLaunched(true);
    } else {
      setIsFirstLaunched(false);
    }
  })
},[])

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

if(isFirstLaunched === null){
  return null;
} else if(isFirstLaunched === true){
  return (
    <Stack screenOptions={{headerShown: false}}>
       <Stack.Screen name="index" options={{headerShown: false}} />
       <Stack.Screen name="(auth)" options={{headerShown: false}} />
       <Stack.Screen name="(app)" options={{headerShown: false}} />
    </Stack>
  )
}
else{
  return (
    <Stack screenOptions={{headerShown: false}} >
       
       <Stack.Screen name="(auth)" options={{headerShown: false}} />
       <Stack.Screen name="(app)" options={{headerShown: false}} />
    </Stack>
  )


}
}
export default RootLayout

