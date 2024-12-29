// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVpYiWpp2kWFrw4zZUfrfCWL_adaKKA6I",
  authDomain: "soco-94a98.firebaseapp.com",
  projectId: "soco-94a98",
  storageBucket: "soco-94a98.firebasestorage.app",
  messagingSenderId: "967816953976",
  appId: "1:967816953976:web:1778f99eb5283cc7bbed8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
export { fireDB, auth, storage };
