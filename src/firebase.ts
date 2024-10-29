import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQHtr-OP_HdLQzdLYO86V4E0wOYr6_ni0",
  authDomain: "bookstore-90bcf.firebaseapp.com",
  projectId: "bookstore-90bcf",
  storageBucket: "bookstore-90bcf.appspot.com",
  messagingSenderId: "64739808687",
  appId: "1:64739808687:web:e18b6e538b661efe97cb5a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
