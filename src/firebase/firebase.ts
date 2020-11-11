import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAyyqLME_QyoliyURhsVjE_ykkxTOgNBoQ',
  authDomain: 'ayazmemster.firebaseapp.com',
  databaseURL: 'https://ayazmemster.firebaseio.com',
  projectId: 'ayazmemster',
  storageBucket: 'ayazmemster.appspot.com',
  messagingSenderId: '748903039219',
  appId: '1:748903039219:web:1646329bf7b4631c',
};

export const collection = firebase
  .initializeApp(config)
  .firestore()
  .collection('images');
