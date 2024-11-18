import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  err: null,
  message: false
};
const isRejectedAction = (action) => {
  return action.type.endsWith("rejected");
};
const isPendingAction = (action) => {
  return action.type.endsWith("pending");
};
const isSuccessAction = (action) => {
  return action.type.endsWith("fulfilled");
};
const LoadingReducer = createSlice({
  name: "loader",
  initialState,
  reducers: {
    clearLoader(state, { payload }) {
      state.loading = false;
      state.error = false;
      state.err = null;
      state.message = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, { payload }) => {
        state.loading = true;
        state.error = false;
        state.err = null;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        console.log("error", payload);
        state.loading = false;
        state.error = true;
        state.err = payload.data;
      })
      .addMatcher(isSuccessAction, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.err = null;
        state.message = true
      });
  },
});
export const { clearLoader } = LoadingReducer.actions;
export default LoadingReducer.reducer;
