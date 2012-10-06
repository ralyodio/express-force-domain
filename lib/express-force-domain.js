var url = require('url');

module.exports = function(force_url){
	var force_host = url.parse(force_url).host;

	return function(req, res, next) {
		var requested_host = req.header("host");

		if ( requested_host == force_host ) {
			next();
		} else {
			res.redirect(301, force_url+req.path);
		}
	};
}; 
