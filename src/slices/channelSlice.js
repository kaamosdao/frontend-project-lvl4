/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

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
      state.items = _.remove(state.items, (item) => item.id !== payload.id);
      if (payload.id === state.currentChannelId) {
        const defaultId = 1;
        state.currentChannelId = defaultId;
      }
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
