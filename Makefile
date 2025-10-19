.PHONY: install build start

install:
	npm install
	cd frontend && npm install

build:
	npm run build

start:
	npm start
