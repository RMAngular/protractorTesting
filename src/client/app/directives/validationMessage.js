/*globals angular*/
(function() {
    angular
        .module('app.directives')
        .directive('validationMessage', function() {
            'use strict';

            return {
                require: '?ngModel',
                restrict: 'A',
                link: function(scope, element, attrs, ngModel) {
                    var parent = element.closest('.form-group'),
                        containerParent,
                        container,
                        validationDisplayName = attrs.validationDisplayName,
                        elementId = element.attr('id'),
                        dependentElement,
                        showErrors = attrs.validationMessage || 'vm.showErrors';

                    // watch for events on the element to fire
                    element.on('keyup blur focus click', function() {
                        checkValidation();
                    });

                    if (attrs.validationDependentElementId) {
                        dependentElement = angular.element(
                            document.querySelector('#' + attrs.validationDependentElementId)
                        );

                        dependentElement.on('keyup blur focus click', function () {
                            checkValidation();
                        });
                    }

                    scope.$watch(function () {
                        return ngModel.$invalid;
                    }, function () {
                        checkValidation();
                    }, true);

                    // watch for showErrors on the controller to change
                    scope.$watch(showErrors, function() {
                        checkValidation();
                    });

                    function init() {
                        var containerClass = attrs.validationContainerClass || 'validationMessages',
                            html = '<ul class="' + containerClass + ' has-error"></ul>';

                        // find the containerParent
                        containerParent = element.closest('.validationContainer');

                        if (!containerParent.length) {
                            containerParent = parent;
                        }

                        // find the container
                        container = containerParent.closest('.' + containerClass);

                        // if it doesn't exist, then create it
                        if (!container.length) {
                            container = angular.element(html);
                            containerParent.append(container);
                        }
                    }

                    function checkValidation() {
                        var name = element[0].name,
                            show = isShowErrorsTrue(),
                            errors = ngModel.$error,
                            messages = {
                                email: {name: 'Valid', description: 'must be valid'},
                                pattern: {name: 'Valid', description: 'must be valid'},
                                maxlength: {
                                    name: 'MaxLength',
                                    description: ' is limited to ' +
                                    attrs.ngMaxlength + ' characters'
                                },
                                minlength: {
                                    name: 'MinLength',
                                    description: ' must be at least ' + attrs.ngMinlength +
                                    ' characters'
                                },
                                max: {name: 'MaxValue', description: 'maximum value reached'},
                                required: {name: 'Required', description: 'is required'},
                                valid: {name: 'Valid', description: 'must be valid'},
                                minimumAge: {
                                    name: 'MinimumAge',
                                    description: ' - owner must be ' + attrs.minimumAge +
                                    ' years of age.'
                                },
                                maximumDate: {
                                    name: 'MaximumDate',
                                    description: 'Must be within ' + attrs.maximumDate + '  years.',
                                    hideDisplayName: true
                                },
                                greaterThanToday: {
                                    name: 'GreaterThanToday',
                                    description: 'Must be a future date.',
                                    hideDisplayName: true
                                },
                                invalidPattern: {
                                    name: 'InvalidPattern',
                                    description: attrs.ngInvalidPatternMessage
                                },
                                unique: {name: 'Unique', description: 'Must be unique.'},
                                compareTo: {name: 'CompareTo', description: 'Must match.'}
                            },
                            message,
                            hasError = false;

                        // empty the container
                        container.empty();

                        // remove the error from the parent
                        parent.removeClass('has-error');

                        if (show && ngModel.$invalid) {
                            for (var key in errors) {
                                if (errors.hasOwnProperty(key)) {
                                    message = messages[key];

                                    addError(name, message);
                                }
                            }
                        }
                    }

                    function isShowErrorsTrue() {
                        var parts = showErrors.split('.'),
                            len = parts.length,
                            temp = scope;

                        for (var i = 0; i < len; i++) {
                            temp = temp[parts[i]];
                        }

                        return temp;
                    }

                    function addError(name, message) {
                        var htmlString,
                            labelText = parent.find('label[for=' + elementId + ']').text().trim(),
                            displayName = validationDisplayName || labelText || 'Field',
                            validationElement,
                            displayMessage;

                        if (message.name === 'Required') {
                            displayMessage = 'Required';
                        } else if (message.hideDisplayName) {
                            displayMessage = message.description;
                        } else {
                            displayMessage = displayName + ' ' + message.description;
                        }

                        // create the html
                        htmlString = '<li id="' + name + message.name +
                            '" class="field-validation-error help-block text-left">' +
                            displayMessage + '</li>';

                        // create the span element
                        validationElement = angular.element(htmlString);

                        // find any existing messages
                        if (container.children().length === 0) {
                            // append it to the container
                            container.append(validationElement);
                        }

                        // add has-error class to parent
                        parent.addClass('has-error');
                    }

                    init();
                    checkValidation();
                }
            };
        });
})();
