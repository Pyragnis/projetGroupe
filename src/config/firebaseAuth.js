import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBteOt88YgouQPpYiusule9feTPx7K5x58",
  authDomain: "readify-382212.firebaseapp.com",
  projectId: "readify-382212",
  storageBucket: "readify-382212.appspot.com",
  messagingSenderId: "323250229849",
  appId: "1:323250229849:web:99f8257679fe7ee8665748",
  measurementId: "G-434TV4WE69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;