(function () {
    'use strict';

    angular
        .module('app.features.address')
        .controller('AddressController', AddressController);

    /* @ngInject */
    function AddressController(logger, countries, physicalAddress, states) {
        var vm = this;

        vm.countries = countries;
        vm.physicalAddress = physicalAddress;
        vm.states = states;
        vm.save = save;
        vm.showErrors = false;
        vm.title = 'Admin';

        vm.activate = activate;

        function save(form) {
            vm.showErrors = true;

            if (form.$valid) {
                logger.info('valid');
            } else {
                logger.error('invalid');
            }
        }

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
