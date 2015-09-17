/* jshint -W117, -W030 */
(function() {
    var AddressPage = require('./address.e2e.addressControl.js'),
        BaseFunctions = require('../../../../../src/client/test-helpers/base');

    describe('On: Test Page', function() {
        'use strict';

        var base = new BaseFunctions(),
            physicalPage = new AddressPage(base, 'vm.physicalAddress'),
            mailingPage = new AddressPage(base, 'vm.mailingAddress');

        it('should have a title', function () {
            browser.get('http://localhost:9001/address');

            expect(browser.getTitle()).toEqual('protractorTesting: Address');
            expect(base.currentUrl).toContain('address');

        });

        describe('For: testing the physical address form', function() {

            it('Should: validate empty fields', function() {
                physicalPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(physicalPage.address1Error.text).toBe('Required');
                        expect(physicalPage.cityError.text).toBe('Required');
                        expect(physicalPage.stateError.text).toBe('Required');
                        expect(physicalPage.zipError.text).toBe('Required');
                    });
                });
            });

            it('Should: remove errors when valid', function() {
                fillInfo(physicalPage, '123 ABC Street', '#2', 'Denver', 'Alabama', '12345')
                    .then(function() {
                        expect(physicalPage.address1Error.isPresent).toBe(false);
                        expect(physicalPage.cityError.isPresent).toBe(false);
                        expect(physicalPage.stateError.isPresent).toBe(false);
                        expect(physicalPage.zipError.isPresent).toBe(false);
                    });
            });

            it('Should: validate that address line 1 cannot be a PO box', function() {
                var poBox = ['PO BOX', 'PO Box', 'P.O Box', 'PO. Box', 'P.O. BOX',
                        'P.O. Box', 'Po Box','pO Box', 'po Box', 'po box', 'Post OFFICE BOX',
                        'POST Office BOX', 'Post Office BOX', 'Post Office Box', 'p0 b0x',
                        'P0 Box', 'PO B0x'],

                    list = poBox.length;

                physicalPage.clearAddress1();
                physicalPage.address1 = poBox[0];
                physicalPage.clickSave().then(function () {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(physicalPage.address1POBOXError.isPresent).toBe(true);

                        for (var i = 1; i < list; i++) {
                            physicalPage.clearAddress1();
                            physicalPage.address1 = poBox[i];

                            expect(physicalPage.address1POBOXError.isPresent).toBe(true);
                        }

                        physicalPage.clearAddress1();
                        physicalPage.address1 = '123 ABC Street';
                    });
                });
            });

            it('Should: show correct info if not from the US', function() {
                physicalPage.isForeign = 'Outside US/Canada';

                //expect(physicalPage.physicalCountryMessage).toBe('If you have a non-US address, ' +
                //    'we may require additional information from you.');
                //expect(physicalPage.physicalCountryMessageIsPresent).toBe(true);
                expect(physicalPage.stateIsDisplayed).toBe(false);
                expect(physicalPage.countryIsDisplayed).toBe(true);

                physicalPage.isForeign = 'US/Canada';
            });

            it('Should: validate fields if not from the US', function() {
                physicalPage.isForeign = 'Outside US/Canada';
                physicalPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(physicalPage.countryError.isPresent).toBe(true);
                        expect(physicalPage.countryError.text).toBe('Required');

                        physicalPage.country = 'Zaire';
                    });
                });
            });

        });

        function fillInfo(page, address1, address2, city, state, zipCode, country) {

            // clear promises
            base.clearPromises();

            page.address1 = address1;
            page.address2 = address2;
            page.city = city;

            if (state) {
                page.state = state;
            }

            page.zip = zipCode;

            if (country) {
                page.country = country;
            }

            return base.resolvePromises();
        }

        describe('For: testing the mailing address form', function() {

            it('Should: validate empty fields', function() {
                mailingPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(mailingPage.address1Error.text).toBe('Required');
                        expect(mailingPage.cityError.text).toBe('Required');
                        expect(mailingPage.stateError.text).toBe('Required');
                        expect(mailingPage.zipError.text).toBe('Required');
                    });
                });
            });

            it('Should: remove errors when valid', function() {
                fillInfo(mailingPage, 'PO BOX 321', '#9', 'Phoenix', 'Texas', '98765')
                    .then(function() {
                        expect(mailingPage.address1Error.isPresent).toBe(false);
                        expect(mailingPage.cityError.isPresent).toBe(false);
                        expect(mailingPage.stateError.isPresent).toBe(false);
                        expect(mailingPage.zipError.isPresent).toBe(false);
                    });
            });

            it('Should: show correct info if not from the US', function() {
                mailingPage.isForeign = 'Outside US/Canada';
                //expect(mailingPage.mailingCountryMessage).toBe('If you have a non-US address, ' +
                //    'we may require additional information from you.');
                //expect(mailingPage.mailingCountryMessageIsPresent).toBe(true);
                expect(mailingPage.stateIsDisplayed).toBe(false);
                expect(mailingPage.countryIsDisplayed).toBe(true);

                mailingPage.isForeign = 'US/Canada';
            });

            it('Should: validate fields if not from the US', function() {
                mailingPage.isForeign = 'Outside US/Canada';
                mailingPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(mailingPage.countryError.isPresent).toBe(true);
                        expect(mailingPage.countryError.text).toBe('Required');

                        mailingPage.country = 'Zaire';
                    });
                });
            });

        });
    });
})();
