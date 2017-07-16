import { NavbarComponent } from './component.navbar.js';

const module = angular.module('App.navbar', [])
    .component('navbar', new NavbarComponent());

export default module.name;