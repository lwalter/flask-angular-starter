import homeTemplate from './home.html';

class HomeController {
    constructor(homeService) {
        'ngInject';
        
        this.homeService = homeService;
        this.homeService.getData();
    }
}

export function HomeComponent() {
    return {
        template: homeTemplate,
        controller: HomeController,
        controllerAs: 'vm'
    }
}