# Rollbar Setup Guide

## Настройка мониторинга ошибок с Rollbar

### 1. Создание аккаунта Rollbar

1. Перейдите на [rollbar.com](https://rollbar.com)
2. Создайте бесплатный аккаунт
3. Создайте новый проект "React App" или "JavaScript"
4. Скопируйте Access Token из настроек проекта

### 2. Настройка переменных окружения

Создайте файл `.env.local` в папке `frontend/`:

```bash
# Rollbar Configuration
VITE_ROLLBAR_ACCESS_TOKEN=your_access_token_here

# App Version (optional)
VITE_APP_VERSION=1.0.0
```

### 3. Функциональность

#### Автоматический мониторинг:
- ✅ **Необработанные ошибки JavaScript**
- ✅ **Необработанные отклонения промисов**
- ✅ **Ошибки React компонентов** (через ErrorBoundary)
- ✅ **Ошибки API запросов** (через Axios interceptors)

#### Ручное логирование:
- `logError(error, context)` - логирование ошибок
- `logWarning(message, context)` - логирование предупреждений
- `logInfo(message, context)` - логирование информации
- `logCritical(error, context)` - логирование критических ошибок

### 4. Тестирование

В режиме разработки доступен тестовый компонент с кнопками для проверки различных типов ошибок:

- **Test Error** - тестовая ошибка
- **Test Warning** - тестовое предупреждение
- **Test Info** - тестовое информационное сообщение
- **Test Critical** - тестовая критическая ошибка
- **Test Uncaught Error** - необработанная ошибка
- **Test Unhandled Rejection** - необработанное отклонение промиса

### 5. Деплой

При деплое на Render добавьте переменную окружения:

```
VITE_ROLLBAR_ACCESS_TOKEN=your_access_token_here
```

### 6. Мониторинг

После деплоя все ошибки будут автоматически отправляться в Rollbar. Вы получите уведомления о:

- Новых ошибках
- Повторяющихся ошибках
- Критических ошибках

### 7. Настройки уведомлений

В панели Rollbar можно настроить:
- Email уведомления
- Slack интеграции
- Webhook уведомления
- Фильтры по типу ошибок
- Группировку похожих ошибок

## Текущая конфигурация

- **Access Token**: `989f8f92af8e4659a2aa7ddbb5439b9e`
- **Environment**: `development` / `production`
- **Source Maps**: включены
- **Code Version**: `1.0.0`
