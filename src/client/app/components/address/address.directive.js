(function() {
    angular.module('app.components.address')
        .directive('address', addressDirective);

    function addressDirective() {
        return {
            require: 'ngModel',
            link: link,
            restrict: 'E',
            templateUrl: 'app/components/address/address.html',
            scope: {
                isPhysical: '=',
                showErrors: '=',
                states: '=',
                countries: '=',
                model: '='
            },
            controller: Address,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    /*@ngInject*/
    function link (scope, elem, attrs, ngModel) {
        scope.address = ngModel.$modelValue;
        scope.$watch('address',
            function(value) {
                ngModel.$setViewValue(value);
            });
    }

    /*@ngInject*/
    function Address($filter, logger, AddressService) {
        var vm = this;

        vm.filterNonForeignCountries = filterNonForeignCountries;
        vm.getZipCodePattern = getZipCodePattern;
        vm.getZipCodeLabel = getZipCodeLabel;
        vm.postOfficeBoxRegEx = /(\b[P|p]*(OST|ost)*\.*\s*[O|o|0]*(ffice|FFICE)*\.*\s*[B|b][O|o|0][X|x]\b)/;
        vm.resetPhysicalCountry = resetCountry;
        vm.save = save;
        vm.setPhysicalCountry = setCountry;

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

        function save(address) {
            vm.showErrors = true;

            if (vm.addressForm.$valid) {
                logger.info('valid form');
                AddressService.save(address)
                    .then(function(response) {
                        logger.info('Status: ' + response.status);
                        logger.success('Success');
                    })
                    .catch(function(error) {
                        console.log(error);
                        logger.error('error');
                    });
            } else {
                logger.error('invalid form');
            }
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
