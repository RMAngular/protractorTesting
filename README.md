# Protractor

The protractor tests are designed to isolate a reusable component within a controlled testing environment. This provides a fast and efficient method in which multiple test scenarios can be implemented against one or more components.

### Structure
    /Protractor
        /client
            /app
                /components
                    /componentName
                        component.e2e.js
                        component.e2e.control.js
                        /stage
                            component.controller.js
                            component.html
                            component.module.js
                            component.route.js
                            /docs
                                overview.md
                                useCases.md*
                components.module.js
                /services
                    serviceName.service.js
                    services.module.js
                /test-helpers
                    base.js
            app.module.js
        index.html
        /server
            app.js

## Contents

#### components
Contains subfolders for each component

-   module.js - defines the parent component module.

#### componentName
>Contains the tests, environment and documentation for each component

 - e2e.js - contains the tests that are run against the component.
 - e2e.control.js - contains the page object that supports the tests when interacting with the component.

#### stage
>Contains the files necessary to create an isolated environment for the component to be tested

- .controller.js - the controller environment used during the test.
- .html - the view the component is placed on during the test.
- module.js - defines the module for the component test.
- route.js - defines the route and any resolved data needed for the component test.

#### docs
>Contains detailed information regarding the usage of each component

- overview.md - an overview of the components usage and functionality.
- useCases.md* - all possible use cases for each component.

#### services
>Contains the files that a component may rely on for additional data

- service.js - the services needed for a component to function properly.
- module.js - defines the module for all services.

#### test-helpers
>Contains commonly used methods for testing

- base.js - provides various methods for performing actions on a component and returning information.

#### server
>Contains the files necessary to run the server for the tests

- app.js - provides the configuration for the test server to run.

## Prerequisites

## Running e2e Tests

### Run Tests
- `test-e2e`

    This runs `e2e-start-server` and `templatecache` before starting the tests.

### Start Test server
- `e2e-start-server`

    This runs `vet` before starting the server.
