import angular from 'angular';

export class LoginService {

    constructor($q, $http, $window, authService) {
        'ngInject';

        this.$q = $q;
        this.$http = $http;
        this.$window = $window;
        this.authService = authService;

        this.loginRoute = '/auth';
    }

    login(user) {
        if (!user || !user.email || !user.password) {
            throw new Error('No user object provided to login.');
        }

        const deferred = this.$q.defer();

        this.$http.post(this.loginRoute, user)
            .then((result) => {
                if (!result.data || !result.data.access_token) {

                }

                const parsedToken = this.authService.parseToken(result.data.access_token);
                this.authService.setLocalUser(result.data.access_token, parsedToken.firstname);

                deferred.resolve(parsedToken.firstname);
            })
            .catch((err) => {
                let errorMessage = 'We can\'t log you in at this time';
                if (err.status === 401) {
                    errorMessage = 'Incorrect email and password';
                } else if (err.status === 400) {
                    errorMessage = 'Something was wrong with the provided information';
                }

                deferred.reject(errorMessage);
            });

        return deferred.promise;
    }
}