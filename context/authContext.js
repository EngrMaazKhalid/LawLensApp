import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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


    const saveChat = async (chat) => {
      try {
        const chatRef = doc(db, "chats", user.uid);
        await updateDoc(chatRef, {
          messages: arrayUnion(chat)
        });
      } catch (e) {
        console.error("Error saving chat:", e.message);
      }
    };

    const getChats = async () => {
      try {
        const chatRef = doc(db, "chats", user.uid);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          return chatSnap.data().messages;
        } else {
          return [];
        }
      } catch (e) {
        console.error("Error fetching chats:", e.message);
        return [];
      }
    };
    const deleteChat = async (chatId) => {
      try {
        const chatRef = doc(db, "chats", user.uid);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          const chats = chatSnap.data().messages.filter(chat => chat._id !== chatId);
          await updateDoc(chatRef, { messages: chats });
        }
      } catch (e) {
        console.error("Error deleting chat:", e.message);
      }
    };



  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
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

