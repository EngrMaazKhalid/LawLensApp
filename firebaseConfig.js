// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence , initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),//persistence to hold user data in local storage it does not loose the data of app
    });

   export const db = getFirestore(app);
    export const usersRef = collection(db, "users");
    export const roomRef = collection(db, "room");
