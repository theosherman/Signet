'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');

var utility = require('../utility');

var Signature = require('../schema/signature');

app.get('/', function (req, res) {
	Signature.run().then(function (signatures) {
		res.send(signatures);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.get('/:id', function (req, res) {
	Signature.get(req.params.id).run().then(function (signature) {
		res.send(signature);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/', function (req, res) {
	var newSignature = new Signature(req.body);

	newSignature.save().then(function (signature) {
		res.send(signature);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.put('/', function (req, res) {
	Signature.get(req.body.id).run().then(function (signature) {
		signature.merge(req.body).save().then(function (signature) {
			res.send(signature);
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.delete('/:id', function (req, res) {
	Signature.get(req.params.id).run().then(function (signature) {
		signature.delete().then(function () {
			res.status(200).end();
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});;
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

module.exports = app;