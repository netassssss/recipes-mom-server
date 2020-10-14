// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app');
const consts = require('../consts/firebase');
const admin = require('firebase-admin');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

const serviceAccount = require('../consts/adminCred');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://recipe-mom-78b40.firebaseio.com',
});

const db = admin.firestore();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: consts.apiKey,
  authDomain: consts.authDomain,
  databaseURL: consts.dbUrl,
  projectId: consts.projectId,
  storageBucket: consts.storageBucket,
  messagingSenderId: consts.senderId,
  appId: consts.appId,
  measurementId: consts.mId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  db,
};
