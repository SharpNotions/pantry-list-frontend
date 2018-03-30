#!/bin/bash
set -e

echo "create docker file"
echo  -en "FROM sharpnotionsllc/pantry-list-frontend:${DRONE_BUILD_NUMBER} \nEXPOSE 80" &> Dockerfile
echo "DockerFile Created"
