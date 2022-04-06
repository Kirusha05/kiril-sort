import { configureStore } from "@reduxjs/toolkit";
import arraySlice from "./arraySlice";
import uiSlice from './uiSlice';

const store = configureStore({
  reducer: {
    array: arraySlice,
    ui: uiSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export * from './arraySlice';
export * from './uiSlice';