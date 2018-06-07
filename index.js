'use strict';
require('dotenv').load();
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var https = require('https');
global.fs = require('fs');

var app = express();
app.set('case sensitive routing', false);
app.set('strict routing', false);
app.set('subdomain offset', 2);
app.set('x-powered-by', false);

app.engine('.hbs', exphbs({
    'extname': '.hbs',
    'layoutsDir': 'views/layouts',
    'partialsDir': 'views/partials'

}));
app.set('view engine', '.hbs');
app.use(express.static('public', {'extensions': ['html', 'htm']}));
var objectifyRoutes = require('./lib/objectifyRoutes.js');
global.routes = objectifyRoutes('routes');
require('./routes/index.js')(app);

var server = http.createServer(app);
server.listen(process.env.HTTP_PORT, process.env.DOMAIN);

var httpsOptions = {
    'pfx': fs.readFileSync('./coolguycomics.pfx'),
    'passphrase': ''
};
var secure_server = https.createServer(httpsOptions, app);
secure_server.listen(443, process.env.DOMAIN);
