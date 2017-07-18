import registerTemplate from './register.html';

class RegisterController {
  constructor($location, registerService, toastService) {
    'ngInject';

    this.$location = $location;
    this.registerService = registerService;
    this.toastService = toastService;
    this.user = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    };
  }

  registerUser() {
    if (!this.user
      || !this.user.firstname
      || !this.user.lastname
      || !this.user.email
      || !this.user.password) {

      this.toastService.toast('Provide all user information to register');
    }

    this.registerService.registerUser(this.user)
      .then(() => {
        this.toastService.toast('Successfully registered');
        this.$location.path('/login');
      })
      .catch((err) => {
        this.toastService.toast(err);
      });
  }
}

export function RegisterComponent() {
  return {
    template: registerTemplate,
    controller: RegisterController,
    controllerAs: 'vm'
  };
}
