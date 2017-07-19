import angular from 'angular';

export class AuthService {
  constructor($window, $q, $location) {
    'ngInject';

    this.$window = $window;
    this.$q = $q;
    this.$location = $location;

    this.userKey = 'user';
  }

  ensureLoggedIn() {
    const deferred = this.$q.defer();

    if (this.isUserLoggedIn()) {
      deferred.resolve();
    } else {
      deferred.reject('REQUIRES-LOGIN');
    }

    return deferred.promise;
  }

  isUserLoggedIn() {
    const userInfo = angular.fromJson(this.$window.localStorage.getItem(this.userKey));
    return (angular.isObject(userInfo) && angular.isDefined(userInfo.token));
  }

  setAuthHeaders(config) {
    const userInfo = angular.fromJson(this.$window.localStorage.getItem(this.userKey));
    if (angular.isObject(userInfo) && angular.isDefined(userInfo.token)) {
      config.headers.Authorization = 'JWT ' + userInfo.token;
    }
  }

  logoutUser() {
    const userInfo = angular.fromJson(this.$window.localStorage.getItem(this.userKey));
    if (angular.isObject(userInfo) && angular.isDefined(userInfo.token)) {
      this.clearLocalUser();
      this.$location.path('/');
    }
  }

  clearLocalUser() {
    this.$window.localStorage.removeItem(this.userKey);
  }

  parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return angular.fromJson(this.$window.atob(base64));
  }

  setLocalUser(token, firstname) {
    this.$window.localStorage.setItem(this.userKey, angular.toJson({
      token: token,
      firstname: firstname
    }));
  }
}
