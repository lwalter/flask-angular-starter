import { NotFoundComponent } from './404/component.404.js';
import { notFoundRoutingConfig } from './404/route.config.js';
import { coreRoutingConfig } from './config/route.config.js';
import { AuthService } from './auth/service.auth.js';
import { interpolation } from './config/interpolation.js';
import { ToastService } from './toaster/service.toast.js';

const module = angular.module('App.core', [])
    .config(notFoundRoutingConfig)
    .config(coreRoutingConfig)
    .config(interpolation)
    .service('authService', AuthService)
    .service('toastService', ToastService)
    .component('notFound', new NotFoundComponent());

export default module.name;