// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiVX-WP7BqMyExkxsVsLO5Sd7se60OHeY",
  authDomain: "e-shop-vid-19a12.firebaseapp.com",
  projectId: "e-shop-vid-19a12",
  storageBucket: "e-shop-vid-19a12.appspot.com",
  messagingSenderId: "364261358674",
  appId: "1:364261358674:web:47301cf2f7f22cb604338b",
  measurementId: "G-6MGHJVPQND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;
