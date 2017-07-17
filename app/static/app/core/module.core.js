import angular from 'angular';

import { NotFoundComponent } from './404/component.404.js';
import { notFoundRoutingConfig } from './404/route.config.js';
import { coreRoutingConfig } from './config/route.config.js';
import { AuthService } from './auth/service.auth.js';
import { ToastService } from './toaster/service.toast.js';
import { applicationRunConfig } from './config/run.config.js';
import { jwtInjectorFactory } from './auth/factory.jwtInjector.js';
import { interceptorsConfig } from './config/interceptors.config.js';

const module = angular.module('App.core', [])
    .config(notFoundRoutingConfig)
    .config(coreRoutingConfig)
    .config(interceptorsConfig)
    .run(applicationRunConfig)
    .service('authService', AuthService)
    .service('toastService', ToastService)
    .factory('jwtInjector', jwtInjectorFactory)
    .component('notFound', new NotFoundComponent());

export default module.name;