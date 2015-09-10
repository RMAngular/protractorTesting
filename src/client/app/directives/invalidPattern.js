/* jshint -W074 */
(function() {
    angular.module('app.directives')
        .directive('ngInvalidPattern', function () {
            'use strict';

            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elem, attr, ctrl) {
                    var invalidPatternRegex = parseValue(attr.ngInvalidPattern),
                        validate = stringToBoolean(attr.ngInvalidPatternIf);

                    //For DOM -> model validation
                    ctrl.$parsers.unshift(function(value) {
                        var valid = isValid(value);

                        ctrl.$setValidity('invalidPattern', valid);

                        return value;
                    });

                    //For model -> DOM validation
                    ctrl.$formatters.unshift(function(value) {
                        var valid = isValid(value);

                        ctrl.$setValidity('invalidPattern', valid);

                        return value;
                    });

                    function isValid(value) {
                        var hasPattern = invalidPatternRegex.test(value);

                        return !validate || !hasPattern;
                    }

                    function parseValue(value) {
                        var parts = value.split('.'),
                            len = parts.length,
                            temp = scope;

                        for (var i = 0; i < len; i++) {
                            temp = temp[parts[i]];
                        }

                        return temp;
                    }

                    function stringToBoolean(string) {
                        if (typeof string === 'undefined') {
                            return true;
                        }

                        switch (string.toLowerCase().trim()) {
                            case 'true':
                            case 'yes':
                            case '1':
                                return true;

                            case 'false':
                            case 'no':
                            case '0':
                            case null:
                                return false;

                            default:
                                return Boolean(string);
                        }
                    }
                }
            };
        });
})();
