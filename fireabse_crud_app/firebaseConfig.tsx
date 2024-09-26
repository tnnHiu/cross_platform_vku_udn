// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFXSG0OSPppZ4I4odbjXXoO4jvp-0uLYE",
  authDomain: "fir-crud-app-9956e.firebaseapp.com",
  projectId: "fir-crud-app-9956e",
  storageBucket: "fir-crud-app-9956e.appspot.com",
  messagingSenderId: "185790126213",
  appId: "1:185790126213:web:c72fbb969c821be57371ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
