(function () {
    'use strict';

    var deps = ['$http', '$q'];
    function dataService($http, $q) {
        return {
            get: get,
            post: post,
            remove: remove,
            put: put
        };

        function get(resource) {
            var deferred = $q.defer();

            $http.get(resource)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        function post(resource, data) {
            var deferred = $q.defer();

            $http.post(resource, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        function remove(resource) {
            var deferred = $q.defer();

            $http.delete(resource)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }

        function put(resource, data) {
            var deferred = $q.defer();

            $http.put(resource, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(error.data);
                });

            return deferred.promise;
        }
    }

    dataService.$inject = deps;
    angular.module('App').factory('DataService', dataService);
})();