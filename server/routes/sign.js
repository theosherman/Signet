'use strict';

var app = require('express')();
var r = require('../thinky').r;

var utility = require('../utility');

var Signature = require('../schema/signature');

app.post('/', function (req, res) {
	Signature.get(req.body.id).run().then(function (signature) {
		if (req.body.clientSignature)
			signature.clientSignature = req.body.clientSignature;
		if (req.body.ownerSignature)
			signature.ownerSignature = req.body.ownerSignature;
		
		signature.save().then(function () {
			res.status(200).end();
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});
	});
});

module.exports = app;