# Adlogix JS Candidate Test

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Your mission](#markdown-header-your-mission)
- [Directory structure](#markdown-header-directory-structure)
- [API](#markdown-header-api)
- [How to run](#markdown-header-how-to-run)
    - [Install dependencies](#markdown-header-install-dependencies)
    - [Start the server in development mode](#markdown-header-start-the-server-in-development-mode)
    - [Build the assets and run in production mode](#markdown-header-build-the-assets-and-run-in-production-mode)
    - [Tests](#markdown-header-tests)
        - [API Server tests](#markdown-header-api-server-tests)
        - [UI Tests](#markdown-header-ui-tests)
- [Coding assistance](#markdown-header-coding-assistance)
    - [Webpack](#markdown-header-webpack)
    - [Babel](#markdown-header-babel)
    - [ESLint](#markdown-header-eslint)
    - [Flow](#markdown-header-flow)
- [Mission accomplished](#markdown-header-mission-accomplished)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Your mission

Your mission, should you choose to accept it, will be to create the ToDo UI client for our server. All the code specific
to the client should be located in `client` where we already have added some basics like the CSS and the barebone HTML.
Webpack is already configured but you can change its configuration if needed, it will automatically add the CSS/JS to 
the HTML file so don't be afraid if you don't see the links.

All the information about the app specifications, which are heavily inspired from [TodoMVC](http://todomvc.com/), are 
defined in [doc/app-spec.md](doc/app-spec.md).

When the app is launched, the server will log where you'll be able to reach it. If you need to change the ports,
take a look in [config/development.yaml](config/development.yaml):

```
* Client available at http://localhost:3000/
* Api documentation available at http://localhost:3000/api/doc/
* Api available at http://localhost:3000/api/
```

## Directory structure

* **api**

    The wiring between the server and the domain. No application logic resides here.

* **client**

    Where you should put you code for the UI.
    
* **config**
    
    The configuration folder for the server and its services.
    
* **domain**

    The actual domain. The biggest part of the application logic lies here. 

* **server**

    Will expose the API, the API documentation, the development server, ...
    
* **test**
    


## API

* The API documentation is available at `/api/doc/`
* The API is available at `/api`

## How to run

Our preferred package manager is Yarn but the project is prepared to use NPM. Feel free to use the one you prefer.

### Install dependencies

First of all you need to install our dependencies to be able to run the built-in servers.

`yarn`

### Start the server in development mode

Once the server has started, the hostname and port will be displayed. By default, it's on localhost:3000

`yarn start`

### Build the assets and run in production mode

Once the server has started, the hostname and port will be displayed. By default, it's on localhost:8080

`yarn prod`

### Tests

#### API Server tests

To run the tests of the server use `yarn test:server`

#### UI Tests

To run the UI client tests use `yarn test:ui`. These tests are not yet implemented since we need you to create
the client. But if you prefer to develop in a TDD/BDD way, feel free to write them. The folder where they should be
located is `test/client`.

These tests run server side but with a virtual browser, so `window` and `document` are available. If you need to test
AJAX calls, be sure to use a library that runs in both environments. We usually use
[isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch).


## Coding assistance

### Webpack

Webpack is configured to handle all the code from `client/` and will refresh the page. Some HTML changes might need to 
do a full refresh, while CSS changes will be applied without refresh (=> Hot Reloading). Depending on the framework 
you choose to use, you might need to change the configuration to have that Hot Reload available to JS.

* Configuration: [webpack.config.js](./webpack.config.babel.js)
* Documentation: [https://webpack.js.org/](https://webpack.js.org/)

### Babel

Babel is configured to transform all the JS code loaded by [client/index.js](client/index.js)

* Configuration: [.babelrc](./.babelrc)
* Documentation: [http://babeljs.io/](http://babeljs.io/)

### ESLint

We use ESLint to help us have a common coding style. It will read all the JS files and use the babel-parser to understand them.

* Configuration: [.eslintrc](.eslintrc)
* Ignored files: [.eslintignore](.eslintignore)
* Command: `yarn lint`
* Documentation: [https://eslint.org/](https://eslint.org/)
 
### Flow
 
Flow is loaded in the application to add type checking during the development process. If you want to use flow, you need
to add `// @flow` on the first line of your JS files. Be aware that it's pure markup and those annotations are removed 
during build so the type checks are only made while you write your code, never during execution. You can trigger the 
check with the command here under or by installing an extension in your IDE (recommended). 
 
* Configuration: [.flowconfig](.flowconfig)
* Setup (install the types libraries): `yarn flow:setup`
* Command: `yarn flow`
* Documentation: [https://flow.org/en/](https://flow.org/en/)

## Mission accomplished

Run `yarn package` or `npm run package` and send us the `js-candidate-test-result.tar.gz` archive file just created.
