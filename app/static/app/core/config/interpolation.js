export function interpolation($interpolateProvider) {
    'ngInject';
    
    // Change interpolation symbols to avoid conflicts with Jinja templating engine
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
}