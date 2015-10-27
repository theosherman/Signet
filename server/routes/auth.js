'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var utility = require('../utility');

app.post('/login', function(req, res) {
	var token = jwt.sign({ name: 'Admin' }, 'secret', { expiresIn: "7 days"});
	res.send({ token: token });
});

module.exports = app;