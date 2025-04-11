// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB-Nk2rEjxprnh2BI86cImXiHBMmKBoCE",
  authDomain: "your-concert.firebaseapp.com",
  projectId: "your-concert",
  storageBucket: "your-concert.firebasestorage.app",
  messagingSenderId: "897106775650",
  appId: "1:897106775650:web:99707b7e78505d0477cb3b",
  measurementId: "G-5R6WTGE2TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);