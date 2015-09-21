(function () {
    angular.module('app.resolve', ['app.services'])
        .constant('countries', countries)
        .constant('states', states);

    countries.$inject = ['LookupService'];
    function countries (LookupService) {
        return LookupService.countries();
    }

    states.$inject = ['LookupService'];
    function states (LookupService) {
        return LookupService.states();
    }

})();
