import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SETALL':
      state = action.data;
    default:
      return state;
  }
};

const currentReducer = (state = { name: '', img: '' }, action) => {
  switch (action.type) {
    case 'SETCUR':
      state.name = action.name;
      state.img = action.img;
      return state;
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    images: imagesReducer,
    current: currentReducer,
  });
