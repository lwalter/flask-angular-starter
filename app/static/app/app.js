import angular from 'angular';
import { Routing } from './config/routeConfig.js';
import { Interpolation } from './config/interpolation.js';
import { AuthService } from './auth/service.auth.js';
import { ToastService } from './toaster/service.toast.js';
import { ToastComponent } from './toaster/component.toast.js';
import { LandingComponent } from './landing/component.landing.js';
import { LoginComponent } from './login/component.login.js';
import { DataService } from './services/service.data.js';
import { ErrorHelperService } from './services/service.errorHelper.js';
import { RegisterComponent } from './registration/component.register.js';
import { NotFoundComponent } from './404/component.404.js';
import { NavbarComponent } from './navbar/component.navbar.js';
import { HomeComponent } from './home/component.home.js';
import { ServerErrorDirective } from './directives/directive.serverError.js';

angular.module('App', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .config(Routing)
    .config(Interpolation)
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
    }])
    .service('authService', AuthService)
    .service('toastService', ToastService)
    .service('dataService', DataService)
    .service('errorHelperService', ErrorHelperService)
    .component('notFound', new NotFoundComponent())
    .component('toast', new ToastComponent())
    .component('landing', new LandingComponent())
    .component('login', new LoginComponent())
    .component('register', new RegisterComponent())
    .component('navbar', new NavbarComponent())
    .component('home', new HomeComponent())
    .directive('serverError', ServerErrorDirective)
    .run(['toastService', function (toastService) {
        toastService.listenForWarningToast();
    }]);