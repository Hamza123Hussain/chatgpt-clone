// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { Firestore, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCnYoesMKXh81i_zZYxa9g1iLOyVKTeWAw',
  authDomain: 'chatgpt-clone-8a3be.firebaseapp.com',
  projectId: 'chatgpt-clone-8a3be',
  storageBucket: 'chatgpt-clone-8a3be.appspot.com',
  messagingSenderId: '845709047851',
  appId: '1:845709047851:web:3e414129859817ff0a926e',
  measurementId: 'G-09V6BXF789',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig) // we are checking if an app is already intialized then we use that, else we will intialize a new app
const db = getFirestore(app) // database ready

export { db }
