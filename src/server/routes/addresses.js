(function () {
    'use strict';

    module.exports = function (router, services) {
        router.post('/addresses', insert);

        function insert(req, res, next) {
            services.addressService.insert(req.body,
                function (err, data) {
                    if (err) {
                        return next('Error retrieving document: ' + err);
                    }
                    if (!data) {
                        res.status(404).send('Document not found');
                    } else {
                        res.send(data);
                    }
                });
        }
    };
})();
