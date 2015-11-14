var jwt = require('express-jwt');
var config = require('./config');

module.exports = jwt({ secret: config.secret }); //.unless({ path: ['/api/auth/login','/api/sign']})