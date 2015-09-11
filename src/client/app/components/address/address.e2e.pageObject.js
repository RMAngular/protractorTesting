/*globals browser,element,by,module,require*/
function OwnerPage(base) {
    'use strict';

    var ErrorMessage = require('../../../test-helpers/errorMessage'),

    //******content********
        physicalAddress = element.all(by.model('vm.address.isForeign')),
        physicalCountry = element(by.model('vm.address.countryId')),
        physicalCountryMessage = element(by.cssContainingText('.message-info',
            'If you have a non-US address, we may require additional information from you.')),
        physicalCountryOptions = physicalCountry.all(by.tagName('option')),
        physicalAddress1 = element(by.model('vm.address.street1')),
        physicalAddress2 = element(by.model('vm.address.street2')),
        physicalCity = element(by.model('vm.address.city')),
        physicalState = element(by.model('vm.address.stateId')),
        physicalStateOptions = physicalState.all(by.tagName('option')),
        physicalZip = element(by.model('vm.address.zipCode')),

    //********errors********
        physicalCountryErrors = new ErrorMessage(element(by.css('#countryIdRequired'))),
        physicalAddress1Errors = new ErrorMessage(element(by.css('#street1Required'))),
        physicalAddress1POBOXError = new ErrorMessage(element(by.css('#street1InvalidPattern'))),
        physicalCityErrors = new ErrorMessage(element(by.css('#cityRequired'))),
        physicalStateErrors = new ErrorMessage(element(by.css('#stateIdRequired'))),
        physicalZipErrors = new ErrorMessage(element(by.css('#zipCodeRequired'))),

        saveButton = element(by.css('[ng-click="vm.save()"]'));

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

    this.clearPhysicalAddress1 = function() {
        physicalAddress1.clear();
    };

    //**********content**********
    Object.defineProperty(this, 'physicalAddress', {
        get: function() {return physicalAddress;},
        set: function(value) {
            if (value === 'US/Canada') {
                return physicalAddress.get(0).click();
            } else {
                return physicalAddress.get(1).click();
            }
        }
    });

    Object.defineProperty(this, 'physicalCountry', {
        get: function() { return physicalCountry.getAttribute('value'); },
        set: function(value) { base.selectOption(physicalCountry, value); }
    });

    Object.defineProperty(this, 'physicalCountryIsDisplayed', {
        get: function() { return physicalCountry.isDisplayed(); }
    });

    Object.defineProperty(this, 'physicalCountryMessage', {
        get: function() { return physicalCountryMessage.getText(); }
    });

    Object.defineProperty(this, 'physicalCountryMessageIsPresent', {
        get: function() { return physicalCountryMessage.isPresent(); }
    });

    Object.defineProperty(this, 'physicalCountryMessageIsDisplayed', {
        get: function() { return physicalCountryMessage.isDisplayed(); }
    });

    Object.defineProperty(this, 'physicalAddress1', {
        get: function() { return physicalAddress1.getAttribute('value'); },
        set: function(value) { base.setInputField(physicalAddress1, value); }
    });

    Object.defineProperty(this, 'physicalAddress2', {
        get: function() { return physicalAddress2.getAttribute('value'); },
        set: function(value) { base.setInputField(physicalAddress2, value); }
    });

    Object.defineProperty(this, 'physicalCity', {
        get: function() { return physicalCity.getAttribute('value'); },
        set: function(value) { base.setInputField(physicalCity, value); }
    });

    Object.defineProperty(this, 'physicalState', {
        get: function() { return physicalState.getAttribute('value'); },
        set: function(value) { base.selectOption(physicalState, value); }
    });

    Object.defineProperty(this, 'physicalStateIsDisplayed', {
        get: function() { return physicalState.isDisplayed(); }
    });

    Object.defineProperty(this, 'physicalZip', {
        get: function() { return physicalZip.getAttribute('value'); },
        set: function(value) { base.setInputField(physicalZip, value); }
    });

    //************errors************
    Object.defineProperty(this, 'physicalCountryError', {
        get: function() { return physicalCountryErrors; }
    });

    Object.defineProperty(this, 'physicalAddress1Error', {
        get: function() { return physicalAddress1Errors; }
    });

    Object.defineProperty(this, 'physicalAddress1POBOXError', {
        get: function() { return physicalAddress1POBOXError; }
    });

    Object.defineProperty(this, 'physicalCityError', {
        get: function() { return physicalCityErrors; }
    });

    Object.defineProperty(this, 'physicalStateError', {
        get: function() { return physicalStateErrors; }
    });

    Object.defineProperty(this, 'physicalZipError', {
        get: function() { return physicalZipErrors; }
    });
}

module.exports = OwnerPage;
