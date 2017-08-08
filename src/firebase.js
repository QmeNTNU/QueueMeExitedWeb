import * as firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
  authDomain: 'queuemeapp-10df5.firebaseapp.com',
  databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
  projectId: 'queuemeapp-10df5',
  storageBucket: 'queuemeapp-10df5.appspot.com',
  messagingSenderId: '278836475143'
};

export const firebaseApp = firebase.initializeApp(config);
