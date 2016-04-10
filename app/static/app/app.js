(function () {
    'use strict';

    var appDeps = [
        'ngRoute',
        'ngMaterial',
        'ngMessages'
    ];
    var app = angular.module('App', appDeps);

    app.config(function ($interpolateProvider, $routeProvider, $locationProvider, $httpProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');

        // Route authentication resolution method wrappers
        function requiresLogin(AuthService) {
            return AuthService.redirectIfNotAuthenticated();
        }

        function skipIfLoggedIn(AuthService) {
            return AuthService.skipIfAuthenticated();
        }

        $routeProvider
            .when('/', {
                templateUrl: 'static/views/home.html'
            })
            .when('/register', {
                template: '<register></register>',
                resolve: {
                    'skipIfLoggedIn': skipIfLoggedIn
                }
            })
            .when('/login', {
                template: '<login></login>',
                resolve: {
                    'skipIfLoggedIn': skipIfLoggedIn
                }
            })
            .when('/protected', {
                template: '<protected></protected>',
                resolve: {
                    'requiresLogin': requiresLogin
                }
            })
            .otherwise({
                templateUrl: 'static/views/404.html'
            });

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push(function ($window, $q, $location, $injector) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    var AuthService = $injector.get('AuthService');
                    AuthService.setAuthHeaders(config);

                    return config;
                },
                responseError: function (response) {
                    var AuthService = $injector.get('AuthService');
                    var message = response.data.description;

                    if (AuthService.isUserLoggedIn() && (response.status === 401 || response.status === 403)) {
                        AuthService.clearLocalUser();
                        $location.path('/login');
                        message = 'You must be logged in to do that.';
                    }

                    if (angular.isDefined(message)) {
                        var ToastService = $injector.get('ToastService');
                        ToastService.propagateWarningToast(message);
                    }

                    return $q.reject(response);
                }
            };
        });
    });

    app.run(function (ToastService) {
        ToastService.listenForWarningToast();
    });
})();