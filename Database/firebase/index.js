const admin = require('firebase-admin');
const initializeApp = require('firebase/app');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ecommerce-coderhouse-d8cd7.firebaseapp.com",
    projectId: "ecommerce-coderhouse-d8cd7",
    storageBucket: "ecommerce-coderhouse-d8cd7.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
    appId: process.env.FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);


const getFirebase = () => app;
const getFirestore = () => firebase.firestore(app);
module.exports=getFirebase;