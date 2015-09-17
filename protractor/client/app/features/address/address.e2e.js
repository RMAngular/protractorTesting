/* jshint -W117, -W030 */
(function() {
    var MailingPage = require('./address.e2e.mailingAddressPageObject.js'),
        PhysicalPage = require('./address.e2e.PhysicalAddressPageObject.js'),
        BaseFunctions = require('../../../../../src/client/test-helpers/base');

    describe('On: Test Page', function() {
        'use strict';

        var base = new BaseFunctions(),
            physicalPage = new PhysicalPage(base),
            mailingPage = new MailingPage(base);

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

                        expect(physicalPage.physicalAddress1Error.text).toBe('Required');
                        expect(physicalPage.physicalCityError.text).toBe('Required');
                        expect(physicalPage.physicalStateError.text).toBe('Required');
                        expect(physicalPage.physicalZipError.text).toBe('Required');
                    });
                });
            });

            it('Should: remove errors when valid', function() {
                physicalFillInfo('123 ABC Street', '#2', 'Denver', 'Alabama', '12345')
                    .then(function() {
                        expect(physicalPage.physicalAddress1Error.isPresent).toBe(false);
                        expect(physicalPage.physicalCityError.isPresent).toBe(false);
                        expect(physicalPage.physicalStateError.isPresent).toBe(false);
                        expect(physicalPage.physicalZipError.isPresent).toBe(false);
                    });
            });

            it('Should: validate that address line 1 cannot be a PO box', function() {
                var poBox = ['PO BOX', 'PO Box', 'P.O Box', 'PO. Box', 'P.O. BOX',
                        'P.O. Box', 'Po Box','pO Box', 'po Box', 'po box', 'Post OFFICE BOX',
                        'POST Office BOX', 'Post Office BOX', 'Post Office Box', 'p0 b0x',
                        'P0 Box', 'PO B0x'],

                    list = poBox.length;

                physicalPage.clearPhysicalAddress1();
                physicalPage.physicalAddress1 = poBox[0];
                physicalPage.clickSave().then(function () {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(physicalPage.physicalAddress1POBOXError.isPresent).toBe(true);

                        for (var i = 1; i < list; i++) {
                            physicalPage.clearPhysicalAddress1();
                            physicalPage.physicalAddress1 = poBox[i];

                            expect(physicalPage.physicalAddress1POBOXError.isPresent).toBe(true);
                        }

                        physicalPage.clearPhysicalAddress1();
                        physicalPage.physicalAddress1 = '123 ABC Street';
                    });
                });
            });

            it('Should: show correct info if not from the US', function() {
                physicalPage.physicalAddress = 'Outside US/Canada';

                //expect(physicalPage.physicalCountryMessage).toBe('If you have a non-US address, ' +
                //    'we may require additional information from you.');
                //expect(physicalPage.physicalCountryMessageIsPresent).toBe(true);
                expect(physicalPage.physicalStateIsDisplayed).toBe(false);
                expect(physicalPage.physicalCountryIsDisplayed).toBe(true);

                physicalPage.physicalAddress = 'US/Canada';
            });

            it('Should: validate fields if not from the US', function() {
                physicalPage.physicalAddress = 'Outside US/Canada';
                physicalPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(physicalPage.physicalCountryError.isPresent).toBe(true);
                        expect(physicalPage.physicalCountryError.text).toBe('Required');

                        physicalPage.physicalCountry = 'Zaire';
                    });
                });
            });

        });

        function physicalFillInfo(phyAddress1, phyAddress2, phyCity, phyState, phyZipCode, phyCountry) {

            // clear promises
            base.clearPromises();

            physicalPage.physicalAddress1 = phyAddress1;
            physicalPage.physicalAddress2 = phyAddress2;
            physicalPage.physicalCity = phyCity;

            if (phyState) {
                physicalPage.physicalState = phyState;
            }

            physicalPage.physicalZip = phyZipCode;

            if (phyCountry) {
                physicalPage.physicalCountry = phyCountry;
            }

            return base.resolvePromises();
        }

        describe('For: testing the mailing address form', function() {

            it('Should: validate empty fields', function() {
                mailingPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(mailingPage.mailingAddress1Error.text).toBe('Required');
                        expect(mailingPage.mailingCityError.text).toBe('Required');
                        expect(mailingPage.mailingStateError.text).toBe('Required');
                        expect(mailingPage.mailingZipError.text).toBe('Required');
                    });
                });
            });

            it('Should: remove errors when valid', function() {
                mailingFillInfo('PO BOX 321', '#9', 'Phoenix', 'Texas', '98765')
                    .then(function() {
                        expect(mailingPage.mailingAddress1Error.isPresent).toBe(false);
                        expect(mailingPage.mailingCityError.isPresent).toBe(false);
                        expect(mailingPage.mailingStateError.isPresent).toBe(false);
                        expect(mailingPage.mailingZipError.isPresent).toBe(false);
                    });
            });

            it('Should: show correct info if not from the US', function() {
                mailingPage.mailingAddress = 'Outside US/Canada';

                //expect(mailingPage.mailingCountryMessage).toBe('If you have a non-US address, ' +
                //    'we may require additional information from you.');
                //expect(mailingPage.mailingCountryMessageIsPresent).toBe(true);
                expect(mailingPage.mailingStateIsDisplayed).toBe(false);
                expect(mailingPage.mailingCountryIsDisplayed).toBe(true);

                mailingPage.mailingAddress = 'US/Canada';
            });

            it('Should: validate fields if not from the US', function() {
                mailingPage.mailingAddress = 'Outside US/Canada';
                mailingPage.clickSave().then(function() {

                    expect(base.toasterIsPresent()).toBe(true);
                    base.toasterClose().then(function() {
                        //expect(base.toasterIsPresent()).toBe(false);

                        expect(mailingPage.mailingCountryError.isPresent).toBe(true);
                        expect(mailingPage.mailingCountryError.text).toBe('Required');

                        mailingPage.mailingCountry = 'Zaire';
                    });
                });
            });

        });

        function mailingFillInfo(mailAddress1, mailAddress2, mailCity, mailState, mailZipCode, mailCountry) {

            // clear promises
            base.clearPromises();

            mailingPage.mailingAddress1 = mailAddress1;
            mailingPage.mailingAddress2 = mailAddress2;
            mailingPage.mailingCity = mailCity;

            if (mailState) {
                mailingPage.mailingState = mailState;
            }

            mailingPage.mailingZip = mailZipCode;

            if (mailCountry) {
                mailingPage.mailingCountry = mailCountry;
            }

            return base.resolvePromises();
        }

        describe('PDP-101 - Foreign Addresses should hide states', function() {
            it('should hide states when user selects foreign country', function() {
                // user selects is foreign radio button
                mailingPage.isForeign = true;

                // expect that states is hidden and countries is visible
                expect(mailingPage.mailingStateIsDisplayed).to.be.false();
                expect(mailingPage.mailingCountryIsDisplayed).to.be.true();

                mailingPage.mailingCountry = 'Vietnam';

                mailingPage.clickSave();

                expect()
            })
        })
    });
})();
