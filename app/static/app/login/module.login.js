import angular from 'angular';

import { LoginService } from './service.login.js';
import { LoginComponent } from './component.login.js';
import { loginRoutingConfig } from './route.config.js';

const module = angular.module('App.login', ['App.core'])
  .config(loginRoutingConfig)
  .service('loginService', LoginService)
  .component('login', new LoginComponent());

export default module.name;
