export function interceptorsConfig($httpProvider) {
    'ngInject';

    $httpProvider.interceptors.push('jwtInjector');
}