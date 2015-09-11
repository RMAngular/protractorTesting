/*globals browser,element,by,module,require*/
function OwnerPage(base) {
    'use strict';

    var errorMessage = require('./errorMessage'),

    //******content********
        physicalAddress = element.all(by.model('owner.address.physical.isForeign')),
        physicalCountry = element(by.model('owner.address.physical.countryId')),
        physicalCountryMessage = element(by.cssContainingText('.message-info', 'If you have a non-US address, we may require additional information from you.')),
        physicalAddress1 = element(by.model('owner.address.physical.street1')),
        physicalAddress2 = element(by.model('owner.address.physical.street2')),
        physicalCity = element(by.model('owner.address.physical.city')),
        physicalState = element(by.model('owner.address.physical.stateId')),
        physicalZip = element(by.model('owner.address.physical.zipCode')),
        mailingAddress = element.all(by.model('owner.address.mailing.isForeign')),
        mailingCountry = element(by.model('owner.address.mailing.countryId')),
        mailingAddress1 = element(by.model('owner.address.mailing.street1')),
        mailingAddress2 = element(by.model('owner.address.mailing.street2')),
        mailingCity = element(by.model('owner.address.mailing.city')),
        mailingState = element(by.model('owner.address.mailing.stateId')),
        mailingZip = element(by.model('owner.address.mailing.zipCode')),

    //********errors********
        physicalCountryErrors = new errorMessage(element(by.css('#physicalCountryIdRequired'))),
        physicalAddress1Errors = new errorMessage(element(by.css('#physicalStreet1Required'))),
        physicalAddress1POBOXError = new errorMessage(element(by.css('#physicalStreet1NoPOBox'))),
        physicalCityErrors = new errorMessage(element(by.css('#physicalCityRequired'))),
        physicalStateErrors = new errorMessage(element(by.css('#physicalStateIdRequired'))),
        physicalZipErrors = new errorMessage(element(by.css('#physicalZipCodeRequired'))),
        mailingCountryErrors = new errorMessage(element(by.css('#mailingCountryIdRequired'))),
        mailingAddress1Errors = new errorMessage(element(by.css('#mailingStreet1Required'))),
        mailingCityErrors = new errorMessage(element(by.css('#mailingCityRequired'))),
        mailingStateErrors = new errorMessage(element(by.css('#mailingStateIdRequired'))),
        mailingZipErrors = new errorMessage(element(by.css('#mailingZipCodeRequired'))),

        saveButton = element(by.cssContainingText('button', 'Yes, Save & Exit'));

//*********browser properties**********
    Object.defineProperty(this, 'title', {
        get: function(){ return browser.getTitle(); },
        enumerable : true,
        configurable : true
    });

    Object.defineProperty(this, 'currentUrl', {
        get: function(){ return browser.getLocationAbsUrl(); },
        enumerable : true,
        configurable : true
    });

//**********buttons************
    this.clickSave = function () {
        return saveButton.click();
    };


//**********content**********
    Object.defineProperty(this, 'physicalAddress', {
        get: function() { return physicalAddress; },
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

    Object.defineProperty(this, 'mailingAddress', {
        get: function() { return mailingAddress; },
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

module.exports = OwnerPage;
