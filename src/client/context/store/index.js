import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { AudioTransactiptApi } from "../api/AudioTranscriptApi";
import AudioTranscriptReducer from "../reducers/AudioTranscriptReducer";
import LoadingReducer from "../reducers/LoadingReducer";
// import authReducer from "./AuthSlice.js";
const rootReducer = combineReducers({
  [AudioTransactiptApi.reducerPath]: AudioTransactiptApi.reducer,
  audio: AudioTranscriptReducer,
  loader: LoadingReducer,
});
const persistConfig = {
  key: "mvp-slickbit",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AudioTransactiptApi.middleware),
});
const persister = persistStore(store);
export { store, persister };
