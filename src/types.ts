interface Meme {
  title: string;
  imageUrl: string;
}

interface FirebaseMeme extends Meme {
  timestamp: firebase.firestore.Timestamp;
}

type MemesStore = Meme[];

interface SelectedStore {
  selected?: Meme;
}

export { Meme, MemesStore, FirebaseMeme, SelectedStore };
