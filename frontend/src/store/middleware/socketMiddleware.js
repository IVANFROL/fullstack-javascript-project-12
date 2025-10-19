// WebSocket отключен, middleware не нужен
const socketMiddleware = (store) => (next) => (action) => {
  // Просто передаем действие дальше без обработки
  return next(action);
};

export default socketMiddleware;
