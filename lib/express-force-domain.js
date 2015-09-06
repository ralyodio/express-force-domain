var url = require('url');

module.exports = function(force_hosts) {

  force_hosts = (force_hosts instanceof Array) ? force_hosts : [force_hosts];

  function isValidHost(host) {
    return force_hosts.indexOf(host) !== -1;
  }

  function getRedirectHost() {
    return force_hosts[0];
  }

	return function(req, res, next) {

		var requested_host = req.header('host');

		if (isValidHost(requested_host)) {
			next();
		} else {
      var redirectUrl = url.format(req.protocol + '://' + getRedirectHost() + req.path);
			res.redirect(301, redirectUrl);
		}

	};

}; 
