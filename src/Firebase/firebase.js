import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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
    if (name.length < 1) return false;
    const regex = /https?:\/\/i?.?imgur.com\/\S+/;
    if (regex.test(link)) {
      const itest = /https?:\/\/i.imgur.com/;
      if (!itest.test(link)) link = link.replace('imgur', 'i.imgur');
      const typeTest = /https?:\/\/i?.?imgur.com\/\S+\./;
      if (!typeTest.test(link)) link += '.jpg';
      else link = link.replace(/png/, 'jpg');
      let data = {};
      data[name] = link;
      this.db
        .collection('Images')
        .doc()
        .set(data)
        .catch(err => console.log(err.name));
      return true;
    } else {
      return false;
    }
  }
}

export const fb = new Firebase();
