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
      const appState = state;
      appState.items = payload;
    },
    addMessage: (state, { payload }) => {
      const appState = state;
      appState.items.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const appState = state;
      appState.items = removeItemFromState(appState, 'channelId', payload);
    });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
