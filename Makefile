all: rest
up:
	docker-compose up -d db
rest:
	docker-compose up -d --no-deps
reload:
	git pull origin master
	docker-compose up -d --no-deps --build web-service
migrate:
	docker-compose exec web-service npm run migrate
