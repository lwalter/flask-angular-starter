(function () {
    'use strict';

    var deps = ['DataService'];
    function protectedController (DataService) {
        var self = this;

        DataService.get('/api/protected')
            .then(function (result) {
                console.log(result);
            });
    }

    protectedController.$inject = deps;
    angular.module('App').controller('ProtectedController', protectedController);
})();