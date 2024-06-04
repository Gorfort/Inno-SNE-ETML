project_name='inno-sne-etml'
containers=('algo' 'back' 'mysql' 'phpmyadmin')

for container in "${containers[@]}"
do
    docker stop $project_name-$container-1
    docker rm $project_name-$container-1
    docker rmi $project_name'_'$container
done