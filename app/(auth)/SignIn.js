import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'


const SignIn = () => {

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
    <View className='w-full h-full my-6 flex-1 justify-center px-4'>
    <Image  source={images.logo}
      className='w-[180px] h-[80px]'
      resizeMode='contain'
    />

      <Text className='text-white text-3xl font-psemibold mt-10'>Login to LawLens</Text>
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
        title="Sign in"
        handlePress={submit}
        containerStyle="mt-7"
        isLoading={IsSubmitting}
         />
    </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn