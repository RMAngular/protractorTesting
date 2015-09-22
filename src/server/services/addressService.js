(function () {
    'use strict';
    var self;

    function AddressService() {
        return self;
    }

    AddressService.insert = insert;

    module.exports = AddressService;

    function insert(body) {
        if (body.address1) {
            return 'Address Saved';
        }
    }
})();
