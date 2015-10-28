'use strict';

var config = require('./config');
var thinky = require('thinky')(config.rethinkdb);

module.exports = thinky;