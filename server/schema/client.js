var config = require('../config');
var thinky = require('thinky')(config.rethinkdb);
var type = thinky.type;
var r = thinky.r;

var Client = thinky.createModel("Client", {
    id: type.string(),
    name: type.string().required(),
	email: type.string().required().email(),
	createdAt: type.date().default(r.now())
});

module.exports = Client;