'use strict';

var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var jwt = require('express-jwt');
var bodyParser = require('body-parser');

var config = require('./config');

var auth = require('./routes/auth');
var clients = require('.routes/clients');
var forms = require('./routes/forms');

var app = express();

app.use(express.static('../client/app'));
app.use(express.static('../client'));

app.use(morgan('combined'));
app.use(cors());
app.use(jwt({ secret: config.secret }).unless({ path: ['/api/auth/login']}));
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError')
		res.status(err.status).send({message: err.message});
});
app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/clients', clients);
app.use('/api/forms', forms);
app.use(function(req, res, next) {
	res.status(404).end();
});

app.listen(config.express.port);