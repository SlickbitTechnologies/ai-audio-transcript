import { createSlice } from "@reduxjs/toolkit";
import { AudioTransactiptApi } from "../api/AudioTranscriptApi";

const initialState = {
  message: "",
  audioData: [],
  toastMessage: false,
};

const AudioTranscriptReducer = createSlice({
  name: "audio",
  initialState,
  reducers: {
    clearAudioTranscript(state, { payload }) {
      state.message = "";
      state.toastMessage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        AudioTransactiptApi.endpoints.uploadAudio.matchFulfilled,
        (state, action) => {
          console.log(action);
          const { payload } = action;
          state.message = payload.message;
          state.toastMessage = true;
        }
      )
      .addMatcher(
        AudioTransactiptApi.endpoints.getAllAudioData.matchFulfilled,
        (state, action) => {
          state.audioData = action.payload;
        }
      );
  },
});
export const { clearAudioTranscript } = AudioTranscriptReducer.actions;
export default AudioTranscriptReducer.reducer;
