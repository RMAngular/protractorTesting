/*globals by,module*/
function ErrorMessage(selector) {
    'use strict';

    Object.defineProperty(this, 'isPresent', {
        get: function() { return selector.isPresent(); }
    });

    Object.defineProperty(this, 'isDisplayed', {
        get: function() { return selector.isDisplayed(); }
    });

    Object.defineProperty(this, 'text', {
        get: function() { return selector.getText(); }
    });

    Object.defineProperty(this, 'value', {
        get: function() { return selector.getAttribute('value'); }
    });
}

module.exports = ErrorMessage;
