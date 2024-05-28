// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Slot, SplashScreen, Stack } from 'expo-router'
// import { useFonts } from "expo-font";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContextProvider } from '../context/authContext';


// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [isFirstLaunched, setIsFirstLaunched] = useState(null);

// useEffect(() => {
//   AsyncStorage.getItem('alreadyLaunched').then(value => {
//     if(value == null){
//       AsyncStorage.setItem('alreadyLaunched', 'true');
//       setIsFirstLaunched(true);
//     } else {
//       setIsFirstLaunched(false);
//     }
//   })
// },[])

//     const [fontsLoaded, error] = useFonts({
//         "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//         "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//         "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
//         "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
//         "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//         "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//         "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//         "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//         "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//       });
    
//       useEffect(() => {
//         if (error) throw error;
//         if (fontsLoaded) SplashScreen.hideAsync();
//       }, [fontsLoaded, error]);
// if (!fontsLoaded && !error) return null;

// if(isFirstLaunched === null){
//   return null;
// } else if(isFirstLaunched === true){
//   return (
//     <AuthContextProvider>
//     <Stack screenOptions={{headerShown: false}}>
//        <Stack.Screen name="index" options={{headerShown: false}} />
//        <Stack.Screen name="(auth)" options={{headerShown: false}} />
//        <Stack.Screen name="(app)" options={{headerShown: false}} />
//     </Stack>
//     </AuthContextProvider>
//   )
// }
// else{
//   return (
//     <Stack screenOptions={{headerShown: false}} >
//        <Stack.Screen name="(auth)" options={{headerShown: false}} />
//        <Stack.Screen name="(app)" options={{headerShown: false}} />
//     </Stack>
//   )


// }
// }
// export default RootLayout









// import { View, Text, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
// import { useFonts } from "expo-font";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../context/authContext';  // Assuming you have a useAuth hook

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [isFirstLaunched, setIsFirstLaunched] = useState(null);
//   const { isAuthenticated } = useAuth(); // Destructure isAuthenticated from useAuth
//   const router = useRouter();

//   useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunched(true);
//       } else {
//         setIsFirstLaunched(false);
//       }
//     });
//   }, []);

//   const [fontsLoaded, error] = useFonts({
//     "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
//     "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
//     "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//     "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//     "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//     "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//   });

//   useEffect(() => {
//     if (error) throw error;
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded && !error) return null;

//   if (isFirstLaunched === null) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   } else if (isFirstLaunched === true) {
//     return (
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="(app)" options={{ headerShown: false }} />
//       </Stack>
//     );
//   } else {
//     if (isAuthenticated) {
//       router.push('/Welcome');
//       return null;
//     } else {
//       router.push('/LetIn');
//       return null;
//     }
//   }
// };

// export default RootLayout;


// import React, { useEffect, useState } from 'react';
// import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
// import { useFonts } from "expo-font";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContextProvider, useAuth } from '../context/authContext';

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [isFirstLaunched, setIsFirstLaunched] = useState(null);
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunched(true);
//       } else {
//         setIsFirstLaunched(false);
//       }
//     });
//   }, []);

//   const [fontsLoaded, error] = useFonts({
//     "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
//     "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
//     "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//     "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//     "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//     "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//   });
//   useEffect(() => {
//     if (error) throw error;
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded && !error) return null;

//   if (isFirstLaunched === null) {
//     return null;
//   } else if (isFirstLaunched === true) {
//     return (
//       <AuthContextProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//       </Stack>
//       </AuthContextProvider>
//     );
//   } else {
//     if (isAuthenticated === undefined) {
//       return null;
//     } else if (isAuthenticated) {
//       router.replace('/app/Welcome');
//     } else {
//       router.replace('/auth/LetIn');
//     }
//     return null;
//   }
// };

// export default RootLayout;

// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
// import { useFonts } from "expo-font";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContextProvider, useAuth } from '../context/authContext';

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [isFirstLaunched, setIsFirstLaunched] = useState(null);
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunched(true);
//       } else {
//         setIsFirstLaunched(false);
//       }
//     });
//   }, []);

//   const [fontsLoaded, error] = useFonts({
//     "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
//     "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
//     "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//     "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//     "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//     "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//   });

//   useEffect(() => {
//     if (error) throw error;
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded && !error) return null;

//   useEffect(() => {
//     if (isFirstLaunched !== null && isAuthenticated !== undefined) {
//       if (isFirstLaunched) {
//         router.replace('/index');  // Onboarding screen
//       } else if (isAuthenticated) {
//         router.replace('/app/Welcome');  // User is signed in
//       } else {
//         router.replace('/auth/LetIn');  // User is not signed in
//       }
//     }
//   }, [isFirstLaunched, isAuthenticated]);

//   return null; // Render nothing while navigating
// }

// const AppWrapper = () => {
//   return (
//     <AuthContextProvider>
//       <RootLayout />
//     </AuthContextProvider>
//   );
// }

// export default AppWrapper;
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Slot, SplashScreen, Stack, useRouter } from 'expo-router'
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextProvider, AuthContext } from '../context/authContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isFirstLaunched, setIsFirstLaunched] = useState(null);
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value == null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunched(true);
      } else {
        setIsFirstLaunched(false);
      }
    };

    checkFirstLaunch();
  }, []);

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

  useEffect(() => {
    if (isFirstLaunched !== null && isAuthenticated !== undefined && fontsLoaded) {
      setIsAppReady(true);
      if (isFirstLaunched) {
        router.replace('/index'); // Onboarding screen
      } else if (isAuthenticated) {
        router.replace('/(app)/Welcome'); // User is signed in
      } else {
        router.replace('/(auth)/LetIn'); // User is not signed in
      }
    }
  }, [isFirstLaunched, isAuthenticated, fontsLoaded]);

  if (!fontsLoaded || isFirstLaunched === null || isAuthenticated === undefined) {
    return null;
  }

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Slot />
    </Stack>
  );
}

const AppWrapper = () => {
  return (
    <AuthContextProvider>
      <RootLayout />
    </AuthContextProvider>
  );
}

export default AppWrapper;
