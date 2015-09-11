/*jshint -W117*/
//core
var path = require('path');
//third-party
var HtmlReporter = require('protractor-html-screenshot-reporter');

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
    seleniumAddress: 'http://104.236.81.167:4444/wd/hub',
    specs: ['protractor/*Spec.js'],

    params: {
        fbClientId: '317281768457879',
        fbSecret: 'b5de690d81e694cf28f67dfd789cb006',
        baseUrl: 'http://fitnessheroes.briebugconsulting.com'
    },

    baseUrl: 'http://fitnessheroes.briebugconsulting.com',

    allScriptsTimeout: 22000,

    onPrepare: function() {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function(caps) {
            var browserName = caps.caps_.browserName.toUpperCase().replace(' ','_'),
                browserVersion = caps.caps_.version,
                prePendStr = 'TEST-' + browserName + '-' + browserVersion + '-',
                junitReporter = new jasmine.JUnitXmlReporter('protractor_output',
                    true, true, prePendStr),
                htmlReporter = new HtmlReporter({baseDirectory: './protractor_html/' +
                browserName});

            jasmine.getEnv().addReporter(junitReporter);
            jasmine.getEnv().addReporter(htmlReporter);
        });

    },

    multiCapabilities: [{browserName:'chrome'}],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000,
        isVerbose: true
    }

};
