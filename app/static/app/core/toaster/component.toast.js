import './warning-toast.css';
import warningToastTemplate from './warning-toast.html';

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
        template: warningToastTemplate,
        controller: ToastController,
        controllerAs: 'vm'
    }
}