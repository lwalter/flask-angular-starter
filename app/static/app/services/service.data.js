export class DataService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
    }

    get(resource) {
        var deferred = this.$q.defer();

        this.$http.get(resource)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    post(resource, data) {
        var deferred = this.$q.defer();

        this.$http.post(resource, data)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    remove(resource) {
        var deferred = this.$q.defer();

        this.$http.delete(resource)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    put(resource, data) {
        var deferred = this.$q.defer();

        this.$http.put(resource, data)
            .then((response) => {
                deferred.resolve(response.data);
            })
            .catch((error) => {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
}