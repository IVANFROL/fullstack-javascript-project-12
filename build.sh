#!/bin/bash

# Установка зависимостей фронтенда
echo "Installing frontend dependencies..."
cd frontend && npm install

# Сборка фронтенда
echo "Building frontend..."
npm run build

# Возвращаемся в корень
cd ..

# Копируем собранные файлы в build директорию для сервера
echo "Copying build files..."
rm -rf build
cp -r frontend/dist build

echo "Build completed successfully!"
