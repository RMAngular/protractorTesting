(function () {
    'use strict';

    angular
        .module('app.features.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger) {
        var vm = this;

        vm.save = save;
        vm.showErrors = false;
        vm.title = 'Admin';

        vm.activate = activate;

        function save() {
            vm.showErrors = true;

            if (vm.addressForm.$valid) {
                logger.info('valid');
            }
        }

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
