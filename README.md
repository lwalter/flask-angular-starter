# Flask-Angular-Starter
Start your next hackathon or side project with the initial cruft out of the way. In this project you will find an opinionated, responsive, SPA front end application built with AngularJS and Material Design. This application speaks to a Python Flask REST API backend. No more will you have to suffer the monotony of implementing yet another user authentication system for your new projects, as this repo sets you up with both registration and login using JSON Web Tokens. Forget about the annoying and verbose web service code and expand the applications capabilities easily and succinctly with Python and Flask.

## Application stack and tools
Framework/tool | Description
----------------- | -----------------
[Flask](http://flask.pocoo.org/) | Backend micro-framework. Parses and handles HTTP requests.
[Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.1/) | Data layer abstraction to help you with your CRUD operations.
[Flask-Restful](http://flask-restful-cn.readthedocs.org/en/0.3.4/) | Flask extension to support REST API construction.
[Flask-Jwt](https://pythonhosted.org/Flask-JWT/) | JSON Web Token library to handle stateless authentication.
[Flask-Bcrypt](https://flask-bcrypt.readthedocs.org/en/latest/) | Encryption library for generating password hashes, keep your users safe.
[Flask-Migrate](https://flask-migrate.readthedocs.org/en/latest/) | Library to handle SQLAlchemy database migrations.
[AngularJs](https://angularjs.org/) | Frontend framework for rich, dynamic user interfaces.
[Angular-Material](https://material.angularjs.org/latest/) | Angular library implementing Material Design.
[SQLite](https://www.sqlite.org/) | Store your data in a serverless database (should not be used for production).
[Vagrant](https://www.vagrantup.com/) | Run and develop your application within a lightweight virtual environment.
[NPM](https://www.npmjs.com/) | Manage Nodejs packages.
[Webpack](https://webpack.js.org/) | Generate front end builds for both development and production environments.

## Setting up and running
* Download and install both [git](https://git-scm.com/downloads) and [Vagrant](https://www.vagrantup.com/downloads.html).
* Run the following commands in a shell of your choosing...
1. Environment setup
```sh
git clone https://github.com/lwalter/flask-angular-starter.git
cd vagrant
vagrant up
```
2. Building the UI (in one terminal)
```sh
cd vagrant
vagrant ssh
cd /app
npm run watch # Runs webpack in watch mode, changes to front end files will trigger a rebuild
```
3. Running the flask back end (in a separate terminal)
```sh
cd vagrant
vagrant ssh
cd /app
env/bin/python3 run.py
```
* Open a browser and navigate to localhost:5000

## Things to know
### Environment
* Host port 5000 is forwarded to guest port 5000 to provide access the application residing on the Vagrant VM.
* The repository on the host will be shared to `/app` of the guest environment.
* A Python virtualenv will be created in the `/app` directory called `env`.

### Packages
* Python packages can be installed by running `/app/env/bin/pip install <package name>`.
* Node packages can be installed by running `npm install <package name>`.

### Schema
* After modifying any database entities, run `env/bin/python3 manage.py db migrate`. This will add a new migration entry to `migrations/versions`.

### Front end builds
* CSS, HTML partials, images, fonts, etc will be picked up by the webpack pipeline.
* Code-splitting is used to help with asset downloads (dependencies in one bundle and app code in another).
* Built assets are ouput to ```<project root>/app/static/dist```.
* ```npm run build``` runs a single development build of the front end application.
* ```npm run watch``` runs a development build of the front end application in watch mode. Changes to any of the code in ```<project root>/app/static/app``` trigger a rebuild.
* ```npm run prod``` runs a production build of the front end application.

## Where the heck is everything?
```
./app
├── core # Shared db model mixins
├── extensions.py # App extension configuration
├── factory.py # Factory to generate flask app instances
├── home # Index and home api methods
├── static
│   ├── app # AngularJS app
│   │   ├── app.js # Main application entry point
│   │   ├── core # Core configuration, ui, and common functionality
│   │   ├── dependencies.js # App code dependencies import file
│   │   ├── home # Home page
│   │   ├── index.ejs # Main HTML template
│   │   ├── landing # Landing page
│   │   ├── login # User login
│   │   ├── navbar # Navigation bar
│   │   └── registration # User registration
│   └── dist # Output ui app assets
├── templates # Flask templates directory (not used)
└── user # User models and api methods
```

## Contributing
* Issue tracking
    * For any proposed features or bugs, please open an issue to allow for tracking of the item.

* Submitting changes
    * Fork the repository and switch to a new branch with `git checkout -b <branch-name>`
    * Make all necessary changes and submit a new pull request. Please provide detailed information to help facilitate understanding of the changes. Reference the issue that the pull request applies to.

## License
[MIT](LICENSE) Luke Walter
