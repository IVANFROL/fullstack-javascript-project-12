import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messagesAPI } from '../../services/api';

// Асинхронные действия
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.getMessages(channelId);
      return { channelId, messages: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки сообщений');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ channelId, body }, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.sendMessage(channelId, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка отправки сообщения');
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      await messagesAPI.deleteMessage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления сообщения');
    }
  }
);

const initialState = {
  messagesByChannel: {}, // { channelId: [messages] }
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { channelId, message } = action.payload;
      if (!state.messagesByChannel[channelId]) {
        state.messagesByChannel[channelId] = [];
      }
      state.messagesByChannel[channelId].push(message);
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.messagesByChannel = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { channelId, messages } = action.payload;
        state.messagesByChannel[channelId] = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        const channelId = message.channelId;
        if (!state.messagesByChannel[channelId]) {
          state.messagesByChannel[channelId] = [];
        }
        state.messagesByChannel[channelId].push(message);
      })
      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.payload;
        Object.keys(state.messagesByChannel).forEach(channelId => {
          state.messagesByChannel[channelId] = state.messagesByChannel[channelId].filter(
            message => message.id !== messageId
          );
        });
      });
  },
});

export const { addMessage, clearError, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
