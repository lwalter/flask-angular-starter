export function jwtInjectorFactory($injector, $location, $q) {
  'ngInject';

  const injector = {
    request: (config) => {
      config.headers = config.headers || {};

      const authService = $injector.get('authService');
      authService.setAuthHeaders(config);

      return config;
    },
    responseError: (response) => {
      const authService = $injector.get('authService');

      if (authService.isUserLoggedIn() && (response.status === 401 || response.status === 403)) {
        authService.clearLocalUser();
        $location.path('/login');
      }

      return $q.reject(response);
    }
  };

  return injector;
}
