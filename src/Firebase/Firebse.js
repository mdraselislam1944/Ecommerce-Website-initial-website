// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF6vxJcUYaGo86qXecwRNJLoooD1Hc0Vw",
  authDomain: "ecommerce-website-2cbfd.firebaseapp.com",
  projectId: "ecommerce-website-2cbfd",
  storageBucket: "ecommerce-website-2cbfd.appspot.com",
  messagingSenderId: "183014740594",
  appId: "1:183014740594:web:4531bc4bc3e7830f2968eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;