
import { createStore } from 'framework7/lite';
import { readFromLocalStorage, writeToLocalStorage } from './util';

const store = createStore({
  state: {
    images: readFromLocalStorage()
  },
  getters: {
    images({ state }) {
      return state.images;
    }
  },
  actions: {
    addImage({ state }, image) {
      image.id = state.images.length + 1;
      state.images = [...state.images, image];
      writeToLocalStorage(state.images);
    },
  },
})
export default store;
