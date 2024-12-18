srv=webpack-dev-demo
echo "项目名称$srv"
docker stop $srv
docker rm -f $srv
docker rmi -f $srv
docker build -t $srv .
docker-compose -f ~/DockerCompose/$srv/docker-compose.yml up -d
