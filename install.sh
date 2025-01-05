#!/bin/bash

sudo apt update -y

set -o errexit
set -o nounset

IFS=$(printf '\n\t')
# Docker
sudo apt remove --yes docker docker-engine docker.io containerd runc || true
sudo apt update
sudo apt --yes --no-install-recommends install apt-transport-https ca-certificates
wget --quiet --output-document=- https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository --yes "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release --codename --short) stable"
sudo apt update
sudo apt --yes --no-install-recommends install docker-ce docker-ce-cli containerd.io
sudo usermod --append --groups docker "$USER"
sudo systemctl enable docker

# Docker Compose
sudo apt-get install docker-compose-plugin

# Git clone
sudo git clone "https://github.com/niklasfulle/chat-app.git"
cd chat-app
sudo git pull

# Deploy chat-app
sudo docker compose up
