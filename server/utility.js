'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config');

var utility = {};

utility.handleErrorResponse = function sendServerError(res, err) {
	if (err)
		console.log(err);
	res.status(500).send({message: err ? err.message : 'Server Error'});
};

utility.denyPermission = function denyPermission(res) {
	res.status(403).send({message: 'Permission denied'});	
};

utility.denyAccess = function denyAccess(res) {
	res.status(401).send({message: 'Invalid credentials'});
};

utility.sendEmail = function sendEmail(body, subject, to) {
	var transporter = nodemailer.createTransport(smtpTransport(config.mail));
	
	transporter.sendMail({
		from: config.mail.email,
		to: to,
		subject: subject,
		text: body
	});
};

module.exports = utility;