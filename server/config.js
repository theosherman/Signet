'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

config.express = {
	port: process.env.NODE_PORT || 3000
};

config.secret = process.env.SECRET || 'secret';

config.rethinkdb = {
	host: process.env.RETHINK_HOST || '192.168.0.4',
	port: process.env.RETHINK_PORT || '28015',
	db: 'Signet' + (config.environment === 'development' ? 'Dev' : 'Prd')
};

module.exports = config;