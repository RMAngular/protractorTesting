(function () {
    'use strict';

    angular
        .module('app.features.admin')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController(logger, countries, states) {
        var vm = this;

        vm.countries = countries;
        vm.states = states;
        vm.showErrors = false;
        vm.title = 'Admin';

        vm.activate = activate;

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
