import angular from 'angular';

import { LandingComponent } from './component.landing.js';
import { landingRoutingConfig } from './route.config.js';

const module = angular.module('App.landing', [])
    .config(landingRoutingConfig)
    .component('landing', new LandingComponent());

export default module.name;