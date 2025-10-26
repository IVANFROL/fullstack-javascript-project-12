import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { channels as channelsRoute } from '../utils/routes.js'

const channelsAdapter = createEntityAdapter()

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios
      .get(channelsRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
  },
)

export const postNewChannel = createAsyncThunk(
  'channels/postNewChannel',
  async ({ token, channelName }) => {
    const response = await axios
      .post(channelsRoute.post(), { name: channelName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
  },
)

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ token, channelId, channelName }) => {
    const response = await axios
      .patch(channelsRoute.patch(channelId), { name: channelName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
  },
)

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async ({ token, channelId }) => {
    const response = await axios
      .delete(channelsRoute.delete(channelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
  },
)

const initialState = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => Object
      .assign(state, { idSelectedChannel: payload }),
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.setAll,
    setNewNameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      })
    },
    removeChannelById: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload)
        if (state.idSelectedChannel === null) {
          return Object.assign(state, {
            idSelectedChannel: payload[0].id,
          })
        }
        return state
      })
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.removeOne(state, payload.id)
        if (state.idSelectedChannel === payload.id) {
          return Object.assign(state, {
            idSelectedChannel: '1',
          })
        }
        return state
      })
      .addCase(postNewChannel.fulfilled, (state, { payload }) => Object.assign(state, {
        idSelectedChannel: payload.id,
      }))
  },
})

export const selectCurrentChannelId = state => state.channels.idSelectedChannel

export const channelsSelectors = channelsAdapter.getSelectors(
  state => state.channels,
)

export const selectCurrentChannel = (state) => {
  const id = state.channels.idSelectedChannel
  return channelsSelectors.selectById(state, id)
}

export const selectChannelById = id => state => channelsSelectors
  .selectById(state, id)

export const channelsActions = channelsSlice.actions
export default channelsSlice.reducer
