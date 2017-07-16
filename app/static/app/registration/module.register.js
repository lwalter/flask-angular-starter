import { RegisterService } from './service.register.js';
import { RegisterComponent } from './component.register.js';
import { registerRoutingConfig } from './route.config.js';

const module = angular.module('App.register', [])
    .config(registerRoutingConfig)
    .service('registerService', RegisterService)
    .component('register', new RegisterComponent());

export default module.name;