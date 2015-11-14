'use strict';

var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var auth = require('./auth');

var config = require('./config');

var authRoute = require('./routes/auth');
var clientsRoute = require('./routes/clients');
var formsRoute = require('./routes/forms');
var signaturesRoute = require('./routes/signatures');
var signRoute = require('./routes/sign');

var app = express();

// static files.
app.use(express.static('../client/app'));
app.use(express.static('../client'));

// middleware.
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

// routes.
app.use('/api/auth', authRoute);
app.use('/api/clients', auth, clientsRoute);
app.use('/api/forms', auth, formsRoute);
app.use('/api/signatures', signaturesRoute);
app.use('/api/sign', signRoute);

// authentication middleware has denied access.
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError')
		res.status(err.status).send({message: err.message});
});

// 404 not found.
app.use(function(req, res, next) {
	res.status(404).end();
});

// start.
app.listen(config.express.port);