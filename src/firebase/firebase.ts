import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';

const config = {
  apiKey: 'AIzaSyAyyqLME_QyoliyURhsVjE_ykkxTOgNBoQ',
  authDomain: 'ayazmemster.firebaseapp.com',
  databaseURL: 'https://ayazmemster.firebaseio.com',
  projectId: 'ayazmemster',
  storageBucket: 'ayazmemster.appspot.com',
  messagingSenderId: '748903039219',
  appId: '1:748903039219:web:1646329bf7b4631c',
};

const app = firebase.initializeApp(config);
firebase.analytics();

export const perf = app.performance();
export const collection = app.firestore().collection('images');
