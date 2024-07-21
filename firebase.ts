// Import the functions you need from the SDKs you need
import { connectDatabaseEmulator, getDatabase } from '@firebase/database';
import { connectFunctionsEmulator, getFunctions } from '@firebase/functions';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export enum Collections {
  Collectors = 'collectors',
  Cards = 'cards'
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_RT_DATABASE_URL
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const functions = getFunctions(app);

// Check if we should use emulators based on location.hostname
if (process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectDatabaseEmulator(rtdb, 'localhost', 9000);
}

export default app;
export { auth, db, rtdb };
