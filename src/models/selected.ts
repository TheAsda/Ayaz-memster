import { createEvent, createStore } from 'effector';
import { Meme, SelectedStore } from '../types';

const selectedStore = createStore<SelectedStore>({});

const setSelected = createEvent<Meme>();

selectedStore.on(setSelected, (_, value) => {
  return {
    selected: value,
  };
});

export { selectedStore, setSelected };
