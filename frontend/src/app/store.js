import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './features/playerSlice';
import deezerApi from "./api";

const store = configureStore({
  reducer: {
    player: playerReducer,
    [deezerApi.reducerPath]: deezerApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deezerApi.middleware)
});

export default store;