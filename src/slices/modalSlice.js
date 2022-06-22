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
    show: (state, { payload }) => {
      state.type = payload.type;
      state.data.id = payload.id;
      state.data.name = payload.name;
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

export const { show, hide } = modalSlice.actions;

export default modalSlice.reducer;
