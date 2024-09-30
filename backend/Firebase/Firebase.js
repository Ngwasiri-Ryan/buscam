import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWt6AEqDinNORaKDlFkrLfYprGBXkT_-o",
  authDomain: "buscam-7e844.firebaseapp.com",
  projectId: "buscam-7e844",
  storageBucket: "buscam-7e844.appspot.com",
  messagingSenderId: "183041125728",
  appId: "1:183041125728:web:e5642b81371cc23fb90205",
  measurementId: "G-01QCE8ZJ28"
};
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { db, auth };