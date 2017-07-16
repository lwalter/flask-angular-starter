export class LoginService {

    constructor($q, $http, $window) {
        'ngInject';

        this.$q = $q;
        this.$http = $http;
        this.$window = $window;

        this.userKey = 'user';
        this.loginRoute = '/auth';
    }

    parseToken(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return angular.fromJson(this.$window.atob(base64)); // TODO(lnw): double check this parsing function works
    }

    setLocalUser(token, firstname) {
        this.$window.localStorage.setItem(this.userKey, angular.toJson({
            token: token,
            firstname: firstname
        }));
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

                const parsedToken = this.parseToken(result.access_token);
                this.setLocalUser(result.access_token, parsedToken.firstname);

                // TODO(lnw) should this return the full parsed user?
                deferred.resolve(parsedToken);
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