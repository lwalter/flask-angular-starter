(function () {
    'use strict';

    function errorHelperSrvc() {
        return {
            displayInputControlError: displayInputControlError,
            clearInputControlError: clearInputControlError
        };

        function displayInputControlError(errorMsgs, form) {
            if (angular.isDefined(errorMsgs) && angular.isDefined(form)) {
                var errorKeys = Object.keys(errorMsgs);

                for (var i = 0; i < errorKeys.length; i++) {
                    if (errorKeys[i] in form) {
                        form[errorKeys[i]].serverError = errorMsgs[errorKeys[i]];
                        form[errorKeys[i]].$setValidity('server', false);
                    }
                }
            }
        }

        function clearInputControlError(ctrl, scope) {
            if (angular.isDefined(ctrl.serverError)) {
                delete ctrl.serverError;
                scope.$apply(ctrl.$setValidity('server', true));
            }
        }
    }

    angular.module('App').factory('ErrorHelperService', errorHelperSrvc);
})();