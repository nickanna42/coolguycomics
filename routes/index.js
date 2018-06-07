module.exports = function(app) {
    app.use(routes.middleware.forceHTTPS);
    app.get('/', function(req, res) {
        res.redirect('/index');
    });
};
