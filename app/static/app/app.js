import angular from 'angular';

import CoreModule from './core/module.core.js';
import NavbarModule from './navbar/module.navbar.js';
import LandingModule from './landing/module.landing.js';
import LoginModule from './login/module.login.js';
import RegisterModule from './registration/module.register.js';
import HomeModule from './home/module.home.js';

angular.module('App', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  CoreModule,
  NavbarModule,
  LandingModule,
  LoginModule,
  RegisterModule,
  HomeModule
]);
