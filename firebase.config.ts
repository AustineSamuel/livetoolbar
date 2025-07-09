import { getApps, initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId,
};
// Initialize Firebase Initialize Firebase
const app=getApps().length===0? initializeApp(firebaseConfig):getApps()[0];

// Get a Firestore instance
const db = getFirestore(app);
const storage=getStorage(app);
const getCollectionProps:(collectionName:string)=>any=(collectionName:string)=>{
return collection(db,collectionName);
}


export {db,app,getCollectionProps,storage};