import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAyyqLME_QyoliyURhsVjE_ykkxTOgNBoQ',
  authDomain: 'ayazmemster.firebaseapp.com',
  databaseURL: 'https://ayazmemster.firebaseio.com',
  projectId: 'ayazmemster',
  storageBucket: '',
  messagingSenderId: '748903039219',
  appId: '1:748903039219:web:1646329bf7b4631c',
};

class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAyyqLME_QyoliyURhsVjE_ykkxTOgNBoQ',
      authDomain: 'ayazmemster.firebaseapp.com',
      projectId: 'ayazmemster',
    });

    this.db = firebase.firestore();
  }
  
  getImages() {
    let database = this.db;
    return new Promise(function(resolve, reject) {
      database
        .collection('Images')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            resolve(doc.data());
          });
        });
    });
  }
}

export default Firebase;
