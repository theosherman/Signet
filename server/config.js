'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

config.express = {
	port: process.env.NODE_PORT || 3000
};

config.secret = process.env.SECRET || 'secret';

config.rethinkdb = {
	host: process.env.RETHINK_HOST || '192.168.0.120',
	port: process.env.RETHINK_PORT || '28015',
	db: 'Signet' + (config.environment === 'development' ? 'Dev' : 'Prd')
};

config.mail = {
	email: process.env.MAIL_EMAIL,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: true,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD
	}
};

module.exports = config;