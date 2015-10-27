var config = require('../config');
var thinky = require('thinky')(config.rethinkdb);
var type = thinky.type;
var r = thinky.r;

var Signature = thinky.createModel("Signature", {
    id: type.string(),
	clientId: type.string().required(),
    formId: type.string().required(),
	clientSignature: type.string(),
	ownerSignature: type.string(),
	pdfData: type.string(),
	createdAt: type.date().default(r.now())
});

module.exports = Signature;