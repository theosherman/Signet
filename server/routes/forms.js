'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');

var utility = require('../utility');

var Form = require('../schema/form');

app.get('/', function (req, res) {
	Form.run().then(function (forms) {
		res.send(forms);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.get('/:id', function (req, res) {
	Form.get(req.params.id).run().then(function (form) {
		res.send(form);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/', function (req, res) {
	var newForm = new Form(req.body);

	newForm.save().then(function (savedForm) {
		res.send(savedForm);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.put('/', function (req, res) {
	Form.get(req.body.id).run().then(function (form) {
		form.merge(req.body).save().then(function (form) {
			res.send(form);
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.delete('/:id', function (req, res) {
	Form.get(req.params.id).run().then(function (form) {
		form.delete().then(function () {
			res.status(200).end();
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});;
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

module.exports = app;