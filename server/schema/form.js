var thinky = require('../thinky');
var type = thinky.type;
var r = thinky.r;

var Form = thinky.createModel("Form", {
    id: type.string(),
    title: type.string().required(),
	body: type.string(),
	createdAt: type.date().default(r.now())
});

module.exports = Form;