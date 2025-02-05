import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAXSp14_7uiH6jBC5qwCcTMTash2yVTt7c",
    authDomain: "login-example-18fa5.firebaseapp.com",
    projectId: "login-example-18fa5",
    storageBucket: "login-example-18fa5.firebasestorage.app",
    messagingSenderId: "537848456792",
    appId: "1:537848456792:web:b3716e1f01c6762276cc2d",
    measurementId: "G-8GKDW9GG2B"
  };

export  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);