#!/usr/bin/env bash

# Setup env vars
APP_SETTINGS=config.Development
SECRET_KEY=SOME-sUpEr-SeCrEt-KeY
DATABASE_URL="sqlite:////app/app.db"
echo "export APP_SETTINGS='$APP_SETTINGS'" >> /home/vagrant/.profile
echo "export SECRET_KEY='$SECRET_KEY'" >> /home/vagrant/.profile
echo "export DATABASE_URL='$DATABASE_URL'" >> /home/vagrant/.profile
source /home/vagrant/.profile

# Install aptitude packages, node, pip, and dependencies
apt-get -y update && apt-get -y upgrade
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get -y install python-dev python3-dev libffi-dev g++ sqlite git nodejs python3-pip

pip3 install cffi
pip3 install virtualenv

cd /app
virtualenv -p /usr/bin/python3 env
env/bin/pip3 install -U pip
env/bin/pip3 install -r requirements.txt
npm install

# Migrate the db
env/bin/python3 manage.py db upgrade