// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIABHvGMirNuxXWbHD_oGCqI0d0vBfZos",
  authDomain: "docuwiki-476d4.firebaseapp.com",
  projectId: "docuwiki-476d4",
  storageBucket: "docuwiki-476d4.appspot.com",
  messagingSenderId: "618644704431",
  appId: "1:618644704431:web:b91b9fb28602b6e371d85a",
  measurementId: "G-KQ27S66JLC",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
