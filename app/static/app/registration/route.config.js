export function registerRoutingConfig($routeProvider) {
  'ngInject';

  $routeProvider.when('/register', {
    template: '<register flex="auto"></register>'
  });
}
