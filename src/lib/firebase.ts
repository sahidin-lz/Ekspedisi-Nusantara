import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyB-JQQc650ACF_P6-U4U7O31V0asZcM-yk",
  authDomain: "ekspedisi-nusantara.firebaseapp.com",
  projectId: "ekspedisi-nusantara",
  storageBucket: "ekspedisi-nusantara.firebasestorage.app",
  messagingSenderId: "916856580793",
  appId: "1:916856580793:web:072fe07100097638158968"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);



