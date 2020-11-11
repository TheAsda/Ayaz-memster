import { createEvent, createStore } from 'effector';
import { Meme } from '../types';

interface SelectedStore {
  selected?: Meme;
}

const selectedStore = createStore<SelectedStore>({});

const toggleSelected = createEvent<Meme>();

selectedStore.on(toggleSelected, (state, value) => {
  if (
    value.imageUrl === state.selected?.imageUrl &&
    value.title === state.selected?.title
  ) {
    return {
      selected: undefined,
    };
  }
  
  return {
    selected: value,
  };
});

export { selectedStore, toggleSelected };
