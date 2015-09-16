(function () {
    'use strict';

    angular
        .module('app.features.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController(logger, countries, physicalAddress, states) {
        var vm = this;

        vm.countries = countries;
        vm.physicalAddress = physicalAddress;
        vm.states = states;
        vm.save = save;
        vm.showErrors = false;
        vm.title = 'Admin';

        vm.activate = activate;

        function save() {
            vm.showErrors = true;

            if (vm.addressForm.$valid) {
                logger.info('valid');
            } else {
                logger.info('invalid');
            }
        }

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
