(function () {
    'use strict';

    angular.module('app.services')
        .factory('AddressService', AddressService);

    AddressService.$inject = ['restService'];

    function AddressService(restService) {

        var resource = '/api/addresses';

        return {
            save: save
        };

        function save(form) {
            return restService.POST(resource, form);
        }
    }
})();
