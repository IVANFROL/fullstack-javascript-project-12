import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';
import socketMiddleware from './middleware/socketMiddleware';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
