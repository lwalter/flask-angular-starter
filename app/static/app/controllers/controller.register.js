(function () {
    'use strict';

    var deps = ['DataService', '$location'];
    function registerController(DataService, $location) {
        var self = this;
        self.user = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        };

        self.registerUser = function () {
            DataService.post('/api/user/register', self.user)
                .then(function (data) {
                    $location.path('/');
                });
        };
    }

    registerController.$inject = deps;
    angular.module('App').controller('RegisterController', registerController)
})();