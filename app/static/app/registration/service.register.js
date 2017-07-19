export class RegisterService {

  constructor($q, $http) {
    'ngInject';

    this.$q = $q;
    this.$http = $http;

    this.registerRoute = '/api/user/register';
  }

  registerUser(user) {
    if (!user || !user.email || !user.password || !user.firstname || !user.lastname) {
      throw new Error('No user object provided to register.');
    }

    const deferred = this.$q.defer();

    this.$http.post(this.registerRoute, user)
      .then((result) => {
        if (!result || result.status !== 201) {
          deferred.reject('We can\'t register you at this time');
        }

        deferred.resolve(result.data);
      })
      .catch((err) => {
        let errorMessage = 'We can\'t register you at this time';
        if (err.status === 409) {
          errorMessage = 'That email address is taken already';
        } else if (err.status === 400) {
          errorMessage = 'Something was wrong with the provided information';
        }

        deferred.reject(errorMessage);
      });

    return deferred.promise;
  }
}
