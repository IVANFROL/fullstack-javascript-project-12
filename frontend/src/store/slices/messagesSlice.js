import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { messagesAPI } from '../../services/api';
import { isNetworkError } from '../../utils/networkUtils';
import socketService from '../../services/socket';

// Асинхронные действия
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await messagesAPI.getMessages(channelId);
      return { channelId, messages: response.data };
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка загрузки сообщений');
      }
      const errorMessage = error.response?.data?.message || 'Ошибка загрузки сообщений';
      return rejectWithValue(errorMessage);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ channelId, body }, { rejectWithValue }) => {
    try {
      // Используем только HTTP API для отправки сообщений
      const response = await messagesAPI.sendMessage(channelId, body);
      // Используем реальное время отправки
      const messageWithTime = {
        ...response.data,
        createdAt: new Date().toISOString()
      };
      toast.success('Сообщение отправлено');
      return messageWithTime;
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка отправки сообщения');
      }
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка отправки сообщения';
      return rejectWithValue(errorMessage);
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
        // Загружаем сохраненные времена из localStorage
        const savedTimes = JSON.parse(localStorage.getItem('messageTimes') || '{}');
        
        const messagesWithTime = messages.map((message) => {
          if (message.createdAt) {
            return message; // Если время уже есть, оставляем как есть
          }
          
          // Проверяем, есть ли сохраненное время для этого сообщения
          const messageKey = `${channelId}-${message.id}`;
          if (savedTimes[messageKey]) {
            return {
              ...message,
              createdAt: savedTimes[messageKey]
            };
          }
          
          // Если нет сохраненного времени, используем текущее время
          const currentTime = new Date().toISOString();
          savedTimes[messageKey] = currentTime;
          
          return {
            ...message,
            createdAt: currentTime
          };
        });
        
        // Сохраняем времена в localStorage
        localStorage.setItem('messageTimes', JSON.stringify(savedTimes));
        state.messagesByChannel[channelId] = messagesWithTime;
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
        
        // Сохраняем время нового сообщения в localStorage
        const savedTimes = JSON.parse(localStorage.getItem('messageTimes') || '{}');
        const messageKey = `${channelId}-${message.id}`;
        savedTimes[messageKey] = message.createdAt;
        localStorage.setItem('messageTimes', JSON.stringify(savedTimes));
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
