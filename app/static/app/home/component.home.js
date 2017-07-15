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
        templateUrl: 'static/app/home/home.html',
        controller: HomeController,
        controllerAs: 'vm'
    }
}