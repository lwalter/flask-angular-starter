import registerTemplate from './register.html';

class RegisterController {
    constructor($location, dataService, errorHelperService) {
        'ngInject';

        this.$location = $location;
        this.dataService = dataService;
        this.errorHelperService = errorHelperService;

        this.user = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        };
    }
    
    registerUser() {
        this.dataService.post('/api/user/register', this.user)
            .then((data) => {
                this.$location.path('/');
            })
            .catch((error) => {
                this.errorHelperService.displayInputControlError(error.message, this.userRegisterForm);
            });
    };
}

export function RegisterComponent() {
    return {
        template: registerTemplate,
        controller: RegisterController,
        controllerAs: 'vm'
    }
}