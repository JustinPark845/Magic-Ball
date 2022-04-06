// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7lbDgZjv_XnX35tDZp2L6NfgyXY7cIzE",
  authDomain: "testdata-b3dfe.firebaseapp.com",
  projectId: "testdata-b3dfe",
  storageBucket: "testdata-b3dfe.appspot.com",
  messagingSenderId: "587381695759",
  appId: "1:587381695759:web:eab912e52e3545f6bdca7a",
  measurementId: "G-2899EHQ02Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;