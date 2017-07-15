class NavbarController {
    constructor($location, authService) {
        'ngInject';

        this.$location = $location;
        this.authService = authService;
    }

    userLoggedIn() {
        return this.authService.isUserLoggedIn();
    };

    goLogin() {
        this.$location.path('/login');
    };

    goRegister() {
        this.$location.path('/register');
    };

    logout() {
        this.authService.logoutUser();
    };
}

export function NavbarComponent() {
    return {
        templateUrl: 'static/app/navbar/navbar.html',
        controller: NavbarController,
        controllerAs: 'vm'
    }
}