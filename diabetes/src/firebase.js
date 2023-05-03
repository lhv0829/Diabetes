
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwDKm9EpfUIAn8k9UlG9xXfOqVhj3nnCc",
  authDomain: "diabetes-952c8.firebaseapp.com",
  projectId: "diabetes-952c8",
  storageBucket: "diabetes-952c8.appspot.com",
  messagingSenderId: "415335868627",
  appId: "1:415335868627:web:f86f99b209f6954aea0c26",
  measurementId: "G-SEFC810NNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);