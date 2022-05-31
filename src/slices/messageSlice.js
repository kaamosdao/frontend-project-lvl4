/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice.js';
import removeItemFromState from './removeItemFromState.js';

const initialState = {
  items: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.items = payload;
    },
    addMessage: (state, { payload }) => {
      state.items.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      state.items = removeItemFromState(state, 'channelId', payload.id);
    });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
