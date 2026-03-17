import { useEffect, useState, useCallback, useRef } from 'react';
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const DEVICE_ID = (() => {
  let id = localStorage.getItem('kirogram_device_id');
  if (!id) {
    id = `device_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('kirogram_device_id', id);
  }
  return id;
})();

/**
 * useAppData — real-time sync of a single document to Firestore.
 * Enables cross-device sync (PC ↔ Laptop) via Firestore real-time listeners.
 *
 * Usage:
 *   const { data, updateData, loading, error, synced } = useAppData('settings', defaultSettings);
 *
 * @param {string} docKey - Document key within the "appData" collection
 * @param {object} defaultData - Default data if no Firestore doc exists yet
 */
export const useAppData = (docKey, defaultData = {}) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [synced, setSynced] = useState(false);
  const skipNextUpdate = useRef(false);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const docRef = doc(db, 'appData', docKey);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const firestoreData = snapshot.data();
          // Don't overwrite if we just wrote this update ourselves
          if (skipNextUpdate.current) {
            skipNextUpdate.current = false;
          } else {
            setData(firestoreData);
          }
          setSynced(true);
        } else {
          // First time — seed Firestore with defaults
          setDoc(docRef, {
            ...defaultData,
            _createdAt: serverTimestamp(),
            _updatedAt: serverTimestamp(),
            _deviceId: DEVICE_ID,
          }).catch((err) => setError(err));
        }
        setLoading(false);
      },
      (err) => {
        console.error(`Firestore sync error for "${docKey}":`, err);
        setError(err);
        setLoading(false);
        // Still use local data even if Firestore fails
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docKey]);

  // Update data locally + push to Firestore
  const updateData = useCallback(
    async (updates) => {
      const newData = typeof updates === 'function' ? updates(data) : { ...data, ...updates };
      setData(newData);
      skipNextUpdate.current = true;

      try {
        const docRef = doc(db, 'appData', docKey);
        await setDoc(docRef, {
          ...newData,
          _updatedAt: serverTimestamp(),
          _deviceId: DEVICE_ID,
        }, { merge: true });
        setSynced(true);
      } catch (err) {
        console.error(`Firestore write error for "${docKey}":`, err);
        setError(err);
        setSynced(false);
      }
    },
    [data, docKey]
  );

  return { data, updateData, loading, error, synced };
};

/**
 * useAppCollection — real-time sync of a full Firestore collection.
 * For lists of items (calendar events, content ideas, etc.)
 */
export const useAppCollection = (collectionKey) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collRef = collection(db, collectionKey);

    const unsubscribe = onSnapshot(
      collRef,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(docs);
        setLoading(false);
      },
      (err) => {
        console.error(`Firestore collection error for "${collectionKey}":`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionKey]);

  const addItem = useCallback(
    async (itemData) => {
      try {
        const docRef = doc(collection(db, collectionKey));
        await setDoc(docRef, {
          ...itemData,
          _createdAt: serverTimestamp(),
          _updatedAt: serverTimestamp(),
          _deviceId: DEVICE_ID,
        });
        return docRef.id;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [collectionKey]
  );

  const updateItem = useCallback(
    async (itemId, updates) => {
      try {
        const docRef = doc(db, collectionKey, itemId);
        await setDoc(docRef, {
          ...updates,
          _updatedAt: serverTimestamp(),
          _deviceId: DEVICE_ID,
        }, { merge: true });
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [collectionKey]
  );

  const removeItem = useCallback(
    async (itemId) => {
      try {
        const docRef = doc(db, collectionKey, itemId);
        await deleteDoc(docRef);
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [collectionKey]
  );

  return { items, addItem, updateItem, removeItem, loading, error };
};
