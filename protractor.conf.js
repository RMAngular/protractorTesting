var gulpConfig = require('./gulp.config')();

exports.config = {
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    chromeDriver: './node_modules/protractor/selenium/chromedriver',
    baseUrl: 'http://localhost:' + gulpConfig.defaultPort,
    specs: gulpConfig.scenarios
};
