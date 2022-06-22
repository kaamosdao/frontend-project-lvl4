/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null, // adding deleting renaming
  show: false,
  data: {
    id: null,
    name: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.data.id = payload.id;
      state.data.name = payload.name;
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
