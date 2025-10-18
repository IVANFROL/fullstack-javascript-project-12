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

Приложение будет доступно по адресу http://localhost:5001

## Деплой

Проект настроен для деплоя на Render.com:
- Build Command: `npm run build`
- Start Command: `npm start`

## Ссылка на задеплоенное приложение

После деплоя на Render ссылка будет добавлена здесь.