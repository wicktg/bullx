// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // Import the Realtime Database functions
// import { getFirestore, collection, addDoc } from "firebase/firestore"; // Uncomment if you want to use Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALZhLM1VVb-QVgJx9T7rrUXvaYzQGrUEk",
  authDomain: "bullx-aac8e.firebaseapp.com",
  databaseURL: "https://bullx-aac8e-default-rtdb.firebaseio.com",
  projectId: "bullx-aac8e",
  storageBucket: "bullx-aac8e.firebasestorage.app",
  messagingSenderId: "7270020227",
  appId: "1:7270020227:web:899d001c06e0761c4cd7b6",
  measurementId: "G-0F6Q6GBTCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// If you're using Firestore instead, use this:
// const db = getFirestore(app);

export { db };
