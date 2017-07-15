export function ServerErrorDirective() {
    'ngInject';

    return {
        restrict: 'A',
        require: '?ngModel',
        link: link
    }

    function link(scope, element, attrs, ctrl) {
        element.on('change', function () {
            errorHelperService.clearInputControlError(ctrl, scope);
        });
    }
}