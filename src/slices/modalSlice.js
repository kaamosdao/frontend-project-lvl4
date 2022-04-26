import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  action: null, // adding deleting renaming
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalInfo: (state, { payload }) => {
      const appState = state;
      appState.action = payload.action;
      appState.item = payload.item;
    },
    hideModal: (state) => {
      const appState = state;
      appState.action = null;
      appState.item = null;
    },
  },
});

export const { setModalInfo, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
