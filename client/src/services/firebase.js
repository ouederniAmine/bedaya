// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLLIHMjeuBqqFLlnAr68Px_8z8VLJu4zg",
  authDomain: "bullshit-2682b.firebaseapp.com",
  projectId: "bullshit-2682b",
  storageBucket: "bullshit-2682b.appspot.com",
  messagingSenderId: "1005573630139",
  appId: "1:1005573630139:web:36dec0e436acb2ad5ae19e",
  measurementId: "G-W6FLMS4JNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;