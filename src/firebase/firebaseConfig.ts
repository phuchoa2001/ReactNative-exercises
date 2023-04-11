// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBckqxh-Tg6IFgUqdpgDo5UJX_Rh_xUDWg",
  authDomain: "auth-reactnative-3ccc8.firebaseapp.com",
  projectId: "auth-reactnative-3ccc8",
  storageBucket: "auth-reactnative-3ccc8.appspot.com",
  messagingSenderId: "740359550978",
  appId: "1:740359550978:web:29233bd62707a11bd48f1b",
  measurementId: "G-821EWS7SG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);