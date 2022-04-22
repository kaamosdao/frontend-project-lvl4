install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npm start --watch --verbose-watch

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

publish:npm 
	npm publish

deploy:
	git push heroku

heropush:
	git add .
	git commit -m $(ARGS)
	git push
	deploy

test:
	npm test -s

.PHONY: test
