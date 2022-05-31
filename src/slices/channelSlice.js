/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import removeItemFromState from './removeItemFromState.js';

const initialState = {
  currentChannelId: 1,
  items: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.items = payload;
    },
    addChannel: (state, { payload }) => {
      state.items.push(payload);
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      state.items = removeItemFromState(state, 'id', payload.id);
    },
    renameChannel: (state, { payload }) => {
      const index = state.items.findIndex((element) => element.id === payload.id);
      state.items[index] = payload;
    },
  },
});

export const {
  setChannels, addChannel, setCurrentChannel, removeChannel, renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
