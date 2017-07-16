export class HomeService {
    constructor($http, $q) {
        'ngInject';
        
        this.$http = $http;
        this.$q = $q;

        this.apiUri = '/api/protected';
    }

    getData() {
        
    }
}