(function() {
    angular
        .module('app.services')
        .factory('AddressService', AddressService);

    AddressService.$inject = ['$q'];

    function AddressService($q) {
        return {
            save: save
        };

        function save(data) {
            return $q.when({status: 200});
        }
    }
})();
