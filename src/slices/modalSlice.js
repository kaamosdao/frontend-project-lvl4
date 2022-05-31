/* eslint no-param-reassign: ["error", { "props": false }] */

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
      state.action = payload.action;
      state.item = payload.item;
    },
    hideModal: (state) => {
      state.action = null;
      state.item = null;
    },
  },
});

export const { setModalInfo, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
