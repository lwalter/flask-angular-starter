import navbarTemplate from './navbar.html';

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
        template: navbarTemplate,
        controller: NavbarController,
        controllerAs: 'vm'
    }
}