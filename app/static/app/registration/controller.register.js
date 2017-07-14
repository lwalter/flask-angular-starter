(function () {
    'use strict';

    var deps = ['DataService', 'ErrorHelperService', '$location'];
    function registerController(DataService, ErrorHelperService, $location) {
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
                })
                .catch(function (error) {
                    ErrorHelperService.displayInputControlError(error.message, self.userRegisterForm);
                });
        };
    }

    registerController.$inject = deps;
    angular.module('App').controller('RegisterController', registerController);
})();