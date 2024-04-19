import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

const SignUp = () => {

  const [form, setform] = useState({
    email: '',
    password: ''
  })

  const [IsSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {

  }



  return (
   <SafeAreaView className='bg-primary h-full'>
   <ScrollView>
    <View className='w-full h-full my-9 flex-1 justify-center px-4'>


      <Text className='text-white text-3xl font-psemibold mt-10'>Create your Account</Text>
      <FormField 
        title='Email'
        value={form.email}
        handleChangeText={(text)=> setform({...form, email: text})}
        otherStyles="mt-7"
        keyboardType='email-address'

      />
      <FormField 
        title='Password'
        value={form.password}
        handleChangeText={(text)=> setform({...form, password: text})}
        otherStyles="mt-7"
        keyboardType='default'
        secureTextEntry={true}
        />

        <CustomButton
        title="Sign Up"
        handlePress={submit}
        containerStyle="mt-7 mb-5"
        isLoading={IsSubmitting}
         />
      

    </View>


    <View className='flex-row align-center mt-10 px-5'>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
      <Text className='text-white mx-4 -top-3 font-semibold text-sm'>or continue with</Text>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
    </View>
    <View className='flex justify-center items-center px-5 my-5' >
<View className='flex-row'>
<TouchableOpacity 
className='min-w-[100px] bg-gray-200 rounded-3xl min-h-[62px] 
justify-center items-center border-gray-500 border p-5' 
activeOpacity={0.7}

handlePress={()=> {}}
>

 <Image source={images.facebook}
   resizeMethod='contain'
   className='w-6 h-6'
 />

</TouchableOpacity>



<TouchableOpacity 
className='min-w-[100px] bg-gray-200 rounded-3xl min-h-[62px] 
justify-center items-center border-gray-500 border p-5 ml-5'
activeOpacity={0.7}

onPress={()=> {}}
>

<Image source={images.google}
   resizeMethod='contain'
   className='w-6 h-6'
   
 />
</TouchableOpacity>

</View>
<Text className='text-gray-100 mt-8 text-center text-sm font-pregular '>Already have an account?{' '}
  
  <Text 
  onPress={()=> router.push('/SignIn')} 
  className='text-secondary font-psemibold'
  activeOpacity={0.7}
  >
  SignIn
 </Text>
 
 </Text>
</View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default SignUp