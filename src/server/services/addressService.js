(function () {
    'use strict';
    var q = require('q');

    var self;

    function AddressService() {
        return self;
    }

    AddressService.insert = insert;

    module.exports = AddressService;

    function insert(body) {
        if (body.street1) {
            return q.when(true);
        }
    }
})();
