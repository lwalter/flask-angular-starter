export function homeRoutingConfig($routeProvider) {
    'ngInject';

    $routeProvider.when('/home', { 
        template: '<home flex="auto"></home>',
        resolve: {
            requiresLogin: ['authService', (authService) => authService.ensureLoggedIn()]
        }
    });
}