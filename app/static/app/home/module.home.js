import { HomeComponent } from './component.home.js';
import { homeRoutingConfig } from './route.config.js';
import { HomeService } from './service.home.js';

const module = angular.module('App.home', [])
    .config(homeRoutingConfig)
    .service('homeService', HomeService)
    .component('home', new HomeComponent());

export default module.name;