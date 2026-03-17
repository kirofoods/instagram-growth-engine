import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Replace these with your Firebase project credentials
// In Vite, use import.meta.env.VITE_* for environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBJVSQD02S_2VnGh-veAL5GULdORE1oL0g',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kirogram-5de66.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kirogram-5de66',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kirogram-5de66.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '277455880927',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:277455880927:web:d7ef9a55d285e5ef335f6a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support Firestore persistence.');
  }
});

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, db, auth, storage };
