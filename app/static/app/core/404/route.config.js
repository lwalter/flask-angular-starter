export function notFoundRoutingConfig($routeProvider) {
    'ngInject';

    $routeProvider.when('/404', { 
        template: '<not-found flex="auto"></not-found>'
    });
}