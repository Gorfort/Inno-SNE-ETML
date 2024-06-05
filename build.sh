project_name='inno-sne-etml'
containers=('python' 'nodejs' 'db' 'phpmyadmin')

for container in "${containers[@]}"
do
    docker rm $project_name-$container-1
    docker rmi $project_name'_'$container
done
docker volume rm $project_name'_'dbdata