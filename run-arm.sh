#!/bin/bash

# Container and image names
CONTAINER_NAME="int-be-development"
IMAGE_NAME="277707103873.dkr.ecr.ap-southeast-3.amazonaws.com/int-be:latest"

# Reset QEMU for multi-platform support
echo "Initializing QEMU for multi-architecture support..."
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# Check if the container already exists
if docker ps -a --filter "name=$CONTAINER_NAME" | grep -q $CONTAINER_NAME; then
  echo "Stopping and removing existing container..."
  docker stop $CONTAINER_NAME  # Stop the running container
  docker rm $CONTAINER_NAME    # Remove the container
else
  echo "Container not found."
fi

# Rebuild the image every time
echo "Rebuilding the Docker image..."
docker buildx build --platform linux/arm64 -t $IMAGE_NAME -f .devops/Dockerfile --load .

# Start the container again (new or recreated)
echo "Starting the container..."
docker run -dit --platform linux/arm64 --name $CONTAINER_NAME -p 3006:3006 $IMAGE_NAME

# Verify if the container started correctly
docker ps -a | grep $CONTAINER_NAME
if [ $? -eq 0 ]; then
  echo "Container started successfully with image: $IMAGE_NAME"
else
  echo "The container is not running. Checking logs..."
  docker logs $CONTAINER_NAME
  exit 1
fi