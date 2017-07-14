(function () {
    'use strict';

    var deps = ['AuthService', '$location'];
    function navbarController(AuthService, $location) {
        var self = this;

        self.userLoggedIn = function () {
            return AuthService.isUserLoggedIn();
        };

        self.goLogin = function () {
            $location.path('/login');
        };

        self.goRegister = function () {
            $location.path('/register');
        };

        self.logout = function () {
            AuthService.logoutUser();
        };
    }

    navbarController.$inject = deps;
    angular.module('App').controller('NavbarController', navbarController);
})();