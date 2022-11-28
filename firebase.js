import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAYuRsH5Rw5GEj4tzHL-KcUDjX349kmhFw',
  authDomain: 'family-app-dac4a.firebaseapp.com',
  projectId: 'family-app-dac4a',
  storageBucket: 'family-app-dac4a.appspot.com',
  messagingSenderId: '768578140884',
  appId: '1:768578140884:web:cebb61c6df2bb94e885941',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
