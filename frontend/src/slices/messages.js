import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { messages as messagesRoute } from '../utils/routes.js'
import { deleteChannel } from './channels.js'

const messagesAdapter = createEntityAdapter()

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ token, messageObj }) => {
    const response = await axios.post(
      messagesRoute.post(),
      messageObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  },
)

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (token) => {
    const response = await axios
      .get(messagesRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
  },
)

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => messagesAdapter
        .setAll(state, payload))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        const entitiesForDeleting = Object.entries(state.entities)
          .filter(([, { channelId }]) => channelId === payload.id)
          .map(([key]) => key)
        messagesAdapter.removeMany(state, entitiesForDeleting)
      })
  },
})

export const messagesSelectors = messagesAdapter.getSelectors(
  state => state.messages,
)

export const selectMessages = createSelector(
  [
    state => state.messages,
    state => state.channels,
  ],
  ({ entities }, { idSelectedChannel }) => {
    const neededMessages = Object.values(entities)
      .filter(({ channelId }) => channelId === idSelectedChannel)

    return neededMessages
  },
)

export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer
