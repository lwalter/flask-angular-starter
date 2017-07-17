export class ToastService {
    constructor($mdToast) {
        'ngInject';

        this.$mdToast = $mdToast;
    }

    toast(message) {
        const toast = this.$mdToast.simple()
            .textContent(message)
            .position('top right');
        
        this.$mdToast.show(toast);
    }
}