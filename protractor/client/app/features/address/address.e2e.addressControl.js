/* jshint -W117, -W030 */
(function() {
    function AddressPage(base, ngmodel) {
        'use strict';

        var ErrorMessage = require('../../../../../src/client/test-helpers/errorMessage');

        //******content********
        var directive = element(by.model(ngmodel)),
            isForeign = directive.all(by.model('address.isForeign')),
            country = directive.element(by.model('address.countryId')),
            countryMessage = directive.element(by.cssContainingText('.message-info',
                'If you have a non-US address, we may require additional information from you.')),
            address1 = directive.element(by.model('address.street1')),
            address2 = directive.element(by.model('address.street2')),
            city = directive.element(by.model('address.city')),
            state = directive.element(by.model('address.stateId')),
            zip = directive.element(by.model('address.zipCode')),

        //********errors********
            countryErrors = new ErrorMessage(directive.element(by.css('#countryIdRequired'))),
            address1Errors = new ErrorMessage(directive.element(by.css('#street1Required'))),
            address1POBOXError = new ErrorMessage(directive.element(by.css('#street1InvalidPattern'))),
            cityErrors = new ErrorMessage(directive.element(by.css('#cityRequired'))),
            stateErrors = new ErrorMessage(directive.element(by.css('#stateIdRequired'))),
            zipErrors = new ErrorMessage(directive.element(by.css('#zipCodeRequired'))),

            saveButton = element(by.css('[ng-click="vm.save(' + ngmodel + 'Form)"]'));

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
            return saveButton.click();
        };

        this.clearAddress1 = function() {
            address1.clear();
        };

        //**********content**********
        Object.defineProperty(this, 'isForeign', {
            get: function() {return isForeign;},
            set: function(value) {
                if (value === 'US/Canada') {
                    return isForeign.get(0).click();
                } else {
                    return isForeign.get(1).click();
                }
            }
        });

        Object.defineProperty(this, 'country', {
            get: function() { return country.getAttribute('value'); },
            set: function(value) { base.selectOption(country, value); }
        });

        Object.defineProperty(this, 'countryIsDisplayed', {
            get: function() { return country.isDisplayed(); }
        });

        Object.defineProperty(this, 'countryMessage', {
            get: function() { return countryMessage.getText(); }
        });

        Object.defineProperty(this, 'countryMessageIsPresent', {
            get: function() { return countryMessage.isPresent(); }
        });

        Object.defineProperty(this, 'countryMessageIsDisplayed', {
            get: function() { return countryMessage.isDisplayed(); }
        });

        Object.defineProperty(this, 'address1', {
            get: function() { return address1.getAttribute('value'); },
            set: function(value) { base.setInputField(address1, value); }
        });

        Object.defineProperty(this, 'address2', {
            get: function() { return address2.getAttribute('value'); },
            set: function(value) { base.setInputField(address2, value); }
        });

        Object.defineProperty(this, 'city', {
            get: function() { return city.getAttribute('value'); },
            set: function(value) { base.setInputField(city, value); }
        });

        Object.defineProperty(this, 'state', {
            get: function() { return state.getAttribute('value'); },
            set: function(value) { base.selectOption(state, value); }
        });

        Object.defineProperty(this, 'stateIsDisplayed', {
            get: function() { return state.isDisplayed(); }
        });

        Object.defineProperty(this, 'zip', {
            get: function() { return zip.getAttribute('value'); },
            set: function(value) { base.setInputField(zip, value); }
        });

        //************errors************
        Object.defineProperty(this, 'countryError', {
            get: function() { return countryErrors; }
        });

        Object.defineProperty(this, 'address1Error', {
            get: function() { return address1Errors; }
        });

        Object.defineProperty(this, 'address1POBOXError', {
            get: function() { return address1POBOXError; }
        });

        Object.defineProperty(this, 'cityError', {
            get: function() { return cityErrors; }
        });

        Object.defineProperty(this, 'stateError', {
            get: function() { return stateErrors; }
        });

        Object.defineProperty(this, 'zipError', {
            get: function() { return zipErrors; }
        });

    }

    module.exports = AddressPage;
})();
