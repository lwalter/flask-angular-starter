export function loginRoutingConfig($routeProvider) {
    'ngInject';

    $routeProvider.when('/login', { 
        template: '<login flex="auto"></login>'
    });
}