import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice.js';

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
      appState.items = state.items.filter((message) => message.channelId !== payload.id);
    });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;

// {"channels":[{"id":1,"name":"general","removable":false},
// {"id":2,"name":"random","removable":false}],
// "messages":[],"currentChannelId":1}
