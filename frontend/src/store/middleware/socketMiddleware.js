import { addMessage } from '../slices/messagesSlice';

const socketMiddleware = (store) => (next) => (action) => {
  // Обрабатываем результат действия
  const result = next(action);

  // Если это действие отправки сообщения и оно успешно
  if (action.type === 'messages/sendMessage/fulfilled') {
    const { channelId, body, id, username, createdAt } = action.payload;
    
    // Добавляем сообщение в store
    store.dispatch(addMessage({
      channelId,
      message: {
        id,
        body,
        username,
        createdAt,
        channelId
      }
    }));
  }

  return result;
};

export default socketMiddleware;
