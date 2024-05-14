import { View, Text, SafeAreaView, ScrollView,  TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { images } from '../../constants'
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
      //sk-proj-2TFO1dbTHiYGafVL0vuOT3BlbkFJGLhponFp2ZPfLAAQwSzx
                //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
                //sk-proj-HGhsvDZm1562aG8rHzmcT3BlbkFJHfbuqs6wt5s7FQOuXLta
const Chat = () => {
    const handleInputMessage = (text) => {
        setInputMessage(text)
    }

    const [inputMessage, setInputMessage] = useState('')
    const [outputMessage, setOutputMessage] = useState('Sabar kar jawab de')
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState([])

  

    // const renderMessage = (props) => {
    //     const {currentMessage} = props

    //     if(currentMessage.user._id ===1){
    //         return (
    //             <View className='flex-1 flex-row justify-end'>
    //              <Image source={images.ham}
    //                 className='w-8 h-8 rounded-sm'
    //                 resizeMode='contain'
                
    //              />
    //                 <Bubble {...props} 
    //                     wrapperStyle={{
    //                         right: {
    //                         backgroundColor: '#00CDBD',
    //                         marginRight: 10,
    //                         marginVertical: 10,
    //                         },
    //                     }}

    //                     textStyle={{
    //                         right: {
    //                             color: 'white',
    //                             fontFamily: 'Poppins-Medium'
    //                         },
    //                     }}
    //                 />
    //             </View>
    //         )
    //     }
    //     else {
    //         return (
    //             <View className='flex-1 flex-row justify-start'>
               
    //                 <Bubble {...props} 
    //                     wrapperStyle={{
    //                         left: {
    //                         backgroundColor: 'red',
    //                         marginLeft: 10,
                           
    //                         },
    //                     }}

    //                     textStyle={{
    //                         left: {
    //                             color: 'black',
    //                             fontFamily: 'Poppins-Medium'
    //                         },
    //                     }}
    //                 />
    //             </View>
    //         )
    //     }

    //     return 
    //         <Bubble {...props} />
        

    // }

    const renderMessage = (props) => {
        const { currentMessage } = props

        if (currentMessage.user._id === 1) {
            return (
                
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                  <Image
                        source={images.ham}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            marginLeft: 8,
                        }}
                    />
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: '#00CDBD',
                                marginRight: 12,
                                marginVertical: 12,
                            },
                        }}
                        textStyle={{
                            right: {
                                color: 'white',
                                fontFamily: 'Poppins-Medium'
                            },
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                  
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: '#00CDBD',
                                marginLeft: 12,
                            },
                        }}
                        textStyle={{
                            left: {
                                color: 'black',
                                fontFamily: 'Poppins-Medium'
                            },
                        }}
                    />
                </View>
            )
        }

        return <Bubble {...props} />
    }
    // const generateText = () => {
    //     setIsTyping(true)
    //     const message = {
    //         _id: Math.random().toString(36).substring(7),
    //         text: inputMessage,
    //         createdAt: new Date(),
    //         user: {
    //             _id: 1,
                
    //         }
    //     }
    //     setMessages(previousMessages =>
    //          GiftedChat.append(previousMessages, [message]))


    //          fetch('https://api.openai.com/v1/chat/completions', {
    //              method: 'POST',
    //              headers: {
    //                  'Content-Type': 'application/json',
    //                  'Authorization':  'Bearer sk-proj-2TFO1dbTHiYGafVL0vuOT3BlbkFJGLhponFp2ZPfLAAQwSzx'             },
    //             body: JSON.stringify({
    //                 model: 'gpt-3.5-turbo',
    //                 messages: [
    //                     {
    //                         role: 'user',
    //                         content: inputMessage
    //                     }                     
    //                 ]
    //             })
          
    //             }).then(response => response.json())
    //             .then(data => {
    //                 console.log(data.choices[0].message.content)
    //                 setInputMessage('')
    //                 setOutputMessage(data.choices[0].message.content.trim())

    //                 const message = {
    //                     _id: Math.random().toString(36).substring(7),
    //                     text: data.choices[0].message.content.trim(),
    //                     createdAt: new Date(),
    //                     user: {
    //                         _id: 2,
    //                         name: "ChatGpt"
    //                     }
    //                 }
    //                 setIsTyping(false)
    //                 setMessages(previousMessage =>
    //                     GiftedChat.append(previousMessage, [message]))

    //             })
    // }


    // const generateText = () => {
    //     setIsTyping(true);
    //     const message = {
    //         _id: Math.random().toString(36).substring(7),
    //         text: inputMessage,
    //         createdAt: new Date(),
    //         user: {
    //             _id: 1,
    //         }
    //     };
    //     setMessages(previousMessages =>
    //         GiftedChat.append(previousMessages, [message])
    //     );
    
    //     fetch('https://api.openai.com/v1/chat/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer sk-proj-2TFO1dbTHiYGafVL0vuOT3BlbkFJGLhponFp2ZPfLAAQwSzx'
    //         },
    //         body: JSON.stringify({
    //             model: 'gpt-3.5-turbo',
    //             messages: [
    //                 {
    //                     role: 'user',
    //                     content: inputMessage
    //                 }
    //             ]
    //         })
    
    //     }).then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     }).then(data => {
    //         console.log(data.choices[0].message.content);
    //         setInputMessage('');
    //         setOutputMessage(data.choices[0].message.content.trim());
    
    //         const message = {
    //             _id: Math.random().toString(36).substring(7),
    //             text: data.choices[0].message.content.trim(),
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: "ChatGpt"
    //             }
    //         };
    //         setIsTyping(false);
    //         setMessages(previousMessage =>
    //             GiftedChat.append(previousMessage, [message])
    //         );
    //     }).catch(error => {
    //         console.error('Error fetching data:', error);
    //         // Handle or log the error as needed
    //     });
    // };
    
    const generateText = () => {
        setIsTyping(true)
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createdAt: new Date(),
            user: {
                _id: 1,
            }
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [message]))
    
        fetch('https://ai-hubsweedengptfinetune505298337655.openai.azure.com/openai/deployments/gpt-4-sweden/chat/completions?api-version=2023-03-15-preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 753d1b58c200470d9ba1fd988122a385'
            },
            body: JSON.stringify({
                // model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: inputMessage
                    }
                ]
            })
    
        }).then(response => response.json())
            .then(data => {
                if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
                    console.log(data.choices[0].message.content)
                    setInputMessage('')
                    setOutputMessage(data.choices[0].message.content.trim())
    
                    const message = {
                        _id: Math.random().toString(36).substring(7),
                        text: data.choices[0].message.content.trim(),
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: "ChatGpt"
                        }
                    }
                    setIsTyping(false)
                    setMessages(previousMessage =>
                        GiftedChat.append(previousMessage, [message]))
                } else {
                    console.error('Unexpected response format  :', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data from:', error);
            });
    }
    
   //sk-proj-f5DZKNhGIonrspI6NaZCT3BlbkFJtXmkVqokGrVYPZX9XZdm
    //https://api.openai.com/v1/chat/completions

 


  return (
    <SafeAreaView className="bg-primary h-full">
    <StatusBar style="auto" backgroundColor="#161622" />
    <View className='h-[100px] bg-gray-200 w-full px-3 flex-row  align-center justify-between'>

    <TouchableOpacity className='h-14 w-14 align-center justify-center absolute bottom-1 left-5'
     onPress={()=> router.back()}
     activeOpacity={0.7}
     >
    <AntDesign name="left" size={30} color={'#CDCDE0'}  />
    </TouchableOpacity>

    <Image source={images.logoLaw} className='w-12 h-12 align-center justify-center flex-1 top-11' resizeMode='contain' />
    <TouchableOpacity 
    className='h-14 w-14 align-center justify-center absolute right-0 bottom-1' 
    onPress={()=> router.back()}
    activeOpacity={0.7}>
    <MaterialCommunityIcons name="bookmark-outline" size={30} color={'#CDCDE0'} />
    </TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={{ height: "100%" }}>

    <View className="flex-1 justify-center px-4">
    <GiftedChat 
        className='font-pmedium'
        messages={messages}
        renderInputToolbar={() => {}}
        user={{ _id: 1 }}
        minInputToolbarHeight={0}
        renderMessage={renderMessage}
        isTyping={isTyping}
    />
</View>

    <View className="flex-row py-8 align-center justify-center">
    <View className='border-2 border-black-200 flex-1 h-16 px-4 ml-3 mr-3 bg-gray-200 
       items-center rounded-2xl focus:border-secondary flex-row focus:bg-secondary-300'>
        <TextInput
        value={inputMessage}
        onChangeText={handleInputMessage}
        className='flex-1 text-white text-sm font-pmedium'
        placeholder='Type a message To LawLens...'
        placeholderTextColor={'#7b7b8b'}
         />
         </View>
         <TouchableOpacity 
         className='h-16 w-16 rounded-full bg-secondary flex items-center justify-center mr-3'
         onPress={generateText}
         >
         <FontAwesome name="send" size={25} color="white" />
         </TouchableOpacity>

    </View>


    </ScrollView>
    </SafeAreaView>
  )
}

export default Chat