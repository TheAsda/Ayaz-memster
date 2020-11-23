import { createEvent, createStore } from 'effector';

const searchStore = createStore<string>('');

const setSearch = createEvent<string>();

searchStore.on(setSearch, (_, search) => search.trim());

const resetSearch = createEvent();

searchStore.on(resetSearch, () => '');

export { searchStore, setSearch, resetSearch };
