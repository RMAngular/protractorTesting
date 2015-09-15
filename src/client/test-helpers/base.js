/* jshint -W117, -W030 */
(function() {
    function Base() {
        'use strict';

        var saveButton = element(by.css('.save-btn button')),
            toaster = element(by.css('.toast-message')),
            toasterTitle = element(by.css('.toast-title')),
            toasterCount = element.all((by.repeater('toaster in toasters'))),

            promises = [];

        //*********browser properties************
        Object.defineProperty(this, 'title', {
            get: function() { return browser.getTitle(); },
            enumerable : true,
            configurable : true
        });

        Object.defineProperty(this, 'currentUrl', {
            get: function() { return browser.getLocationAbsUrl(); },
            enumerable : true,
            configurable : true
        });

        //*******general functions**********

        this.selectOption = function(element, value) {
            var option = element.element(by.cssContainingText('option', value));

            var promise = option.click();

            promises.push(promise);

            return promise;
        };

        this.selectOptionText = function(element) {
            var option = element.$('option:checked');

            return option.getText();
        };

        this.setInputField = function(element, value) {
            element.clear();

            var promise = element.sendKeys(value);

            promises.push(promise);

            return promise;
        };

        this.setInputFieldUnEditable = function(element, value) {
            var promise = element.sendKeys(value);

            promises.push(promise);

            return promise;
        };

        this.clickRadioButton = function(element) {
            if (this.isRadioOptionSelected(element)) {
                var promise = element.click();

                promises.push(promise);

                return promise;
            }
        };

        this.isRadioOptionSelected = function(element) {
            return element.isSelected();
        };

        this.clearPromises = function() {
            promises = [];
        };

        this.resolvePromises = function() {
            var newPromise = protractor.promise.all(promises);

            this.clearPromises();

            return newPromise;
        };

        //*******buttons**********
        this.clickAway = function() {
            var content = element(by.css('div.main-outercon'));
            return content.click();
        };

        this.toasterIsPresent = function() {
            return toaster.isPresent();
        };

        this.toasterCount = function() {
            return toasterCount.count();
        };

        this.toasterClose = function() {
            return toaster.click();
        };

        Object.defineProperty(this, 'toasterTitle', {
            get: function() { return toasterTitle.getText(); }
        });

        this.clickSaveButton = function() {
            return saveButton.click();
        };

        this.clearPromises = function() {
            promises = [];
        };
    }

    module.exports = Base;
})();
