// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR7wFPuljqhPTFhpLHVwHPoiFlu-ejBeM",
  authDomain: "crud-app-10453.firebaseapp.com",
  projectId: "crud-app-10453",
  storageBucket: "crud-app-10453.appspot.com",
  messagingSenderId: "516032732421",
  appId: "1:516032732421:web:15671345155d8737f42b6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs };
