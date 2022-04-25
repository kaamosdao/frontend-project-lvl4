import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  action: null, // adding deleting renaming
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalAction: (state, { payload }) => {
      const appState = state;
      appState.action = payload;
    },
    removeModalAction: (state) => {
      const appState = state;
      appState.action = null;
    },
  },
});

export const { setModalAction, removeModalAction } = modalSlice.actions;

export default modalSlice.reducer;
