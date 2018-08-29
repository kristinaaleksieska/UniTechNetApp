import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyAMbI4ptcPNXdsCcRG6dmFjveXX6Z9nIp8',
  authDomain: 'uniapptechnet.firebaseapp.com',
  databaseURL: 'https://uniapptechnet.firebaseio.com',
  projectId: 'uniapptechnet',
  storageBucket: 'uniapptechnet.appspot.com',
  messagingSenderId: '498570156494'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
