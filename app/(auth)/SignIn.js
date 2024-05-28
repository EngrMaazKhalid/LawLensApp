import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { images } from '../../constants'
import FormField from '../../components/FormField'
import Loading from '../../components/Loading'
import CustomButton from '../../components/CustomButton'
import { router, useRouter } from 'expo-router'
import { useRef } from 'react'
import { useAuth } from '../../context/authContext';
import CustomAlert from '../../components/CustomAlert'


const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      setAlertTitle('Sign in');
      setAlertMessage('Please fill in all fields');
      setAlertVisible(true);
      return;
    }

    setIsSubmitting(true);
    let response = await login(emailRef.current, passwordRef.current);
    setIsSubmitting(false);


    if (!response.success) {
      setAlertTitle('Sign in');
      setAlertMessage(response.msg);
      setAlertVisible(true);
    } else {
      router.push('/Welcome');
    }
  
  };

  return (

  <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full my-6 flex-1 justify-center px-4'>
          <Text className='text-white text-3xl font-psemibold mt-10'>Login to LawLens</Text>
          <FormField 
            title='Email'
            handleChangeText={(text) => emailRef.current = text}
            otherStyles="mt-7"
            keyboardType='email-address'
          />
          <FormField 
            title='Password'
            handleChangeText={(text) => passwordRef.current = text}
            otherStyles="mt-7"
            keyboardType='default'
            secureTextEntry={true}
          />
          <CustomButton
            title="Sign in"
            handlePress={handleLogin}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
          <Text
            className='text-secondary mt-5 text-center text-sm font-psemibold'
            onPress={() => router.push('/SignUp')}
          >
            Forgot your password?
          </Text>
        </View>

        <View className='flex-row align-center mt-10 px-5'>
          <View className='flex-1 h-[1px] bg-gray-500 '></View>
          <Text className='text-white mx-4 -top-3 font-semibold text-sm'>or continue with</Text>
          <View className='flex-1 h-[1px] bg-gray-500 '></View>
        </View>
        <View className='flex justify-center items-center px-5 my-5'>
          <View className='flex-row'>
            <TouchableOpacity 
              className='min-w-[100px] bg-gray-200 rounded-3xl min-h-[62px] justify-center items-center border-gray-500 border p-5' 
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Image 
                source={images.facebook}
                resizeMethod='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <TouchableOpacity 
              className='min-w-[100px] bg-gray-200 rounded-3xl min-h-[62px] justify-center items-center border-gray-500 border p-5 ml-5'
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Image 
                source={images.google}
                resizeMethod='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>
          </View>
          <Text className='text-gray-100 mt-8 text-center text-sm font-pregular'>
            Don't have an account?{' '}
            <Text 
              onPress={() => router.push('/SignUp')} 
              className='text-secondary font-psemibold'
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        otherStyles={'bg-red-600'}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SignIn;
