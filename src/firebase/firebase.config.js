// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAbv1kvAXUiJfomGtmcAJqp7DgU6wQohrw",
  authDomain: "karokids-2cb6a.firebaseapp.com",
  projectId: "karokids-2cb6a",
  storageBucket: "karokids-2cb6a.appspot.com",
  messagingSenderId: "309517758272",
  appId: "1:309517758272:web:89c6f76e1d61ef85c114a5",
  measurementId: "G-DH8K74YVBB",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
