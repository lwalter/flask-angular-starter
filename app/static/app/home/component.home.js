import homeTemplate from './home.html';

class HomeController {
    constructor(dataService) {
        'ngInject';
        
        this.dataService = dataService;
        this.dataService.get('/api/protected')
            .then((result) => {
                console.log(result);
            });
    }
}

export function HomeComponent() {
    return {
        template: homeTemplate,
        controller: HomeController,
        controllerAs: 'vm'
    }
}