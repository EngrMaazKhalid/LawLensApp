import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Button } from 'react-native';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants'; // Adjust the import according to your project structure
import { router } from 'expo-router'; // Adjust the import according to your project structure
import { useAuth } from '../../context/authContext';


const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Track if it's the first message
  const { user, logout, getChats, deleteChat, saveChat } = useAuth();
  const initialPrompt = "Act as an AI lawyer. Your name is LawLens. You are a lawyer specifically trained on Pakistani constitution. You will provide answers to issues of people according to Pakistan's Law. The query asked to you will be of two types. First is a general query in which some information is asked about some constitution, article or any general information. In general query you will just answer the user generally with sufficient details and materials for reference. Second query is of specific guidance related to law. It can be of any type of question like: I was caught without a warrant. What should I do? Or I want to marry a non-Muslim girl. What does the Pakistan's Law say about it? In case of specific query, you will provide a properly formatted answer. I am attaching two examples for you regarding the format. Starting with the user prompt and then the response kt LawLens. The structure you will be following is of LawLens reply. Here we have 4 headings, first is issue summary that briefly covers issue, second is legal advice, third is expected judgement, and fourth is Reference section. Note: the format of answer is really important, carefully analyze the LawLens reply in the attached examples and your future answers should be exactly in the same format and proper references should be there just like in the example.";

  const handleInputMessage = (text) => {
    setInputMessage(text);
  };


  const renderTime = (props) => {
    const { currentMessage } = props;
    return (
      <Time
   
        
        {...props}
        timeTextStyle={{
          right: {
            color: currentMessage.user._id === 1 ? 'black' : 'black', // Change color based on user ID
            fontFamily: 'Poppins-Medium'
          },
          left: {
            color: currentMessage.user._id === 1 ? 'black' : 'black', // Change color based on user ID
            fontFamily: 'Poppins-Medium'
          }
        }}
      />
    );
  };



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
                 
                <Bubble
                    {...props}
                
                    wrapperStyle={{
                        right: {
                            backgroundColor: '#CDCDE0',
                            marginRight: 12,
                            marginVertical: 12,
                        },
                    }}
                    textStyle={{
                        right: {
                            color: 'black',
                            fontFamily: 'Poppins-Medium'
                        },
                    }}
                   
                />
                 <Image
                  source={{ uri: user?.photoURL }}
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 50,
                        marginTop: 10,
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
               <Image
                    source={images.ham}
                    style={{
                        height: 25,
                        width: 25,
                        borderRadius: 0,
                        marginTop: 10,
                    }}
                />
                <Bubble 
                    {...props}
                 
                    wrapperStyle={{
                        left: {
                            backgroundColor: '#00CDBD',
                            marginLeft: 5,
                            marginTop: 10,
                            color: 'black',
                        },
                      
                    }}
                    textStyle={{
                        left: {
                            color: 'black',
                            fontFamily: 'Poppins-Medium',
                        },
                        
                       
                    }}
                />
            </View>
        )
    }

    return <Bubble {...props} />
}


const generateText = async () => {
  if (inputMessage.trim() === '') return;

  const newMessage = {
    _id: messages.length + 1,
    text: inputMessage,
    createdAt: new Date(),
    user: { _id: 1
    
    },
  };

  setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
  setInputMessage('');
  setIsTyping(true);

  const url = "https://wrkspc-westeurope-mlstudi-nvnku.westeurope.inference.ml.azure.com/score";
  const requestBody = {
    // input_data: [inputMessage],
    // params: { some_param_key: "some_param_value" } // Adjust params if needed
    input_data: {
      initialPrompt,
      input_string: [inputMessage],
      parameters: {
        top_p: 0.9,
        temperature: 0.6,
        max_new_tokens: 600,
        do_sample: true
      },
      
    }

  };

  const requestHeaders = new Headers({
    "Content-Type": "application/json",
    "Authorization": "Bearer gzBYmdrdbVquVrhh6PhaadR3L24Qtwjd",
    "azureml-model-deployment": "finetuned-llaama2-7b-lawlens-1"
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: requestHeaders
    });

    const result = await response.json();

    // Log the parsed JSON result for debugging
    console.log("Parsed JSON result:", result);

    // if (result && result[0]) {
    //   const botMessageText = result[0]['0']; // Accessing the generated text
    //   console.log("Bot message text:", botMessageText); // Log the full text

    // if (Array.isArray(result) && result.length > 0 && result[0]["0"]) {
    //   const botMessageText = result[0]["0"]; // Accessing the generated text
    //   console.log("Bot message text:", botMessageText); // Log the full text
  


    //   const botMessage = {
    //     _id: messages.length + 2,
    //     text: botMessageText, // Ensure this is a string
    //     createdAt: new Date(),
    //     user: { _id: 2, name: 'LawLens' },
    //   };

    //   setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
    //   console.log(result)
    // } 
    if (Array.isArray(result) && result.length > 0 && result[0]["0"]) {
      const botMessageText = result[0]["0"]; // Accessing the generated text
      
      // Split the botMessageText based on "Issue Summary"
      const splitText = botMessageText.split("Issue");

      // Check if "Issue Summary" exists and the split text has two parts
      if (splitText.length === 2) {
        // The second part of the split text will contain the content after "Issue Summary"
        const modelAnswer = splitText[1].trim();

        // Create the bot message using the extracted model answer
        const botMessage = {
          _id: messages.length + 2,
          text: modelAnswer, // Use the extracted model answer
          createdAt: new Date(),
          user: { _id: 2, name: 'LawLens' },
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
        console.log(result);
      } else {
        console.error("Invalid response structure:", result);
      }
    }
    else {
      console.error("Invalid response structure:", result);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsTyping(false);
    setIsFirstMessage(false);
    saveChat({ _id: Date.now(), messages });
  }
};


  const handleBookmark = async () => {
    try {
      await saveChat(messages);
      console.log('Chat saved successfully');
    } catch (e) {
      console.error('Error saving chat:', e.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
           <StatusBar style="auto" backgroundColor="#161622" />
           <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
             {/* <TouchableOpacity className='h-14 w-14 align-center justify-center absolute bottom-1 left-5'
               onPress={() => router.back()} activeOpacity={0.7}>
               <AntDesign name="left" size={30} color={'#CDCDE0'} />
             </TouchableOpacity> */}
             <TouchableOpacity className='h-14 w-14  flex align-center justify-center absolute bottom-1 left-5'
               onPress={()=> router.push('/Welcome')} activeOpacity={0.7}>
               <AntDesign name="left" size={30} color={'#CDCDE0'} />
             </TouchableOpacity>
             <Image source={images.logoLaw} className='w-12 h-12 align-center justify-center flex-1 top-11' resizeMode='contain' />
             <TouchableOpacity className='h-14 w-14 align-center justify-center absolute right-0 bottom-1'
               onPress={handleBookmark} activeOpacity={0.7}>
               <MaterialCommunityIcons name="bookmark-outline" size={30} color={'#CDCDE0'} />
             </TouchableOpacity>
           </View>
         <ScrollView contentContainerStyle={{ height: "100%" }}>
             <View className="flex-1 justify-center px-4">
               <GiftedChat
                 className='font-pmedium'
                 renderInputToolbar={() => { }}
                 minInputToolbarHeight={0}
                 messages={messages}
                 onSend={(messages) => setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))}
                 user={{ _id: 1 }}
                //  renderBubble={renderMessage}
                 renderMessage={renderMessage}
                 renderTime={renderTime}
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
                onPress={generateText}>
                <FontAwesome name="send" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
  );
};

export default Chat;