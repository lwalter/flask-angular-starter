import homeTemplate from './home.html';

class HomeController {
  constructor(homeService, toastService) {
    'ngInject';

    this.homeService = homeService;
    this.toastService = toastService;
    this.message = '';

    this.homeService.getData()
      .then((data) => {
        this.message = data.message;
      })
      .catch((err) => {
        this.toastService.toast(err);
      });
  }
}

export function HomeComponent() {
  return {
    template: homeTemplate,
    controller: HomeController,
    controllerAs: 'vm'
  };
}
