(function() {
    angular.module('app.components.address', [])
        .directive('address', addressDirective);

    function addressDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/address/address.html',
            scope: {
                isPhysical: '=',
                showErrors: '='
            },
            controller: Address,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    Address.$inject = ['$filter', 'LookupService'];

    /*@ngInject*/
    function Address($filter, LookupService) {
        var vm = this;

        vm.init = init;
        vm.filterNonForeignCountries = filterNonForeignCountries;
        vm.getZipCodePattern = getZipCodePattern;
        vm.getZipCodeLabel = getZipCodeLabel;
        vm.postOfficeBoxRegEx = /(\b[P|p]*(OST|ost)*\.*\s*[O|o|0]*(ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\b)/;
        vm.resetPhysicalCountry = resetCountry;
        vm.setPhysicalCountry = setCountry;

        function init() {
            vm.states = LookupService.states();
            vm.countries = LookupService.countries();
        }

        function filterNonForeignCountries(value) {
            return !(value.id === 'US' || value.id === 'UM' || value.id === 'CA');
        }

        function getZipCodePattern(address) {
            var state;

            if (address) {
                if (!address.stateId || !vm.states || address.isForeign) {
                    return;
                }

                state = $filter('filter')(vm.states, {id: address.stateId})[0];

                switch (state.country) {
                    case 'US':
                        return vm.config.regex.zipCode;

                    case 'CA':
                        return vm.config.regex.zipCodeCanada;

                    default:
                        return /.*/;
                }
            }
        }

        function getZipCodeLabel(stateId) {
            var state;

            if (!stateId || !vm.states) {
                return 'Postal Code';
            }

            state = $filter('filter')(vm.states, {id: stateId})[0];

            switch (state.country) {
                case 'CA':
                    return 'Postal Code';

                default:
                    return 'Zip/Postal Code';
            }
        }

        function resetCountry(address) {
            address.countryId = null;
        }

        function setCountry(address) {
            if (address) {
                var state = $filter('filter')(vm.states, {id: address.stateId});
                if (state && state.length >= 1) {
                    vm.owner.countryId = state[0].country;
                } else {
                    vm.owner.countryId = undefined;
                }
            }
        }
    }
})();
