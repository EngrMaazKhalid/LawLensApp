import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants'
import { router } from 'expo-router';
const Option = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    <StatusBar style="auto" backgroundColor="#161622" />
      <View className='h-[80px] bg-gray-200 w-full px-3 flex-row flex  align-center justify-center'>
      {/* <Image source={images.logoLaw} className='w-10 h-10 align-center justify-center flex-1 right-5 top-12' resizeMode='contain' /> */}
<Text className='text-white text-2xl font-bold mt-7'>Your AI Options</Text>
      </View>
      <View className="flex flex-1 justify-center space-y-20 items-center h-full w-full px-4 min-h-[85vh]">
      <TouchableOpacity
       className="bg-gray-200 p-6 flex justify-center items-center border-secondary border-2 rounded-2xl space-y-4 shadow-lg"
        onPress={()=> router.push('/Gpt')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="file-document-outline" size={130} color="#00CDBD" />
        <Text className='text-xl text-white font-bold' >Law Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
               className="bg-gray-200 p-6 flex justify-center items-center border-secondary border-2 rounded-2xl space-y-4 shadow-lg"
        onPress={()=> router.push('/Chat')}


        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="robot-outline" size={130} color="#00CDBD" />
        <Text className='text-xl text-white font-bold' >AI Lawyer</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

  )
}

export default Option