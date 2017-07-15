import angular from 'angular';

export class AuthService {
    constructor($window, $q, $location, toastService) {
        'ngInject';

        this.$window = $window;
        this.$q = $q;
        this.$location = $location;
        this.toastService = toastService;
    }

    parseToken(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64));
    }

    isUserLoggedIn() {
        var userInfo = angular.fromJson(this.$window.localStorage.getItem('user'));
        return (angular.isObject(userInfo) && angular.isDefined(userInfo.token));
    }

    setLocalUser(token, firstname) {
        this.$window.localStorage.setItem('user', angular.toJson({
            token: token,
            firstname: firstname
        }));
    }

    setAuthHeaders(config) {
        var userInfo = angular.fromJson(this.$window.localStorage.getItem('user'));
        if (angular.isObject(userInfo) && angular.isDefined(userInfo.token)) {
            config.headers.Authorization = 'JWT ' + userInfo.token;
        }
    }

    clearLocalUser() {
        this.$window.localStorage.removeItem('user');
    }

    redirectIfNotAuthenticated() {
        var deferred = this.$q.defer();

        if (isUserLoggedIn()) {
            deferred.resolve();
        } else {
            $location.path('/login');
            this.toastService.propagateWarningToast('You must be logged in to do that.');
        }

        return deferred.promise;
    }

    skipIfAuthenticated() {
        var deferred = $q.defer();

        if (isUserLoggedIn()) {
            $location.path('/');
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }

    logoutUser() {
        var userInfo = angular.fromJson(this.$window.localStorage.getItem('user'));
        if (angular.isObject(userInfo) && angular.isDefined(userInfo.token)) {
            this.$window.localStorage.removeItem('user');
            this.$location.path('/');
        }
    }
}