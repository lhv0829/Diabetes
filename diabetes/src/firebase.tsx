
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import 'firebase/auth';
import 'firebase/database';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAwDKm9EpfUIAn8k9UlG9xXfOqVhj3nnCc",
  authDomain: "diabetes-952c8.firebaseapp.com",
  projectId: "diabetes-952c8",
  storageBucket: "diabetes-952c8.appspot.com",
  messagingSenderId: "415335868627",
  appId: "1:415335868627:web:f86f99b209f6954aea0c26",
  measurementId: "G-SEFC810NNQ"
};

firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!

export { firestore };
