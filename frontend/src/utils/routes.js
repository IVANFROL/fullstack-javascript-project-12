export const pages = {
  signup: () => '/signup',
  login: () => '/login',
  root: () => '/',
}

// Для RTK Query: возвращаем только относительные пути, так как baseUrl уже установлен
export const users = {
  login: () => '/login',
  signup: () => '/signup',
}

// Для RTK Query: возвращаем только относительные пути, так как baseUrl уже установлен
export const channels = {
  getAll: () => '/channels',
  post: () => '/channels',
  patch: channelId => `/channels/${channelId}`,
  delete: channelId => `/channels/${channelId}`,
}

export const messages = {
  getAll: () => '/messages',
  post: () => '/messages',
  patch: messageId => `/messages/${messageId}`,
  delete: messageId => `/messages/${messageId}`,
}
