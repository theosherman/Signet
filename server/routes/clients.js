'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');

var utility = require('../utility');

var Client = require('../schema/client');

app.get('/', function (req, res) {
	Client.run().then(function (clients) {
		res.send(clients);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.get('/:id', function (req, res) {
	Client.get(req.params.id).run().then(function (client) {
		res.send(client);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/', function (req, res) {
	var newClient = new Client(req.body);

	newClient.save().then(function (client) {
		res.send(client);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.put('/', function (req, res) {
	Client.get(req.body.id).run().then(function (client) {
		client.merge(req.body).save().then(function (client) {
			res.send(client);
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.delete('/:id', function (req, res) {
	Client.get(req.params.id).run().then(function (client) {
		client.delete().then(function () {
			res.status(200).end();
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});;
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

module.exports = app;