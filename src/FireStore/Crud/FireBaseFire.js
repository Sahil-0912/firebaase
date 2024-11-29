// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuT2uIV8ZfW1VdpFo75v2z52OlCUR5a3A",
  authDomain: "rnw-student.firebaseapp.com",
  databaseURL: "https://rnw-student-default-rtdb.firebaseio.com",
  projectId: "rnw-student",
  storageBucket: "rnw-student.firebasestorage.app",
  messagingSenderId: "52849991972",
  appId: "1:52849991972:web:34889c65dafd4f0e4793b1"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const dbfire = getFirestore(app);

export default dbfire;
