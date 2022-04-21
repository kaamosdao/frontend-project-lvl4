import { createSlice } from '@reduxjs/toolkit';

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
    // removeMessage: (state, payload) => {
    //   const appState = state;
    //   appState.filter((message) => message.id !== payload.id);
    // },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;

// {"channels":[{"id":1,"name":"general","removable":false},
// {"id":2,"name":"random","removable":false}],
// "messages":[],"currentChannelId":1}
