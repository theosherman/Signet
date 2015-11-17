'use strict';

var app = require('express')();
var auth = require('../auth');
var r = require('../thinky').r;

var utility = require('../utility');

var Signature = require('../schema/signature');

app.get('/', auth, function (req, res) {
	r.table('Signature')
	.eqJoin('clientId', r.table('Client')).without({'right': {'id': true, 'createdAt': true}}).zip()
	.eqJoin('formId', r.table('Form')).without({'right': {'id': true, 'createdAt': true}}).zip()
	.run().then(function (signatures) {
		res.send(signatures);
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.get('/:id', function (req, res) {
	r.table('Signature')
	.filter({id: req.params.id})
	.eqJoin('clientId', r.table('Client')).without({'right': {'id': true, 'createdAt': true}}).zip()
	.eqJoin('formId', r.table('Form')).without({'right': {'id': true, 'createdAt': true}}).zip()
	.run().then(function (signatures) {
		if (signatures.length == 1)
			res.send(signatures[0]);
		else
			res.status(400).send({message: 'Unable to find signature'});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/', auth, function (req, res) {
	var newSignature = new Signature(req.body);

	newSignature.save().then(function (signature) {
		var promise = utility.sendEmail('Please sign this form.', 'Form signature requested', 'theo.a.sherman@gmail.com');
			promise.then(function (info) {
				console.log(info);
				res.send(signature);
			}).catch(function (err) {
				console.log(err);
				res.status(500).send({message: 'Error sending email notification to client.'});
			});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

app.put('/', auth, function (req, res) {
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

app.delete('/:id', auth, function (req, res) {
	Signature.get(req.params.id).run().then(function (signature) {
		signature.delete().then(function () {
			res.status(200).end();
		}).error(function (err) {
			utility.handleErrorResponse(res, err);
		});
	}).error(function (err) {
		utility.handleErrorResponse(res, err);
	});
});

module.exports = app;