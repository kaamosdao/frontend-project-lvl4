import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  items: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const appState = state;
      appState.items = payload;
    },
    addChannel: (state, { payload }) => {
      const appState = state;
      appState.items.push(payload);
    },
    setCurrentChannel: (state, { payload }) => {
      const appState = state;
      appState.currentChannelId = payload;
    },
    removeChannel: (state, { payload }) => {
      const appState = state;
      appState.items = state.items.filter((channel) => channel.id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      const appState = state;
      const index = appState.items.findIndex((element) => element.id === payload.id);
      appState.items[index] = payload;
    },
  },
});

export const {
  setChannels, addChannel, setCurrentChannel, removeChannel, renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;

// {"channels":[{"id":1,"name":"general","removable":false},
// {"id":2,"name":"random","removable":false}],
// "messages":[],"currentChannelId":1}
