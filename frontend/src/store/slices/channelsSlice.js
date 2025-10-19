import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { channelsAPI } from '../../services/api';
import { isNetworkError } from '../../utils/networkUtils';

// Асинхронные действия
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await channelsAPI.getChannels();
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка загрузки каналов');
      }
      const errorMessage = error.response?.data?.message || 'Ошибка загрузки каналов';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (name, { rejectWithValue }) => {
    try {
      const response = await channelsAPI.createChannel(name);
      toast.success('Канал создан');
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка создания канала');
      }
      const errorMessage = error.response?.data?.message || 'Ошибка создания канала';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (id, { rejectWithValue }) => {
    try {
      await channelsAPI.deleteChannel(id);
      toast.success('Канал удален');
      return id;
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка удаления канала');
      }
      const errorMessage = error.response?.data?.message || 'Ошибка удаления канала';
      return rejectWithValue(errorMessage);
    }
  }
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await channelsAPI.renameChannel(id, name);
      toast.success('Канал переименован');
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        toast.error('Ошибка сети. Проверьте подключение к интернету');
      } else {
        toast.error('Ошибка переименования канала');
      }
      const errorMessage = error.response?.data?.message || 'Ошибка переименования канала';
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  channels: [],
  currentChannelId: null,
  loading: false,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch channels
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
        // Устанавливаем первый канал как текущий, если нет выбранного
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create channel
      .addCase(createChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload);
      })
      // Delete channel
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(channel => channel.id !== action.payload);
        // Если удалили текущий канал, выбираем первый доступный
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = state.channels.length > 0 ? state.channels[0].id : null;
        }
      })
      // Rename channel
      .addCase(renameChannel.fulfilled, (state, action) => {
        const index = state.channels.findIndex(channel => channel.id === action.payload.id);
        if (index !== -1) {
          state.channels[index] = action.payload;
        }
      });
  },
});

export const { setCurrentChannel, clearError } = channelsSlice.actions;
export default channelsSlice.reducer;
