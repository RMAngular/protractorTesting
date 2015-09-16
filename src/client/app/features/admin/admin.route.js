(function() {
    'use strict';

    angular
        .module('app.features.admin')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/features/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    },
                    resolve: {
                        countries: getCountriesLookup,
                        physicalAddress: getPhysicalAddress,
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
    function getPhysicalAddress (LookupService) {
        return LookupService.physicalAddress();
    }

    /* @ngInject */
    function getStatesLookup (LookupService) {
        return LookupService.states();
    }
})();
