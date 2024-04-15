import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

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
  )
}

export default AuthLayout