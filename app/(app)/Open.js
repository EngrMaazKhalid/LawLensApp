// import React, { useEffect, useState } from 'react';
// import { View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Button, Platform } from 'react-native';
// import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
// import { FontAwesome } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import { images } from '../../constants'; // Adjust the import according to your project structure
// import { router } from 'expo-router'; // Adjust the import according to your project structure
// import { useAuth } from '../../context/authContext';

// const Open = () => {
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isFirstMessage, setIsFirstMessage] = useState(true); // Track if it's the first message
//   const { user, logout, getChats, deleteChat, saveChat } = useAuth();

//   const initialPrompt = "Act as an AI lawyer. Your name is LawLens. You are a lawyer specifically trained on Pakistani constitution. You will provide answers to issues of people according to Pakistan's Law. The query asked to you will be of two types. First is a general query in which some information is asked about some constitution, article or any general information. In general query you will just answer the user generally with sufficient details and materials for reference. Second query is of specific guidance related to law. It can be of any type of question like: I was caught without a warrant. What should I do? Or I want to marry a non-Muslim girl. What does the Pakistan's Law say about it? In case of specific query, you will provide a properly formatted answer. I am attaching two examples for you regarding the format. Starting with the user prompt and then the response kt LawLens. The structure you will be following is of LawLens reply. Here we have 4 headings, first is issue summary that briefly covers issue, second is legal advice, third is expected judgement, and fourth is Reference section. Note: the format of answer is really important, carefully analyze the LawLens reply in the attached examples and your future answers should be exactly in the same format and proper references should be there just like in the example.";

//   const handleInputMessage = (text) => {
//     setInputMessage(text);
//   };

//   const renderTime = (props) => {
//     const { currentMessage } = props;
//     return (
//       <Time
//         {...props}
//         timeTextStyle={{
//           right: {
//             color: currentMessage.user._id === 1 ? 'black' : 'black', // Change color based on user ID
//             fontFamily: 'Poppins-Medium'
//           },
//           left: {
//             color: currentMessage.user._id === 1 ? 'black' : 'black', // Change color based on user ID
//             fontFamily: 'Poppins-Medium'
//           }
//         }}
//       />
//     );
//   };

//   const renderMessage = (props) => {
//     const { currentMessage } = props;

//     if (currentMessage.user._id === 1) {
//       return (
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//           }}
//         >
//           <Bubble
//             {...props}
//             wrapperStyle={{
//               right: {
//                 backgroundColor: '#CDCDE0',
//                 marginRight: 12,
//                 marginVertical: 12,
//               },
//             }}
//             textStyle={{
//               right: {
//                 color: 'black',
//                 fontFamily: 'Poppins-Medium'
//               },
//             }}
//           />
//           <Image
//             source={{ uri: user?.photoURL }}
//             style={{
//               height: 30,
//               width: 30,
//               borderRadius: 50,
//               marginTop: 10,
//             }}
//           />
//         </View>
//       )
//     } else {
//       return (
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'flex-start',
//           }}
//         >
//           <Image
//             source={images.ham}
//             style={{
//               height: 25,
//               width: 25,
//               borderRadius: 0,
//               marginTop: 10,
//             }}
//           />
//           <Bubble
//             {...props}
//             wrapperStyle={{
//               left: {
//                 backgroundColor: '#00CDBD',
//                 marginLeft: 5,
//                 marginTop: 10,
//                 color: 'black',
//               },
//             }}
//             textStyle={{
//               left: {
//                 color: 'black',
//                 fontFamily: 'Poppins-Medium',
//               },
//             }}
//           />
//         </View>
//       )
//     }

//     return <Bubble {...props} />
//   }

//   const generateText = async () => {
//     if (inputMessage.trim() === '') return;

//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputMessage,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
//     setInputMessage('');
//     setIsTyping(true);

//     const url = "https://westeurope-azureopenai-instance.openai.azure.com/openai/deployments/gpt3-azureopenai/extensions/chat/completions?api-version=2024-02-15-preview";
//     const requestBody = {
//       messages: [
//         { role: 'system', content: initialPrompt },
//         { role: 'user', content: inputMessage }
//       ],
//       deployment_id: "gpt3-azureopenai",
//       data_sources: [
//         {
//           type: "azure_search",
//           parameters: {
//             endpoint: "https://aisearch-fypp408468331618.search.windows.net",
//             index_name: "indexlawlens",
//             semantic_configuration: "default",
//             query_type: "semantic",
//             fields_mapping: {},
//             in_scope: true,
//             role_information: "You are an AI assistant that helps people find information.",
//             filter: null,
//             strictness: 3,
//             top_n_documents: 5,
//             authentication: {
//               type: "api_key",
//               key: "KLRuXvCpHLmweFad7yXwziDKdRrYCCmRxfQT77XNulAzSeBNpq7C"
//             }
//           }
//         }
//       ],
//       temperature: 0,
//       top_p: 1,
//       max_tokens: 800,
//       stream: false
//     };

//     const requestHeaders = {
//       "Content-Type": "application/json",
//       "api-key":  "02d7e52b4ab14caeba857d96a67f162b"
//     };

//     try {
//       console.log("Request URL:", url);
//       console.log("Request Headers:", requestHeaders);
//       console.log("Request Body:", requestBody);

//       const response = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(requestBody),
//         headers: requestHeaders
//       });

//       if (!response.ok) {
//         console.error("Network response was not ok:", response.statusText);
//         return;
//       }

//       const result = await response.json();
//       console.log("Parsed JSON result:", result);

//       if (result && result.choices && result.choices.length > 0) {
//         const botMessageText = result.choices[0].message.content; // Accessing the generated text
//         console.log("Bot message text:", botMessageText);

//         const botMessage = {
//           _id: messages.length + 2,
//           text: botMessageText,
//           createdAt: new Date(),
//           user: { _id: 2, name: 'LawLens' },
//         };

//         setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
//       } else {
//         console.error("Invalid response structure:", result);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsTyping(false);
//       setIsFirstMessage(false);
//       saveChat({ _id: Date.now(), messages });
//     }
//   };

//   const handleBookmark = async () => {
//     try {
//       await saveChat(messages);
//       console.log('Chat saved successfully');
//     } catch (e) {
//       console.error('Error saving chat:', e.message);
//     }
//   };

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <StatusBar style="auto" backgroundColor="#161622" />
//       <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
//         <TouchableOpacity className='h-14 w-14 align-center justify-center absolute bottom-1 left-5'
//           onPress={() => router.back()} activeOpacity={0.7}>
//           <AntDesign name="left" size={30} color={'#CDCDE0'} />
//         </TouchableOpacity>

//         <Image source={images.logoLaw} className='w-12 h-12 align-center justify-center flex-1 top-11' resizeMode='contain' />
//         <TouchableOpacity className='h-14 w-14 align-center justify-center absolute right-0 bottom-1'
//           onPress={handleBookmark} activeOpacity={0.7}>
//           <MaterialCommunityIcons name="bookmark-outline" size={30} color={'#CDCDE0'} />
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className="flex-1 justify-center px-4">
//           <GiftedChat
//             className='font-pmedium'
//             renderInputToolbar={() => { }}
//             minInputToolbarHeight={0}
//             messages={messages}
//             onSend={(messages) => setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))}
//             user={{ _id: 1 }}
//             renderMessage={renderMessage}
//             renderTime={renderTime}
//             isTyping={isTyping}
//           />
//         </View>
//         <View className="flex-row py-8 align-center justify-center">
//           <View className='border-2 border-black-200 flex-1 h-16 px-4 ml-3 mr-3 bg-gray-200 
//             items-center rounded-2xl focus:border-secondary flex-row focus:bg-secondary-300'>
//             <TextInput
//               value={inputMessage}
//               onChangeText={handleInputMessage}
//               className='flex-1 text-white text-sm font-pmedium'
//               placeholder='Type a message To LawLens...'
//               placeholderTextColor={'#7b7b8b'}
//             />
//           </View>
//           <TouchableOpacity
//             className='h-16 w-16 rounded-full bg-secondary flex items-center justify-center mr-3'
//             onPress={generateText}>
//             <FontAwesome name="send" size={25} color="white" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // export default Open;
// import React, { useEffect, useState } from 'react';
// import { View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
// import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
// import { FontAwesome } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import { images } from '../../constants';
// import { router } from 'expo-router';
// import { useAuth } from '../../context/authContext';
// import { ENV } from 'react-native-config';
// import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
// // import ENV from '../../env'; // Adjust the import according to your project structure

// const Open = () => {
//   const [inputMessage, setInputMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Added loading state
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isFirstMessage, setIsFirstMessage] = useState(true);
//   const { user, logout, getChats, deleteChat, saveChat } = useAuth();

//   const initialPrompt = "Act as an AI lawyer. Your name is LawLens. You are a lawyer specifically trained on Pakistani constitution. You will provide answers to issues of people according to Pakistan's Law. The query asked to you will be of two types. First is a general query in which some information is asked about some constitution, article or any general information. In general query you will just answer the user generally with sufficient details and materials for reference. Second query is of specific guidance related to law. It can be of any type of question like: I was caught without a warrant. What should I do? Or I want to marry a non-Muslim girl. What does the Pakistan's Law say about it? In case of specific query, you will provide a properly formatted answer. I am attaching two examples for you regarding the format. Starting with the user prompt and then the response kt LawLens. The structure you will be following is of LawLens reply. Here we have 4 headings, first is issue summary that briefly covers issue, second is legal advice, third is expected judgement, and fourth is Reference section. Note: the format of answer is really important, carefully analyze the LawLens reply in the attached examples and your future answers should be exactly in the same format and proper references should be there just like in the example."
  
//   const handleInputMessage = (text) => {
//     setInputMessage(text);
//   };

//   const renderTime = (props) => {
//     const { currentMessage } = props;
//     return (
//       <Time
//         {...props}
//         timeTextStyle={{
//           right: {
//             color: 'black',
//             fontFamily: 'Poppins-Medium'
//           },
//           left: {
//             color: 'black',
//             fontFamily: 'Poppins-Medium'
//           }
//         }}
//       />
//     );
//   };

//   const renderMessage = (props) => {
//     const { currentMessage } = props;

//     if (currentMessage.user._id === 1) {
//       return (
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
//           <Bubble
//             {...props}
//             wrapperStyle={{ right: { backgroundColor: '#CDCDE0', marginRight: 12, marginVertical: 12 } }}
//             textStyle={{ right: { color: 'black', fontFamily: 'Poppins-Medium' } }}
//           />
//           <Image
//             source={{ uri: user?.photoURL }}
//             style={{ height: 30, width: 30, borderRadius: 50, marginTop: 10 }}
//           />
//         </View>
//       );
//     } else {
//       return (
//         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
//           <Image
//             source={images.ham}
//             style={{ height: 25, width: 25, borderRadius: 0, marginTop: 10 }}
//           />
//           <Bubble
//             {...props}
//             wrapperStyle={{ left: { backgroundColor: '#00CDBD', marginLeft: 5, marginTop: 10, color: 'black' } }}
//             textStyle={{ left: { color: 'black', fontFamily: 'Poppins-Medium' } }}
//           />
//         </View>
//       );
//     }

//     return <Bubble {...props} />;
//   };

//   const getChatResponse = async (currentMessages) => {
//     const client = new OpenAIClient(
//         'https://westeurope-azureopenai-instance.openai.azure.com/',
//       new AzureKeyCredential('02d7e52b4ab14caeba857d96a67f162b')
//     );
//     setLoading(true);
//     const completions = await client.getChatCompletions(
//       "gpt-4",
//       [
//         {
//           role: "system",
//           content: initialPrompt,
//         },
//         ...currentMessages.map((message) => ({
//           role: message.user._id === 1 ? "user" : "assistant",
//           content: message.text,
//         })).reverse(),
//       ],
//       {
//         azureExtensionOptions: {
//           extensions: [
//             {
//               type: "azure_search",
//               endpoint:  'https://aisearch-fypp408468331618.search.windows.net',
//               indexName: 'KLRuXvCpHLmweFad7yXwziDKdRrYCCmRxfQT77XNulAzSeBNpq7C',
//               authentication: {
//                 type: "api_key",
//                 key: '02d7e52b4ab14caeba857d96a67f162b',
//               },
//               queryType: "vector_simple_hybrid",
//               inScope: true,
//               roleInformation: initialPrompt,
//               strictness: 3,
//               topNDocuments: 5,
//               embeddingDependency: {
//                 type: "deployment_name",
//                 deploymentName: "text-embedding-ada-002"
//               }
//             },
//           ],
//         },
//       }
//     );
//     const response = {
//       _id: new Date().getTime(),
//       text: completions.choices[0].message.content,
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: "LawLens",
//       },
//     };
//     return [response];
//   };

//   const generateText = async () => {
//     if (inputMessage.trim() === '') return;

//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputMessage,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
//     setInputMessage('');
//     setIsTyping(true);

//     try {
//       const botMessages = await getChatResponse([...messages, newMessage]);
//       setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessages));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsTyping(false);
//       setIsFirstMessage(false);
//       saveChat({ _id: Date.now(), messages });
//     }
//   };

//   const handleBookmark = async () => {
//     try {
//       await saveChat(messages);
//       console.log('Chat saved successfully');
//     } catch (e) {
//       console.error('Error saving chat:', e.message);
//     }
//   };

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <StatusBar style="auto" backgroundColor="#161622" />
//       <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
//         <TouchableOpacity className='h-14 w-14 align-center justify-center absolute bottom-1 left-5' onPress={() => router.back()} activeOpacity={0.7}>
//           <AntDesign name="left" size={30} color={'#CDCDE0'} />
//         </TouchableOpacity>
//         <Image source={images.logoLaw} className='w-12 h-12 align-center justify-center flex-1 top-11' resizeMode='contain' />
//         <TouchableOpacity className='h-14 w-14 align-center justify-center absolute right-0 bottom-1' onPress={handleBookmark} activeOpacity={0.7}>
//           <MaterialCommunityIcons name="bookmark-outline" size={30} color={'#CDCDE0'} />
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className="flex-1 justify-center px-4">
//           <GiftedChat
//             className='font-pmedium'
//             renderInputToolbar={() => { }}
//             minInputToolbarHeight={0}
//             messages={messages}
//             onSend={(messages) => setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))}
//             user={{ _id: 1 }}
//             renderMessage={renderMessage}
//             renderTime={renderTime}
//             isTyping={isTyping}
//           />
//         </View>
//         <View className="flex-row py-8 align-center justify-center">
//           <View className='border-2 border-black-200 flex-1 h-16 px-4 ml-3 mr-3 bg-gray-200 items-center rounded-2xl focus:border-secondary flex-row focus:bg-secondary-300'>
//             <TextInput
//               value={inputMessage}
//               onChangeText={handleInputMessage}
//               className='flex-1 text-white text-sm font-pmedium'
//               placeholder='Type a message To LawLens...'
//               placeholderTextColor={'#7b7b8b'}
//             />
//           </View>
//           <TouchableOpacity className='h-16 w-16 rounded-full bg-secondary flex items-center justify-center mr-3' onPress={generateText}>
//             <FontAwesome name="send" size={25} color="white" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Open;
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { images } from '../../constants'; // Adjust the import according to your project structure
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { router } from 'expo-router';

const Open = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { user, getChats, saveChat } = useAuth();
  const initialPrompt = "Act as an AI lawyer. Your name is LawLens. You are a lawyer specifically trained on Pakistani constitution. You will provide answers to issues of people according to Pakistan's Law. The query asked to you will be of two types. First is a general query in which some information is asked about some constitution, article or any general information. In general query you will just answer the user generally with sufficient details and materials for reference. Second query is of specific guidance related to law. It can be of any type of question like: I was caught without a warrant. What should I do? Or I want to marry a non-Muslim girl. What does the Pakistan's Law say about it? In case of specific query, you will provide a properly formatted answer. I am attaching two examples for you regarding the format. Starting with the user prompt and then the response kt LawLens. The structure you will be following is of LawLens reply. Here we have 4 headings, first is issue summary that briefly covers issue, second is legal advice, third is expected judgement, and fourth is Reference section. Note: the format of answer is really important, carefully analyze the LawLens reply in the attached examples and your future answers should be exactly in the same format and proper references should be there just like in the example."

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
            color: currentMessage.user._id === 1 ? 'black' : 'black',
            fontFamily: 'Poppins-Medium'
          },
          left: {
            color: currentMessage.user._id === 1 ? 'black' : 'black',
            fontFamily: 'Poppins-Medium'
          }
        }}
      />
    );
  };

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
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
            style={{ height: 30, width: 30, borderRadius: 50, marginTop: 10 }}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Image
            source={images.ham}
            style={{ height: 25, width: 25, borderRadius: 0, marginTop: 10 }}
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
      );
    }

    return <Bubble {...props} />;
  };

//   const generateText = async () => {
//     if (inputMessage.trim() === '') return;

//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputMessage,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };

//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
//     setInputMessage('');
//     setIsTyping(true);

//     const apiKey = '02d7e52b4ab14caeba857d96a67f162b';
//     const searchEndpoint = 'https://aisearch-fypp408468331618.search.windows.net';
//     const searchIndexName = 'KLRuXvCpHLmweFad7yXwziDKdRrYCCmRxfQT77XNulAzSeBNpq7C';
    
//     const config = {
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: initialPrompt },
//         { role: 'user', content: inputMessage }
//       ],
//       temperature: 0.7,
//       azureExtensionOptions: {
//         extensions: [
//           {
//             type: 'azure_search',
//             endpoint: searchEndpoint,
//             indexName: searchIndexName,
//             authentication: {
//               type: 'api_key',
//               key: apiKey,
//             },
//             queryType: 'vector_simple_hybrid',
//             inScope: true,
//             roleInformation: initialPrompt,
//             strictness: 3,
//             topNDocuments: 5,
//             embeddingDependency: {
//               type: 'deployment_name',
//               deploymentName: 'text-embedding-ada-002'
//             }
//           }
//         ],
//       },
//     };

//     try {
//       const response = await axios.post(
//         'https://westeurope-azureopenai-instance.openai.azure.com/',
//         config,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//           },
//         }
//       );

//       const botMessageText = response.data.choices[0].message.content.trim();

//       const botMessage = {
//         _id: messages.length + 2,
//         text: botMessageText,
//         createdAt: new Date(),
//         user: { _id: 2, name: 'LawLens' },
//       };

//       setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsTyping(false);
//       // saveChat({ _id: Date.now(), messages });
//     }
//   };

// const generateText = async () => {
//     if (inputMessage.trim() === '') return;
  
//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputMessage,
//       createdAt: new Date(),
//       user: { _id: 1 },
//     };
  
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
//     setInputMessage('');
//     setIsTyping(true);
  
//     const apiKey = '02d7e52b4ab14caeba857d96a67f162b'; // Replace with your actual API key
//     const searchEndpoint = 'https://aisearch-fypp408468331618.search.windows.net';
//     const searchIndexName = 'KLRuXvCpHLmweFad7yXwziDKdRrYCCmRxfQT77XNulAzSeBNpq7C';
  
//     const config = {
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: initialPrompt },
//         { role: 'user', content: inputMessage }
//       ],
//       temperature: 0.7,
//       azureExtensionOptions: {
//         extensions: [
//           {
//             type: 'azure_search',
//             endpoint: searchEndpoint,
//             indexName: searchIndexName,
//             authentication: {
//               type: 'api_key',
//               key: apiKey,
//             },
//             queryType: 'vector_simple_hybrid',
//             inScope: true,
//             roleInformation: initialPrompt,
//             strictness: 3,
//             topNDocuments: 5,
//             embeddingDependency: {
//               type: 'deployment_name',
//               deploymentName: 'text-embedding-ada-002'
//             }
//           }
//         ],
//       },
//     };
  
//     try {
//       const response = await axios.post(
//         'https://westeurope-azureopenai-instance.openai.azure.com/',
//         config,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//           },
//         }
//       );
  
//       const botMessageText = response.data.choices[0].message.content.trim();
  
//       const botMessage = {
//         _id: messages.length + 2,
//         text: botMessageText,
//         createdAt: new Date(),
//         user: { _id: 2, name: 'LawLens' },
//       };
  
//       setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle the error here (e.g., display an error message to the user)
//     } finally {
//       setIsTyping(false);
//       // saveChat({ _id: Date.now(), messages });
//     }
//   };
const generateText = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
        _id: messages.length + 1,
        text: inputMessage,
        createdAt: new Date(),
        user: { _id: 1 },
    };

    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
    setInputMessage('');
    setIsTyping(true);

    const apiKey = '02d7e52b4ab14caeba857d96a67f162b'; // Replace with your actual API key
    const searchEndpoint = 'https://aisearch-fypp408468331618.search.windows.net';
    const searchIndexName = 'KLRuXvCpHLmweFad7yXwziDKdRrYCCmRxfQT77XNulAzSeBNpq7C';

    const config = {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: initialPrompt },
            { role: 'user', content: inputMessage }
        ],
        temperature: 0.7,
        azureExtensionOptions: {
            extensions: [
                {
                    type: 'azure_search',
                    endpoint: searchEndpoint,
                    indexName: searchIndexName,
                    authentication: {
                        type: 'api_key',
                        key: apiKey,
                    },
                    queryType: 'vector_simple_hybrid',
                    inScope: true,
                    roleInformation: initialPrompt,
                    strictness: 3,
                    topNDocuments: 5,
                    embeddingDependency: {
                        type: 'deployment_name',
                        deploymentName: 'text-embedding-ada-002'
                    }
                }
            ],
        },
    };

    try {
        const response = await axios.post(
            'https://westeurope-azureopenai-instance.openai.azure.com/',
            config,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        const botMessageText = response.data.choices[0].message.content.trim();

        const botMessage = {
            _id: messages.length + 2,
            text: botMessageText,
            createdAt: new Date(),
            user: { _id: 2, name: 'LawLens' },
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error here (e.g., display an error message to the user)
        // For example, set an error state and show a message in the UI
    } finally {
        setIsTyping(false);
    }
};


  const handleBookmark = async () => {
    try {
      await saveChat({ _id: Date.now(), messages });
      console.log('Chat saved successfully');
    } catch (e) {
      console.error('Error saving chat:', e.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="auto" backgroundColor="#161622" />
      <View className='h-[100px] bg-gray-200 w-full px-3 flex-row align-center justify-between'>
        <TouchableOpacity className='h-14 w-14 align-center justify-center absolute bottom-1 left-5'
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

export default Open;
