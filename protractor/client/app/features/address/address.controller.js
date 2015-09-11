(function () {
    'use strict';

    angular
        .module('app.features.address')
        .controller('AddressController', AddressController);

    AddressController.$inject = ['logger'];

    function AddressController(logger) {
        var vm = this;

        vm.save = save;
        vm.showErrors = false;

        function save() {
            vm.showErrors = true;

            if (vm.addressForm.$valid) {
                logger.info('valid');
            } else {
                logger.error('invalid');
            }
        }
    }
})();
