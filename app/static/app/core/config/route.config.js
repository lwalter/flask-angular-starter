export function coreRoutingConfig($routeProvider, $locationProvider) {
  'ngInject';

  $routeProvider.otherwise({ redirectTo: '/404' });
  $locationProvider.html5Mode(true);
}
