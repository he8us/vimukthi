require('babel-register');
require('babel-polyfill');
var server = require('./server').app;
module.exports = server;
