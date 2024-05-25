// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import { Slot, Stack, useRouter, useSegments } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { AuthContextProvider, useAuth } from '../../context/authContext'

// const AuthLayout = () => {


//   return (
//     <>
//         <Stack>
//             <Stack.Screen name="LetIn" options={{headerShown: false}} />
//             <Stack.Screen name="SignIn" options={{headerShown: false}}  />
//             <Stack.Screen name="SignUp" options={{ headerShown: false}} />
//             <StatusBar style="light" backgroundColor="#161622" />
//         </Stack>
//     </>
//     // <AuthContextProvider>
//     //   <MainLayout />
//     // </AuthContextProvider>
//   )
// }

// export default AuthLayout






import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from '../../context/authContext';

const AuthLayout = () => {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="LetIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <StatusBar style="light" backgroundColor="#161622" />
      </Stack>
    </AuthContextProvider>
  );
};

export default AuthLayout;
