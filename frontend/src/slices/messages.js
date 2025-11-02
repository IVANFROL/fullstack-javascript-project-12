import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi.js'

const messagesAdapter = createEntityAdapter()

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
      .addMatcher(chatApi.endpoints.getMessages.matchFulfilled, (state, { payload }) => messagesAdapter
        .setAll(state, payload))
      .addMatcher(chatApi.endpoints.deleteChannel.matchFulfilled, (state, { payload }) => {
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
