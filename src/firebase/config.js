import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration — uses env vars in CI, fallback for local dev
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

// Initialize Firestore with multi-tab offline persistence
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch {
  // Already initialized or unsupported — use default instance
  db = getFirestore(app);
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, db, auth, storage };
