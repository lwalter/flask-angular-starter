import './warning-toast.css';

class ToastController {
    constructor($mdToast, message) {
        'ngInject';

        this.$mdToast = $mdToast;
        this.message = message;
    }

    close() {
        this.$mdToast.hide();
    }
}

export function ToastComponent() {
    return {
        templateUrl: 'static/app/toaster/warning-toast.html',
        controller: ToastController,
        controllerAs: 'vm'
    }
}