all: build stop start

build:
	sudo docker build --tag portfolio-site .

start:
	docker run --detach --name portfolio-site --publish "8080:8080" portfolio-site

stop:
	docker rm --force portfolio-site