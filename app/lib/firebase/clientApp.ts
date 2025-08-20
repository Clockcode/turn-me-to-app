// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "default_key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "turn-me-to-app.firebaseapp.com",
  projectId: "turn-me-to-app",
  storageBucket: "turn-me-to-app.firebasestorage.app",
  messagingSenderId: "123261115988",
  appId: "1:123261115988:web:99420b8be38943fe1b17c1",
  measurementId: "G-732S7HB813",
};

// Validate required config
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn("Firebase API key not found in environment variables");
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
