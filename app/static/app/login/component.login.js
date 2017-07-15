import loginTemplate from './login.html';

class LoginController {
    constructor($location, dataService, authService) {
        'ngInject';

        this.dataService = dataService;
        this.$location = $location;
        this.authService = authService;
        this.user = {
            email: '',
            password: ''
        };
    }

    login() {
        this.dataService.post('/auth', this.user)
            .then((result) => {
                var parsedToken = this.authService.parseToken(result.access_token);
                this.authService.setLocalUser(result.access_token, parsedToken.firstname);
                this.$location.path('/');
            });
    };
}

export function LoginComponent() {
    return {
        template: loginTemplate,
        controller: LoginController,
        controllerAs: 'vm'
    }
}