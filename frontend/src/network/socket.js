import { io } from 'socket.io-client'
import { channelsActions } from '../slices/channels.js'
import { messagesActions } from '../slices/messages.js'

let socket = null

export const initSocket = (dispatch) => {
  socket = io()

  socket
    .on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload))
    })
    .on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload))
    })
    .on('renameChannel', (payload) => {
      dispatch(channelsActions.setNewNameChannel(payload))
    })
    .on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannelById(payload))
    })

  return socket
}

export const getSocket = () => socket
