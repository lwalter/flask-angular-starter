import navbarTemplate from './navbar.html';

class NavbarController {
    constructor($location, authService) {
        'ngInject';

        this.$location = $location;
        this.authService = authService;
    }

    isUserLoggedIn() {
        return this.authService.isUserLoggedIn();
    };

    navTo(url) {
        this.$location.path(url);
    }

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