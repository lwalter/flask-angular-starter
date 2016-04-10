(function () {
    'use strict';

    var deps = ['ErrorHelperService'];
    function serverError(ErrorHelperService) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            element.on('change', function () {
                ErrorHelperService.clearInputControlError(ctrl, scope);
            });
        }
    }

    angular.module('App').directive('serverError', serverError);
})();