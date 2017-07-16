import { LoginService } from './service.login.js';
import { LoginComponent } from './component.login.js';
import { loginRoutingConfig } from './route.config.js';

const module = angular.module('App.login', [])
    .config(loginRoutingConfig)
    .service('loginService', LoginService)
    .component('login', new LoginComponent());

export default module.name;