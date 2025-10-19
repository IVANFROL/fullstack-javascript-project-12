import Rollbar from 'rollbar';

// Конфигурация Rollbar
const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || '989f8f92af8e4659a2aa7ddbb5439b9e',
  environment: import.meta.env.MODE || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        // Опционально: можно добавить source maps для продакшена
        // source_map_url: 'https://your-domain.com/static/js/bundle.js.map'
      }
    }
  }
});

// Функция для логирования ошибок вручную
export const logError = (error, context = {}) => {
  rollbar.error(error, context);
};

// Функция для логирования предупреждений
export const logWarning = (message, context = {}) => {
  rollbar.warning(message, context);
};

// Функция для логирования информационных сообщений
export const logInfo = (message, context = {}) => {
  rollbar.info(message, context);
};

// Функция для логирования критических ошибок
export const logCritical = (error, context = {}) => {
  rollbar.critical(error, context);
};

export default rollbar;
