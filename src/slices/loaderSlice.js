/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showChatLoader: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showChatLoader: (state) => {
      state.showChatLoader = true;
    },
    hideChatLoader: (state) => {
      state.showChatLoader = false;
    },
  },
});

export const { showChatLoader, hideChatLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
