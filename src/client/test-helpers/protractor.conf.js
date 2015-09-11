/*globals exports,require,jasmine*/
exports.config = {
    /*
     // Do not start a Selenium Standalone sever - only run this using chrome.
     chromeOnly: true,
     chromeDriver: 'C:/Users/Jesse Sanders/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver',

     // Capabilities to be passed to the webdriver instance.
     capabilities: {
     'browserName': 'chrome'
     },
     */
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['protractor/*Spec.js'],

    params: {
        fbClientId: '1508884422727010',
        fbSecret: '449f8938ea227a432e472cdffe5f3a78',
        baseUrl: 'http://localhost:8282'
    },
    //params: {
    //    fbClientId: '317281768457879',
    //    fbSecret: 'b5de690d81e694cf28f67dfd789cb006',
    //    baseUrl: 'http://fitnessheroes.briebugconsulting.com'
    //},

    multiCapabilities: [
//        {
//            name: 'Firefox',sd
//            browserName: 'firefox'
//        }
        {
            name: 'Chrome',
            browserName: 'chrome'
        }
//        {
//            name: 'Internet Explorer',
//            browserName: 'internet explorer'
//        }
    ],

    baseUrl: 'http://localhost:8282',
    //baseUrl: 'http://fitnessheroes.briebugconsulting.com',

    onPrepare: function() {
        'use strict';

        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('xmloutput', true, true)
        );
    }

    /*
     // Options to be passed to Jasmine-node.
     jasmineNodeOpts: {
     showColors: true,
     defaultTimeoutInterval: 30000
     }
     */
};