import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      return { success: true, data: response.user };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  const register = async (email, password, userName) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response.user.uid), {
        email,
        userName,
        userId: response.user.uid,
      });
      setUser(response.user);
      return { success: true, data: response.user };
    } catch (e) {
      return { success: false, msg: e.message };
    }

  };


    // const saveChat = async (chat) => {
    //   try {
    //     const chatRef = doc(db, "chats", user.uid);
    //     await updateDoc(chatRef, {
    //       messages: arrayUnion(chat)
    //     });
    //   } catch (e) {
    //     console.error("Error saving chat:", e.message);
    //   }
    // };


    // // const saveChat = async (chat) => {
    // //   try {
    // //     const chatRef = doc(db, "chats", user.uid);
    // //     // Ensure that 'chat' is not a nested array before using arrayUnion
    // //     if (Array.isArray(chat) && chat.some(item => Array.isArray(item))) {
    // //       console.error("Cannot save nested arrays in chat.");
    // //     } else {
    // //       await updateDoc(chatRef, {
    // //         messages: arrayUnion(chat)
    // //       });
    // //     }
    // //   } catch (e) {
    // //     console.error("Error saving chat:", e.message);
    // //   }
    // // };
    

    // const getChats = async () => {
    //   try {
    //     const chatRef = doc(db, "chats", user.uid);
    //     const chatSnap = await getDoc(chatRef);
    //     if (chatSnap.exists()) {
    //       return chatSnap.data().messages;
    //     } else {
    //       return [];
    //     }
    //   } catch (e) {
    //     console.error("Error fetching chats:", e.message);
    //     return [];
    //   }
    // };
    // const deleteChat = async (chatId) => {
    //   try {
    //     const chatRef = doc(db, "chats", user.uid);
    //     const chatSnap = await getDoc(chatRef);
    //     if (chatSnap.exists()) {
    //       const chats = chatSnap.data().messages.filter(chat => chat._id !== chatId);
    //       await updateDoc(chatRef, { messages: chats });
    //     }
    //   } catch (e) {
    //     console.error("Error deleting chat:", e.message);
    //   }
    // };

  
    // const saveChat = (chat) => {
    //   try {
    //     const chats = JSON.parse(localStorage.getItem('chats')) || [];
    //     chats.push(chat);
    //     localStorage.setItem('chats', JSON.stringify(chats));
    //   } catch (e) {
    //     console.error("Error saving chat:", e.message);
    //   }
    // };
  
    // const getChats = () => {
    //   try {
    //     const chats = JSON.parse(localStorage.getItem('chats')) || [];
    //     return chats;
    //   } catch (e) {
    //     console.error("Error fetching chats:", e.message);
    //     return [];
    //   }
    // };
  
    // const deleteChat = (chatId) => {
    //   try {
    //     let chats = JSON.parse(localStorage.getItem('chats')) || [];
    //     chats = chats.filter(chat => chat._id !== chatId);
    //     localStorage.setItem('chats', JSON.stringify(chats));
    //   } catch (e) {
    //     console.error("Error deleting chat:", e.message);
    //   }
    // };

    
  // const saveChat = async (chat) => {
  //   try {
  //     const existingChats = await AsyncStorage.getItem('chats');
  //     const chats = existingChats ? JSON.parse(existingChats) : [];
  //     chats.push(chat);
  //     await AsyncStorage.setItem('chats', JSON.stringify(chats));
  //   } catch (error) {
  //     console.error('Error saving chat:', error);
  //   }
  // };

  const saveChat = async (chat) => {
    try {
      const existingChats = await AsyncStorage.getItem('chats');
      const chats = existingChats ? JSON.parse(existingChats) : [];
      // Ensure the chat object has a messages array
      const newChat = { _id: Date.now().toString(), messages: chat.messages || [] };
      chats.push(newChat);
      await AsyncStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };
  
  const getChats = async () => {
    try {
      const chats = await AsyncStorage.getItem('chats');
      return chats ? JSON.parse(chats) : [];
    } catch (error) {
      console.error('Error retrieving chats:', error);
      return [];
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const existingChats = await AsyncStorage.getItem('chats');
      const chats = existingChats ? JSON.parse(existingChats) : [];
      const updatedChats = chats.filter(chat => chat._id !== chatId);
      await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };



  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, saveChat, deleteChat, getChats }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider');
  }
  return value;
};

