#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building frontend..."
npm run build

echo "Copying files for server..."
cd ..
rm -rf build
cp -r frontend/dist build

echo "Build completed successfully!"
