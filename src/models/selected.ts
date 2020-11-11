import { createEvent, createStore } from 'effector';
import { Meme } from '../types';

interface SelectedStore {
  selected?: Meme;
}

const selectedStore = createStore<SelectedStore>({});

const setSelected = createEvent<Meme>();

selectedStore.on(setSelected, (_, value) => {
  return {
    selected: value,
  };
});

export { selectedStore, setSelected };
