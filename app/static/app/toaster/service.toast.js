export class ToastService {
    constructor($mdToast, $rootScope) {
        'ngInject';
        
        this.$mdToast = $mdToast;
        this.$rootScope = $rootScope;
    }

    listenForWarningToast() {
        this.$rootScope.$on('httpError', function (event, eventData) {
            createWarningToast(eventData.message);
        });
    }

    propagateWarningToast(message) {
        this.$rootScope.$broadcast('httpError', {
            message: message
        });
    }

    createWarningToast(message) {
        this.$mdToast.show({
            template: '<toast></toast>',
            hideDelay: 6000,
            position: 'bottom left right',
            locals: {
                message: message
            }
        });
    } 
}