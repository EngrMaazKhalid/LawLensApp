import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { Image } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'




const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">

<ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className=" justify-start items-center h-full w-full px-4 mt-10 min-h-[85vh]">
      <Image source={images.hammer}
    className='min-w-[500px] w-full h-[400px]'
    resizeMode="contain"
/>
<View className="relative mt-2">
<Text className="text-4xl text-white font-bold text-center mt-5 mb-5">Welcome to{' '}
<Text className='text-secondary'>
 LawLens
</Text></Text>
<Text className='text-white mt-9 text-center text-xl font-psemibold '>Let's have chat with LawLens!</Text>
<Text className='text-white mt-2 mb-5 text-center text-sm font-pregular '>Resolve your problems using LawLens!</Text>
<CustomButton 
    title='Start Chat with you AI Lawyer'
handlePress={()=> router.push('/Chat')}
containerStyle="mt-9"
/>
</View>

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome