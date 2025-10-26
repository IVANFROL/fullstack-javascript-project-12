import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
}

const isRejectedAction = action => action.type.endsWith('rejected')
const isFulfilledAction = action => action.type.endsWith('fulfilled')

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(isRejectedAction, (state, payload) => Object
        .assign(state, { message: { id: 1, code: payload.error.code } }))
      .addMatcher(isFulfilledAction, (state, payload) => {
        switch (true) {
          case /postNewChannel/.test(payload.type):
            return Object.assign(state, { message: { id: 0, code: 'CHANNEL_CREATED' } })
          case /renameChannel/.test(payload.type):
            return Object.assign(state, { message: { id: 0, code: 'CHANNEL_RENAMED' } })
          case /deleteChannel/.test(payload.type):
            return Object.assign(state, { message: { id: 0, code: 'CHANNEL_DELETED' } })
          default:
            break
        }
        return state
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
