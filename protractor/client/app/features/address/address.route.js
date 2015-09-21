(function() {
    'use strict';

    angular
        .module('app.features.address')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'address',
                config: {
                    url: '/address',
                    templateUrl: 'app/features/address/address.html',
                    controller: 'AddressController',
                    controllerAs: 'vm',
                    title: 'Address',
                    resolve: {
                        countries: getCountriesLookup,
                        states: getStatesLookup

                    }
                }
            }
        ];
    }

    /* @ngInject */
    function getCountriesLookup (LookupService) {
        return LookupService.countries();
    }

    /* @ngInject */
    function getStatesLookup (LookupService) {
        return LookupService.states();
    }
})();
