import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAuT2uIV8ZfW1VdpFo75v2z52OlCUR5a3A",
  authDomain: "rnw-student.firebaseapp.com",
  projectId: "rnw-student",
  storageBucket: "rnw-student.appspot.com",
  messagingSenderId: "52849991972",
  appId: "1:52849991972:web:34889c65dafd4f0e4793b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export default db