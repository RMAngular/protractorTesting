/* jshint -W117, -W030 */
(function() {
    function MailingAddress(base) {
        'use strict';

        var ErrorMessage = require('../../../../../src/client/test-helpers/errorMessage');

        //******content********
        var directive = element(by.model('vm.mailingAddress')),
            mailingAddress = directive.all(by.model('address.isForeign')),
            mailingCountry = directive.element(by.model('address.countryId')),
            mailingCountryMessage = directive.element(by.cssContainingText('.message-info',
                'If you have a non-US address, we may require additional information from you.')),
            mailingAddress1 = directive.element(by.model('address.street1')),
            mailingAddress2 = directive.element(by.model('address.street2')),
            mailingCity = directive.element(by.model('address.city')),
            mailingState = directive.element(by.model('address.stateId')),
            mailingZip = directive.element(by.model('address.zipCode')),

        //********errors********
            mailingCountryErrors = new ErrorMessage(directive.element(by.css('#countryIdRequired'))),
            mailingAddress1Errors = new ErrorMessage(directive.element(by.css('#street1Required'))),
            mailingCityErrors = new ErrorMessage(directive.element(by.css('#cityRequired'))),
            mailingStateErrors = new ErrorMessage(directive.element(by.css('#stateIdRequired'))),
            mailingZipErrors = new ErrorMessage(directive.element(by.css('#zipCodeRequired'))),

            mailingSaveButton = element(by.css('[ng-click="vm.save(vm.mailingAddressForm)"]'));

        //*********browser properties**********
        Object.defineProperty(this, 'title', {
            get: function() { return browser.getTitle(); },
            enumerable : true,
            configurable : true
        });

        Object.defineProperty(this, 'currentUrl', {
            get: function() {return browser.getLocationAbsUrl();},
            enumerable : true,
            configurable : true
        });

        //**********buttons************
        this.clickSave = function () {
            return mailingSaveButton.click();
        };

        this.clearMailingAddress1 = function() {
            mailingAddress1.clear();
        };

        //**********content**********
        Object.defineProperty(this, 'mailingAddress', {
            get: function() {return mailingAddress;},
            set: function(value) {
                if (value === 'US/Canada') {
                    return mailingAddress.get(0).click();
                } else {
                    return mailingAddress.get(1).click();
                }
            }
        });

        Object.defineProperty(this, 'mailingCountry', {
            get: function() { return mailingCountry.getAttribute('value'); },
            set: function(value) { base.selectOption(mailingCountry, value); }
        });

        Object.defineProperty(this, 'mailingCountryIsDisplayed', {
            get: function() { return mailingCountry.isDisplayed(); }
        });

        Object.defineProperty(this, 'mailingCountryMessage', {
            get: function() { return mailingCountryMessage.getText(); }
        });

        Object.defineProperty(this, 'mailingCountryMessageIsPresent', {
            get: function() { return mailingCountryMessage.isPresent(); }
        });

        Object.defineProperty(this, 'mailingCountryMessageIsDisplayed', {
            get: function() { return mailingCountryMessage.isDisplayed(); }
        });

        Object.defineProperty(this, 'mailingAddress1', {
            get: function() { return mailingAddress1.getAttribute('value'); },
            set: function(value) { base.setInputField(mailingAddress1, value); }
        });

        Object.defineProperty(this, 'mailingAddress2', {
            get: function() { return mailingAddress2.getAttribute('value'); },
            set: function(value) { base.setInputField(mailingAddress2, value); }
        });

        Object.defineProperty(this, 'mailingCity', {
            get: function() { return mailingCity.getAttribute('value'); },
            set: function(value) { base.setInputField(mailingCity, value); }
        });

        Object.defineProperty(this, 'mailingState', {
            get: function() { return mailingState.getAttribute('value'); },
            set: function(value) { base.selectOption(mailingState, value); }
        });

        Object.defineProperty(this, 'mailingStateIsDisplayed', {
            get: function() { return mailingState.isDisplayed(); }
        });

        Object.defineProperty(this, 'mailingZip', {
            get: function() { return mailingZip.getAttribute('value'); },
            set: function(value) { base.setInputField(mailingZip, value); }
        });

        //************errors************
        Object.defineProperty(this, 'mailingCountryError', {
            get: function() { return mailingCountryErrors; }
        });

        Object.defineProperty(this, 'mailingAddress1Error', {
            get: function() { return mailingAddress1Errors; }
        });

        Object.defineProperty(this, 'mailingCityError', {
            get: function() { return mailingCityErrors; }
        });

        Object.defineProperty(this, 'mailingStateError', {
            get: function() { return mailingStateErrors; }
        });

        Object.defineProperty(this, 'mailingZipError', {
            get: function() { return mailingZipErrors; }
        });

    }

    module.exports = MailingAddress;
})();
