/*globals require*/
(function () {
    'use strict';

    var addressService = require('./addressService');

    function Services() {
        return {
            // add services here
            addressService: addressService
        };
    }

    module.exports = Services;
})();
