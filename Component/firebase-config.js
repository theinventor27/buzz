// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAV7GQRAZ1-4nru0T9_1-fWxnE7bz6EogQ',
  authDomain: 'buzz-chat-58f7b.firebaseapp.com',
  projectId: 'buzz-chat-58f7b',
  storageBucket: 'buzz-chat-58f7b.appspot.com',
  messagingSenderId: '118273009842',
  appId: '1:118273009842:web:260748fe8741c543aa01ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
