
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { View, Text, ScrollView, Image  } from "react-native";
import {images} from '../constants';
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className=" justify-start items-center h-full w-full px-4 mt-10 min-h-[85vh]">
<Image source={images.logo}
    className='w-[210px] h-[100px]'
    resizeMode="contain"
/>
<Image source={images.cards}
    className='max-w-[400px] w-full h-[320px]'
    resizeMode="contain"
/>
<View className="relative mt-5">
<Text className="text-3xl text-white font-bold text-center">Discover New Legal Insights with{' '}
<Text className='text-secondary'>
 LawLens
</Text></Text>
<Image source={images.path}
    className='w-[220px] h-[60px] absolute -bottom-12 -right-14'
    resizeMode="contain"

/>

</View>
<Text className='text-gray-100 mt-9 text-center text-sm font-pregular '>Where you find legal clarity, day or night,
Expert guidance at your fingertips, always in sight.</Text>
<CustomButton
title='Get Started'
handlePress={()=> router.push('/LetIn')}
containerStyle="w-full mt-8"
 />
      </View>
  
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default index;
