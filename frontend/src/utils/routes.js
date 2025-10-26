/* global process */
export const pages = {
  signup: () => '/signup',
  login: () => '/login',
  root: () => '/',
}

const verApi = process.env.API_VER || '/api/v1'

export const users = {
  login: () => `${verApi}/login`,
  signup: () => `${verApi}/signup`,
}

export const channels = {
  getAll: () => `${verApi}/channels`,
  post: () => `${verApi}/channels`,
  patch: channelId => `${verApi}/channels/${channelId}`,
  delete: channelId => `${verApi}/channels/${channelId}`,
}

export const messages = {
  getAll: () => `${verApi}/messages`,
  post: () => `${verApi}/messages`,
  patch: messageId => `${verApi}/messages/${messageId}`,
  delete: messageId => `${verApi}/messages/${messageId}`,
}
