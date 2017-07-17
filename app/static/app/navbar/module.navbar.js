import angular from 'angular';

import { NavbarComponent } from './component.navbar.js';

const module = angular.module('App.navbar', ['App.core'])
    .component('navbar', new NavbarComponent());

export default module.name;