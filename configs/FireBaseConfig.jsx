// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3dRnCXz_MIG9X5spXFBs8mOmManwEu9g",
  authDomain: "gym-app2-82d6a.firebaseapp.com",
  projectId: "gym-app2-82d6a",
  storageBucket: "gym-app2-82d6a.appspot.com",
  messagingSenderId: "266261409067",
  appId: "1:266261409067:web:7ff52d793026e74b4ea96e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
