export function landingRoutingConfig($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    template: '<landing flex="auto"></landing>'
  });
}
