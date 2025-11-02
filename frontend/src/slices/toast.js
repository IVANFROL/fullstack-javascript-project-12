import { createSelector, createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi.js'

const initialState = {
  message: null,
}

const isRejectedAction = action => action.type.endsWith('rejected')

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isRejectedAction, (state, payload) => {
        // Skip 401 errors (handled by auth slice)
        if (payload.error?.status === 401) {
          return state
        }
        // Only show errors with proper error code
        const errorCode = payload.error?.data?.code || payload.error?.code || payload.error?.status
        if (!errorCode) {
          return state
        }
        return Object.assign(state, { message: { id: 1, code: errorCode } })
      })
      .addMatcher(chatApi.endpoints.createChannel.matchFulfilled, (state) => {
        return Object.assign(state, { message: { id: 0, code: 'CHANNEL_CREATED' } })
      })
      .addMatcher(chatApi.endpoints.renameChannel.matchFulfilled, (state) => {
        return Object.assign(state, { message: { id: 0, code: 'CHANNEL_RENAMED' } })
      })
      .addMatcher(chatApi.endpoints.deleteChannel.matchFulfilled, (state) => {
        return Object.assign(state, { message: { id: 0, code: 'CHANNEL_DELETED' } })
      })
  },
})

export const selectToastMessage = createSelector(
  state => state.toast,
  ({ message }) => message,
)

// export const selectToastMessage = (state) => state.toast.message;

export const toastActions = toastSlice.actions

export default toastSlice.reducer
