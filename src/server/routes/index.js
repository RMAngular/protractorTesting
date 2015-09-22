/*globals require*/
(function () {

    function Routes() {
        var router = require('express').Router(),
            services = require('../services');

        require('./addresses')(router, services);

        return router;
    }

    module.exports = Routes;
})();
