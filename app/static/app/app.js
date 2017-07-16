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
    ])
    .config(['$httpProvider', function ($httpProvider) {
        'ngInject';
        $httpProvider.interceptors.push(function ($window, $q, $location, $injector) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    var AuthService = $injector.get('authService');
                    AuthService.setAuthHeaders(config);

                    return config;
                },
                responseError: function (response) {
                    var AuthService = $injector.get('authService');
                    var message = response.data.description;

                    if (AuthService.isUserLoggedIn() && (response.status === 401 || response.status === 403)) {
                        AuthService.clearLocalUser();
                        $location.path('/login');
                        message = 'You must be logged in to do that.';
                    }

                    if (angular.isDefined(message)) {
                        var ToastService = $injector.get('toastService');
                        ToastService.propagateWarningToast(message);
                    }

                    return $q.reject(response);
                }
            };
        });
    }]);
    // .run(['toastService', function (toastService) {
    //     toastService.listenForWarningToast();
    // }]);