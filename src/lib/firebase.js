// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ⚠️ ganti dengan config dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBI5jsvVK2C3ijzoSAqgppRKuZHjI1dFoQ",
  authDomain: "sahaba-34f4b.firebaseapp.com",
  projectId: "sahaba-34f4b",
  storageBucket: "sahaba-34f4b.firebasestorage.app",
  messagingSenderId: "667154348416",
  appId: "1:667154348416:web:2845c2f6c72cf96a57a965",
  measurementId: "G-2E81Q82W4F"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);