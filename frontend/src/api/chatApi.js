import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { channels as channelsRoute, messages as messagesRoute, users as usersRoutes } from '../utils/routes'

const getUserToken = () => {
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData).token : null
  }
  catch {
    return null
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || getUserToken()
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  tagTypes: ['Channel', 'Message'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => channelsRoute.getAll(),
      providesTags: ['Channel'],
    }),
    createChannel: builder.mutation({
      query: ({ channelName }) => ({
        url: channelsRoute.post(),
        method: 'POST',
        body: { name: channelName },
      }),
      invalidatesTags: ['Channel'],
    }),
    renameChannel: builder.mutation({
      query: ({ channelId, channelName }) => ({
        url: channelsRoute.patch(channelId),
        method: 'PATCH',
        body: { name: channelName },
      }),
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      query: channelId => ({
        url: channelsRoute.delete(channelId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
      transformResponse: (response, meta, arg) => ({ id: arg }),
    }),
    getMessages: builder.query({
      query: () => messagesRoute.getAll(),
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation({
      query: messageObj => ({
        url: messagesRoute.post(),
        method: 'POST',
        body: messageObj,
      }),
      invalidatesTags: ['Message'],
    }),
    login: builder.mutation({
      query: credentials => ({
        url: usersRoutes.login(),
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: credentials => ({
        url: usersRoutes.signup(),
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useLazyGetChannelsQuery,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useDeleteChannelMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useLoginMutation,
  useSignupMutation,
} = chatApi
