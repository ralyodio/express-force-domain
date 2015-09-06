var url = require('url');

module.exports = function(force_host) {

	return function(req, res, next) {

		var requested_host = req.header('host');

		if (requested_host === force_host) {
			next();
		} else {
      var redirectUrl = url.format(req.protocol + '://' + force_host + req.path);
			res.redirect(301, redirectUrl);
		}

	};

}; 
