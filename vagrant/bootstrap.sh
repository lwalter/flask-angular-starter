#!/usr/bin/env bash

# Setup env vars
APP_SETTINGS=config.Development
SECRET_KEY=SOME-sUpEr-SeCrEt-KeY
DATABASE_URL="sqlite:////app/app.db"
echo "export APP_SETTINGS='$APP_SETTINGS'" >> /home/vagrant/.profile
echo "export SECRET_KEY='$SECRET_KEY'" >> /home/vagrant/.profile
echo "export DATABASE_URL='$DATABASE_URL'" >> /home/vagrant/.profile
source /home/vagrant/.profile

# Install aptitude packages, node
add-apt-repository -y ppa:chris-lea/node.js
apt-get -y update
apt-get -y install python-dev python3-dev libffi-dev g++ nodejs sqlite git

# Install pip, bower, and dependencies
curl -s https://bootstrap.pypa.io/get-pip.py --output get-pip.py
python get-pip.py
pip install cffi
pip install virtualenv

cd /app
virtualenv -p /usr/bin/python3.4 env
env/bin/pip install -U pip
env/bin/pip install -r requirements.txt
npm install -g gulp
npm install -g bower
npm install
bower install --allow-root

# Migrate the db
env/bin/python manage.py db upgrade