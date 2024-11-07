#!/bin/bash
CONTAINERS=('db_container' 'pma_container' 'webshop_183-nodejs-1' 'webshop_183-vuejs-1' 'python_container')
IMAGES=('mysql:8.0.30' 'phpmyadmin:5.2.0' 'webshop_183_nodejs' 'webshop_183_vuejs' 'webshop_183_python')

for container in "${CONTAINERS[@]}"
do
    docker stop $container
    docker rm $container
done

for image in "${IMAGES[@]}"
do
    docker rmi $image
done

docker-compose up -d