(function() {
    'use strict';

    angular
        .module('app.features.address')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
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
                    title: 'Address'
                }
            }
        ];
    }
})();
