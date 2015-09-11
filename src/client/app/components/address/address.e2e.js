/*globals describe,it,beforeEach,browser,element,require,expect*/
var OwnerPage = require('./address.e2e.pageObject'),
    baseFunctions = require('../../../test-helpers/base'),
    baseSpecFunctions = require('../../../test-helpers/baseSpec');

describe('On: Owner Page', function() {
    'use strict';

    var base = new baseFunctions(),
        baseSpec = new baseSpecFunctions(base),
        ownerPage = new OwnerPage(base),

        fillInfo = function(phyAddress1, phyAddress2, phyCity, phyState, phyZipCode, phyCountry) {

            // clear promises
            base.clearPromises();

            ownerPage.physicalAddress1 = phyAddress1;
            ownerPage.physicalAddress2 = phyAddress2;
            ownerPage.physicalCity = phyCity;

            if (phyState) {
                ownerPage.physicalState = phyState;
            }

            ownerPage.physicalZip = phyZipCode;

            if (phyCountry) {
                ownerPage.physicalCountry = phyCountry;
            }

            return base.resolvePromises();
        };

    it('should have a title', function () {
        browser.get('http://localhost:9001/address');

        expect(browser.getTitle()).toEqual('protractorTesting: Address');
        expect(base.currentUrl).toContain('address');

    });

    describe('For: landing on to the owner page', function() {

        it('Should: validate empty fields', function() {
            ownerPage.clickSave().then(function() {

                expect(base.toasterIsPresent()).toBe(true);
                base.toasterClose().then(function() {
                    //expect(base.toasterIsPresent()).toBe(false);

                    expect(ownerPage.physicalAddress1Error.text).toBe('Required');
                    expect(ownerPage.physicalCityError.text).toBe('Required');
                    expect(ownerPage.physicalStateError.text).toBe('Required');
                    expect(ownerPage.physicalZipError.text).toBe('Required');
                });
            });
        });

        it('Should: remove errors when valid', function() {
            fillInfo('123 ABC Street', '#2', 'Denver', 'Alabama', '12345')
                .then(function() {
                    expect(ownerPage.physicalAddress1Error.isPresent).toBe(false);
                    expect(ownerPage.physicalCityError.isPresent).toBe(false);
                    expect(ownerPage.physicalStateError.isPresent).toBe(false);
                    expect(ownerPage.physicalZipError.isPresent).toBe(false);
                });
        });

        it('Should: validate that address line 1 cannot be a PO box', function() {
            var poBox = ['PO BOX', 'PO Box', 'P.O Box', 'PO. Box', 'P.O. BOX',
                    'P.O. Box', 'Po Box','pO Box', 'po Box', 'po box', 'Post OFFICE BOX',
                    'POST Office BOX', 'Post Office BOX', 'Post Office Box', 'p0 b0x',
                    'P0 Box', 'PO B0x'],

                list = poBox.length;

            ownerPage.clearPhysicalAddress1();
            ownerPage.physicalAddress1 = poBox[0];
            ownerPage.clickSave().then(function () {

                expect(base.toasterIsPresent()).toBe(true);
                base.toasterClose().then(function() {
                     //expect(base.toasterIsPresent()).toBe(false);

                    expect(ownerPage.physicalAddress1POBOXError.isPresent).toBe(true);

                    for (var i = 1; i < list; i++) {
                        ownerPage.clearPhysicalAddress1();
                        ownerPage.physicalAddress1 = poBox[i];

                        expect(ownerPage.physicalAddress1POBOXError.isPresent).toBe(true);
                    }

                    ownerPage.clearPhysicalAddress1();
                    ownerPage.physicalAddress1 = '123 ABC Street';
                });
            });
        });

        it('Should: show correct info if not from the US', function() {
            ownerPage.physicalAddress = 'Outside US/Canada';

            //expect(ownerPage.physicalCountryMessage).toBe('If you have a non-US address, ' +
            //    'we may require additional information from you.');
            //expect(ownerPage.physicalCountryMessageIsPresent).toBe(true);
            expect(ownerPage.physicalStateIsDisplayed).toBe(false);
            expect(ownerPage.physicalCountryIsDisplayed).toBe(true);

            ownerPage.physicalAddress = 'US/Canada';
        });

        it('Should: validate fields if not from the US', function() {
            ownerPage.physicalAddress = 'Outside US/Canada';
            ownerPage.clickSave().then(function() {

                expect(base.toasterIsPresent()).toBe(true);
                base.toasterClose().then(function() {
                    //expect(base.toasterIsPresent()).toBe(false);

                    expect(ownerPage.physicalCountryError.isPresent).toBe(true);
                    expect(ownerPage.physicalCountryError.text).toBe('Required');

                    ownerPage.physicalCountry = 'Zaire';
                });
            });
        });

    });
});
