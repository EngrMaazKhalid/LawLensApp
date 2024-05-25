import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8RwdsfWpduGjA1PCh7NjZLA9n4Dei9hk",
  authDomain: "lawlens-1c530.firebaseapp.com",
  projectId: "lawlens-1c530",
  storageBucket: "lawlens-1c530.appspot.com",
  messagingSenderId: "814974119600",
  appId: "1:814974119600:web:c5f6dae836d8b0cce71575",
  measurementId: "G-VYJ6FZNRBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomRef = collection(db, "room");



