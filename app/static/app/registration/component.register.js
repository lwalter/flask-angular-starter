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
        dataService.post('/api/user/register', this.user)
            .then((data) => {
                this.$location.path('/');
            })
            .catch((error) => {
                errorHelperService.displayInputControlError(error.message, this.userRegisterForm);
            });
    };
}

export function RegisterComponent() {
    return {
        templateUrl: 'static/app/registration/register.html',
        controller: RegisterController,
        controllerAs: 'vm'
    }
}