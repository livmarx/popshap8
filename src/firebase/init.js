import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDRM877CdcOS2_EL6bsYv6mhOmhniJbSjg',
  authDomain: 'popshap-emagid.firebaseapp.com',
  databaseURL: 'https://popshap-emagid.firebaseio.com',
  projectId: 'popshap-emagid',
  storageBucket: 'popshap-emagid.appspot.com',
  messagingSenderId: '757099928293',
  appId: '1:757099928293:web:28ab43d6b0144cc2',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
