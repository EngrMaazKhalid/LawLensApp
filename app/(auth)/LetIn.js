import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

const LetIn = () => {
  return (
    <SafeAreaView className='bg-primary h-full flex-1'>
    <ScrollView>
  <View className='justify-center items-center px-4 '>

    <Image source={images.logo}
      className='w-[260px] h-[140px] mt-10'
      resizeMode='contain'
    />
      <Text className='text-white text-4xl font-pbold mt-4 mb-5'>Let's You In</Text>
  </View>
  <View className='px-5 my-5' >

     <TouchableOpacity 
     className='w-full bg-gray-200 rounded-xl min-h-[62px] 
     justify-center items-center border-gray-500 border ' 
     activeOpacity={0.7}
   
     handlePress={()=> {}}
     >
     
      <Image source={images.facebook}
        resizeMethod='contain'
        className='w-6 h-6 absolute left-12'
      />

      <Text 
      className='text-center text-white text-sm 
      font-psemibold py-3'>Continue with Facebook</Text>
     </TouchableOpacity>



     <TouchableOpacity 
     className='w-full bg-gray-200 rounded-xl min-h-[62px] 
     justify-center items-center border-gray-500 border mt-5'
     activeOpacity={0.7}
   
     onPress={()=> {}}
     >

   <Image source={images.google}
        resizeMethod='contain'
        className='w-6 h-6 absolute left-12'
        
      />

      <Text 
      className='text-center text-white text-sm 
      font-psemibold py-3'>Continue with Google</Text>
     </TouchableOpacity>
  </View>

    <View className='flex-row align-center mt-10 px-5'>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
      <Text className='text-gray-500 mx-4 -top-3 font-semibold text-sm'>or</Text>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
    </View>
    <View className='px-5' >
    <CustomButton
    title='Sign in with password'
handlePress={()=> router.push('/SignIn')}
containerStyle="w-full mt-8"
    />
<Text className='text-gray-100 mt-9 text-center text-sm font-pregular '>Don't have an account?{' '}
  
 <Text 
 onPress={()=> router.push('/SignUp')} 
 className='text-secondary font-psemibold'
 activeOpacity={0.7}
 >
 SignUp
</Text>

</Text>
    </View>
</ScrollView>
    </SafeAreaView>
  )
}

export default LetIn