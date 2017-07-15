export function Routing($routeProvider, $locationProvider) {
    'ngInject';

    $routeProvider
        .when('/', {
            template: '<landing></landing>'
        })
        .when('/register', {
            template: '<register></register>'
        })
        .when('/login', {
            template: '<login></login>'
        })
        .when('/protected', {
            template: '<protected></protected>',
            resolve: {
                requiresLogin: [(authService) => {
                    'ngInject';

                    authService.redirectIfNotAuthenticated();
                }]
            }
        })
        .otherwise({
            template: '<not-found></not-found>'
        });
    
    $locationProvider.html5Mode(true);
}