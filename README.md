### Hexlet tests and linter status:
[![Actions Status](https://github.com/IVANFROL/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/IVANFROL/fullstack-javascript-project-12/actions)

## Описание проекта

Полнофункциональное веб-приложение с React фронтендом и Node.js сервером.

## Структура проекта

- `frontend/` - React приложение, созданное с помощью Vite
- `package.json` - корневой npm пакет с зависимостями
- `Makefile` - команды для сборки и запуска

## Установка и запуск

1. Установите зависимости:
```bash
npm install
cd frontend && npm install
```

2. Соберите проект:
```bash
make build
```

3. Запустите сервер:
```bash
make start
```

Приложение будет доступно по адресу http://localhost:5173 (разработка) или через деплой

## Деплой

Проект настроен для деплоя на Render.com:
- Build Command: `npm run build`
- Start Command: `npm start`

## Ссылка на задеплоенное приложение

🚀 **Приложение доступно по адресу:** https://fullstack-javascript-project-12-7o0o.onrender.com

## Мониторинг ошибок

Проект интегрирован с [Rollbar](https://rollbar.com) для мониторинга ошибок в продакшене:
- Автоматический перехват необработанных ошибок JavaScript
- Мониторинг ошибок React компонентов через ErrorBoundary
- Логирование ошибок API запросов
- Уведомления о критических ошибках

## Тестирование

Проект проходит автоматизированные тесты с помощью Playwright:
- ✅ Установка зависимостей: `make install`
- ✅ Сборка проекта: `make build`
- ✅ Запуск сервера: `make start`
- ✅ Интернационализация (русская локаль)
- ✅ Фильтрация нецензурных слов
- ✅ Мониторинг ошибок с Rollbar
