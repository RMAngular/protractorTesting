/* jshint -W117, -W030 */
(function() {
    function BaseSpec(base) {
        'use strict';

        var OwnerPage = require('../app/components/address/address.e2e.pageObject'),

            ownerPage = new OwnerPage(base),
            pageData;

        pageData = {
            ownerPage: {
                physicalAddress1: '123 ABC Street',
                physicalCity: 'Denver',
                physicalState: 'Colorado',
                physicalZip: '12345'
            }
        };

        this.setBrowserWindow = function () {
            return browser.driver.manage().window().maximize();
        };

        this.ownerPageFill = function () {
            var data = pageData.ownerPage;

            ownerPage.physicalAddress1 = data.physicalAddress1;
            ownerPage.physicalCity = data.physicalCity;
            ownerPage.physicalState = data.physicalState;
            ownerPage.physicalZip = data.physicalZip;

            base.clickContinueButton();

            return base.resolvePromises();
        };

    }

    module.exports = BaseSpec;
})();
