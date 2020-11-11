import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector';
import { FirebaseMeme, Meme, MemesStore } from '../types';
import { collection } from '../firebase/firebase';
import { firestore } from 'firebase';

const memesStore = createStore<MemesStore>([]);

collection.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((item) => item.data() as FirebaseMeme);

  updateMemes(data);
});

const addMeme = createEffect<(meme: Meme) => Promise<FirebaseMeme>>(
  async (meme) => {
    try {
      const doc = await collection.add({
        ...meme,
        timestamp: firestore.Timestamp.now(),
      });
      return Promise.resolve((await doc.get()).data() as FirebaseMeme);
    } catch {
      return Promise.reject();
    }
  }
);

const fetchMemes = createEffect<() => Promise<Meme[]>>(async () => {
  try {
    const data = (await collection.orderBy('timestamp').get()).docs.map(
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

export { memesStore, addMeme, fetchMemes };
