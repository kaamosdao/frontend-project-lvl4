import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: null,
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
    setCurrentChannel: (state, { payload }) => {
      const appState = state;
      appState.currentChannelId = payload;
    },
  },
});

export const { setChannels, setCurrentChannel } = channelSlice.actions;

export default channelSlice.reducer;

// {"channels":[{"id":1,"name":"general","removable":false},
// {"id":2,"name":"random","removable":false}],
// "messages":[],"currentChannelId":1}
