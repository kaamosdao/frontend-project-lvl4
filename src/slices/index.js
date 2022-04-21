import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice.js';
import messageReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
  },
});
