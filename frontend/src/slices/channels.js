import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi.js'

const channelsAdapter = createEntityAdapter()

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
      .addMatcher(chatApi.endpoints.getChannels.matchFulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload)
        if (state.idSelectedChannel === null) {
          return Object.assign(state, {
            idSelectedChannel: payload[0].id,
          })
        }
        return state
      })
      .addMatcher(chatApi.endpoints.deleteChannel.matchFulfilled, (state, { payload }) => {
        channelsAdapter.removeOne(state, payload.id)
        if (state.idSelectedChannel === payload.id) {
          return Object.assign(state, {
            idSelectedChannel: '1',
          })
        }
        return state
      })
      .addMatcher(chatApi.endpoints.createChannel.matchFulfilled, (state, { payload }) => Object.assign(state, {
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
