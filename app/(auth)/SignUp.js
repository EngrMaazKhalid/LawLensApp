import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router, useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'
import CustomAlert from '../../components/CustomAlert'

const SignUp = () => {

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const handleRegister = async () => {
    // if (!userNameRef.current || !emailRef.current || !passwordRef.current) {
    //   Alert.alert('Sign Up', 'Please fill all fields');
    //   return;
    // }

    if (!userNameRef.current || !emailRef.current || !passwordRef.current) {
      setAlertTitle('Sign Up');
      setAlertMessage('Please fill in all fields');
      setAlertVisible(true);
      return;
    }


    setIsSubmitting(true);
    let response = await register(emailRef.current, passwordRef.current, userNameRef.current);
    setIsSubmitting(false);

    // if (!response.success) {
    //   Alert.alert('Sign Up', response.msg);
    // } else {
    //   router.push('/Welcome');
    // }
    if (!response.success) {
      setAlertTitle('Sign Up');
      setAlertMessage(response.msg);
      setAlertVisible(true);
    } else {
      router.push('/Welcome');
    }
  }
  return (
   <SafeAreaView className='bg-primary h-full'>
   <ScrollView>
    <View className='w-full h-full my-6 flex-1 justify-center px-4'>
    {/* <Image  source={images.logo}
      className='w-[180px] h-[80px]'
      resizeMode='contain'
    /> */}

      <Text className='text-white text-3xl font-psemibold mt-10'>Sign Up to LawLens</Text>
      <FormField 
        title='User Name'
        // value={form.email}
        handleChangeText={(text)=> userNameRef.current= text}
        otherStyles="mt-7"
        keyboardType='default'

      />
      <FormField 
        title='Email'
        // value={form.email}
        handleChangeText={(text)=> emailRef.current = text}
        otherStyles="mt-5"
        keyboardType='email-address'

      />
      <FormField 
        title='Password'
        // value={form.password}
        handleChangeText={(text)=> passwordRef.current= text}
        otherStyles="mt-5"
        keyboardType='default'
        secureTextEntry={true}
        />

        <CustomButton
        title="Sign up"
        handlePress={handleRegister}
        containerStyle="mt-7"
        isLoading={isSubmitting}
         />

    </View>


    <View className='flex-row align-center mt-4 px-5'>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
      <Text className='text-white mx-4 -top-3 font-semibold text-sm'>or continue with</Text>
      <View className='flex-1 h-[1px] bg-gray-500 '></View>
    </View>
    <View className='flex justify-center items-center px-5 my-3' >
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
<Text className='text-gray-100 mt-5 text-center text-sm font-pregular '>Already have an account?{' '}
  
  <Text 
  onPress={()=> router.push('/SignIn')} 
  className='text-secondary font-psemibold'
  activeOpacity={0.7}
  >
  Sign In
 </Text>
 
 </Text>
</View>

    </ScrollView>
    <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        otherStyles={'bg-red-600'}
      />
   </SafeAreaView>
  )
}

export default SignUp