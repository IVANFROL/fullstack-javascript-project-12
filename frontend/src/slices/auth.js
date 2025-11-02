import { createSlice } from '@reduxjs/toolkit'
import { chatApi } from '../api/chatApi.js'

const getUserFromStorage = () => {
  const userData = localStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    setAuth: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload))
      return Object.assign(state, payload)
    },
    removeAuth: () => {
      localStorage.removeItem('user')
      return {
        username: null,
        token: null,
      }
    },
    initAuth: (state) => {
      const user = getUserFromStorage()
      if (user) {
        return Object.assign(state, user)
      }
      return state
    },
  },
  extraReducers: builder => builder
    .addMatcher(chatApi.endpoints.getChannels.matchRejected, (state, payload) => {
      if (payload.error.status === 401) {
        localStorage.removeItem('user')
        return {
          username: null,
          token: null,
        }
      }
    }),
})

export const selectAuth = state => state.auth
export const authActions = authSlice.actions
export const getStoredUser = () => getUserFromStorage()
export default authSlice.reducer
