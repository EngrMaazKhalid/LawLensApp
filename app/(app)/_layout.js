import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthContextProvider } from '../../context/authContext';
const ChatLayout = () => {
  return (
    <>
        <AuthContextProvider>
        <Stack>
            <Stack.Screen name="Welcome" options={{headerShown: false}} />
            <Stack.Screen name="Chat" options={{headerShown: false}} />
            <Stack.Screen name="Gpt" options={{headerShown: false}} />
            <Stack.Screen name="Settings" options={{headerShown: false}} />
            <StatusBar style="light" backgroundColor="#161622" />
        </Stack>
        </AuthContextProvider>
    </>
  )
}

export default ChatLayout