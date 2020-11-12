import { createEffect, createEvent, createStore, forward } from 'effector';
import { Meme } from '../types';
import { collection } from '../firebase/firebase';
import firebase from 'firebase/app';
import { createGate } from 'effector-react';

type MemesStore = Meme[];

interface FirebaseMeme extends Meme {
  timestamp: firebase.firestore.Timestamp;
}

const memesStore = createStore<MemesStore>([]);

collection.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((item) => item.data() as FirebaseMeme);

  updateMemes(data);
});

const addMeme = createEffect(async (meme: Meme) => {
  try {
    const doc = await collection.add({
      ...meme,
      timestamp: firebase.firestore.Timestamp.now(),
    });
    return Promise.resolve((await doc.get()).data() as FirebaseMeme);
  } catch {
    return Promise.reject('Cannot add meme ot firebase');
  }
});

const fetchMemes = createEffect<() => Promise<Meme[]>>(async () => {
  try {
    const data = (await collection.orderBy('timestamp', 'desc').get()).docs.map(
      (item) => item.data() as FirebaseMeme
    );

    return data;
  } catch {
    return Promise.reject('Cannot get memes from firebase');
  }
});

const updateMemes = createEvent<Meme[]>();

memesStore.on([updateMemes, fetchMemes.doneData], (_, memes) => memes);

memesStore.on(addMeme.doneData, (state, value) => {
  return [value, ...state];
});

const AppGate = createGate();

forward({
  from: AppGate.open,
  to: fetchMemes,
});

export { AppGate, memesStore, addMeme, fetchMemes };
