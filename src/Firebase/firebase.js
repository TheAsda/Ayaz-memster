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

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.firestore();
  }

  getImages() {
    let database = this.db;
    return new Promise(function(resolve, reject) {
      database
        .collection('Images')
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            let file = doc.data();
            for (let title in file) data[title] = file[title];
          });
          resolve(data);
        });
    });
  }

  sendImages(name, link) {
    const regex = /https?:\/\/i?.?imgur.com\/\S+/;
    if (regex.test(link)) {
      const itest = /https?:\/\/i.imgur.com/;
      if (!itest.test(link)) link = link.replace('imgur', 'i.imgur');
      const typeTest = /https?:\/\/i?.?imgur.com\/\S+\./;
      console.log(typeTest.test(link));
      if (!typeTest.test(link)) link += '.jpg';
      else link = link.replace(/png/, 'jpg');
      console.log(link);
      let data = {};
      data[name] = link;
      this.db
        .collection('Images')
        .doc()
        .set(data)
        .catch(err => console.log(err.name));
      console.log('gj');
      return true;
    } else {
      console.log('bj');
      return false;
    }
  }
}

export const fb = new Firebase();
