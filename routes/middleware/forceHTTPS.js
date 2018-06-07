var url = require('url');

module.exports = function(req, res, next) {
    if (req.protocol == 'http') {
        res.redirect(301, 'https://' + req.hostname + url.parse(req.url).path)
    } else {
        next();
    }
};
