import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar'
import { Zocial } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function SignIn() {
  return (
    <View style={[styles.container, {flex:1}]}>
    <StatusBar style='dark' />
    <View style={[styles.inside, {paddingTop: hp(8),
        paddingHorizontal: wp(5)}]}>
    <View style={styles.insideView}>
    <Image resizeMode='contain' style={{height: hp(25)}} source={require('../assets/images/login.png')}></Image>
</View>
    </View>
    <View style={{gap:'10'}} >
      <Text style={styles.content} >SignIn</Text>
      <View style={styles.inputView}>
    {/* <Text className='rounded-2xl tracking-wider gap-4 flex-1' /> */}
    <Zocial name="email" size={hp(2.7)} color="#9E9E9E" />
        <TextInput
        style={styles.TextInput}
        placeholder='Enter Your Email'
        placeholderTextColor={'#9E9E9E'}
         />
      </View>
      <View style={styles.inputView}>
    {/* <Text className='rounded-2xl tracking-wider gap-4 flex-1' /> */}
    <Entypo name="lock" size={hp(2.7)} color="#9E9E9E" />
        <TextInput
        style={styles.TextInput}
        placeholder='Password'
        placeholderTextColor={'#9E9E9E'}
         />
      </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        // flex:'1 0 0',
            backgroundColor:'#181A20',
          
    },
    inside:{
        display:'flex',
        // flex:'1 0 0',
        gap:'12'
      
    },
    insideView:{
        display:'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    content:{
        fontWeight:700,
        color:'#fff',
        textAlign:'center',
        fontSize: hp(8),
      
        // letterSpacing: '0.05em'
    },
    inputView:{
        display:'flex',
        // flex: '1 0 0',
        flexDirection:'row',
        gap: '1rem',
        alignItems:'center',
        height: hp(7),
        borderRadius:'1rem',
        marginTop: hp(5),
        backgroundColor:'#1F222A',
        paddingHorizontal:'1rem'
    },
    TextInput:{
        fontSize: hp(2.2),
        fontWeight:'700',
        // flex:' 1 1 0',
        color:'#fff',
        // letterSpacing:'.2px',
        width:'100%',
    
    },

}
)