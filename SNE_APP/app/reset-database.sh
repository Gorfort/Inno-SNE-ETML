docker container stop db
docker container rm db
docker image rm db:v1.0.0
docker volume rm db_data

cd ../..
docker build -t db:v1.0.0 .
docker run --name db -d -p "3306:3306" -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_esn_social_network -v db_data:/var/lib/mysql db:v1.0.0
