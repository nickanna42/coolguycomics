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

var objectifyRoutes = require('./lib/objectifyRoutes.js');
global.routes = objectifyRoutes('routes');
app.use(express.static('public', {'extensions': ['html', 'htm']}));
if (process.env.NODE_ENV == 'production') {
  app.use(routes.middleware.forceHTTPS);
}
require('./routes/index.js')(app);

var server = http.createServer(app);
server.listen(process.env.HTTP_PORT, process.env.DOMAIN);

if (process.env.NODE_ENV == 'production') {
    var httpsOptions = {
        'pfx': fs.readFileSync('./coolguycomics.pfx'),
        'passphrase': ''
    };
    var secure_server = https.createServer(httpsOptions, app);
    secure_server.listen(443, process.env.DOMAIN);
}

console.log('server started');
