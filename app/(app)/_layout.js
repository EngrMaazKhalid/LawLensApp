import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ChatLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen name="Welcome" options={{headerShown: false}} />
            <Stack.Screen name="Chat" options={{headerShown: false}} />
            <StatusBar style="light" backgroundColor="#161622" />
        </Stack>
    </>
  )
}

export default ChatLayout