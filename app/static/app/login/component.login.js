import loginTemplate from './login.html';

class LoginController {
  constructor($location, loginService, toastService) {
    'ngInject';

    this.$location = $location;
    this.loginService = loginService;
    this.toastService = toastService;
    this.user = {
      email: '',
      password: ''
    };
  }

  login() {
    if (!this.user || !this.user.email || !this.user.password) {
      this.toastService.toast('Provide an email and password to login with');
    }

    this.loginService.login(this.user)
      .then(() => {
        this.$location.path('/home');
      })
      .catch((err) => {
        this.toastService.toast(err);
      });
  }
}

export function LoginComponent() {
  return {
    template: loginTemplate,
    controller: LoginController,
    controllerAs: 'vm'
  };
}
