import { createSlice } from '@reduxjs/toolkit'

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpen: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => ({
      isOpen: true,
      type: payload.type,
      channelId: payload.channelId || null,
    }),
    closeModal: state => ({
      ...state,
      isOpen: false,
      type: null,
      channelId: null,
    }),
  },
})

export const { openModal, closeModal } = modalsSlice.actions
export const selectModals = state => state.modals
export default modalsSlice.reducer
