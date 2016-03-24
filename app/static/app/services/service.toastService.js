(function () {
    'use strict';

    var deps = ['$mdToast', '$rootScope'];
    function toastService($mdToast, $rootScope) {
        return {
            propagateWarningToast: propagateWarningToast,
            listenForWarningToast: listenForWarningToast
        };

        function listenForWarningToast() {
            $rootScope.$on('httpError', function (event, eventData) {
                createWarningToast(eventData.message);
            });
        }

        function propagateWarningToast(message) {
            $rootScope.$broadcast('httpError', {
                message: message
            });
        }

        function createWarningToast(message) {
            $mdToast.show({
                templateUrl: '/static/views/warning-toast.html',
                controller: 'ToastController',
                controllerAs: '$ctrl',
                hideDelay: 6000,
                position: 'bottom left right',
                locals: {
                    message: message
                }
            });
        }
    }

    toastService.$inject = deps;
    angular.module('App').factory('ToastService', toastService);
})();