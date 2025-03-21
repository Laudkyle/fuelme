import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYo3LNYhQTEgWdcPV7_CZfpoOdjEVXBOE",
  authDomain: "phlouw-1dd03.firebaseapp.com",
  projectId: "phlouw-1dd03",
  storageBucket: "phlouw-1dd03.firebasestorage.app",
  messagingSenderId: "59223567265",
  appId: "1:59223567265:web:4d4549f9d05df3f5b339e0"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});



export { auth, app }; // Export all for named imports
