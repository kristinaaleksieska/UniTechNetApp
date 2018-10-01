import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyB6ksgx9R3SmbOhXKg8MRO1DMD3myFfpIk',
  authDomain: 'unitechnet-34c43.firebaseapp.com',
  databaseURL: 'https://unitechnet-34c43.firebaseio.com',
  projectId: 'unitechnet-34c43',
  storageBucket: 'unitechnet-34c43.appspot.com',
  messagingSenderId: '429882862683'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const storage = firebase.storage();

export { firebase, storage, database as default };
