.PHONY: setup build start test install lint

setup:
	npm ci
	cd frontend && npm ci

install:
	npm ci
	cd frontend && npm ci

build:
	npm run build

start:
	npm run start

test:
	npm test

lint:
	cd frontend && npx eslint .
