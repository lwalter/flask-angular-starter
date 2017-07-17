export function applicationRunConfig($rootScope, $location) {
    'ngInject';

    $rootScope.$on('$routeChangeError', (e, curr, prev, rejection) => {
        if (rejection === 'REQUIRES-LOGIN') {
            $location.path('/login')
        }
    })
}