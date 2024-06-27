// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-6bc5c.firebaseapp.com",
  projectId: "blog-6bc5c",
  storageBucket: "blog-6bc5c.appspot.com",
  messagingSenderId: "189252253037",
  appId: "1:189252253037:web:ca484b3f857de7a81f1664"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);