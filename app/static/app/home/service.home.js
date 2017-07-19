export class HomeService {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;

    this.apiUri = '/api/protected';
  }

  getData() {
    const deferred = this.$q.defer();

    this.$http.get(this.apiUri)
      .then((res) => {
        deferred.resolve(res.data);
      })
      .catch(() => {
        deferred.reject('No data could be retrieved');
      });

    return deferred.promise;
  }
}
