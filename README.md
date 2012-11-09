Express Force Domain
===========

Force Express 3.x or Connect to use a specific domain. Good for adding or removing the www. from your web app and handling parked domains that redirect to your main domain. You just have to pass in the preferred url to your homepage (ie: http://www.example.com).

For test environments, you need to pass port as well if using something other than port 80. (ie: http://www.example.com:8080).

If example2.com points to the same IP as example1.com you can handle the redirect using express-force-domain.

Installing
----

	npm install express-force-domain --save

--save will add the package to your package.json file automatically.

See the package on npm: https://npmjs.org/package/express-force-domain

Usage with Connect or Express
----

You can also use as middleware with connect and app.use(), if you are not using express. 

Setup a middleware in app.js before all your other routes are defined, and pass the full url to the homepage as an argument: (including port if other than 80):

	app.use( require('express-force-domain')('http://www.example.com') );

or

	var	force = require('express-force-domain');
	app.use( force('http://www.example.com') );

or alternative port

	app.use( force('http://example.com:8080') );

Note, be sure to put the app.use statement above the app.router.

	var cfg = require('./config')
	, force = require('express-force-domain');

	app.use( force(cfg.site_url) );
	...
	app.use(app.router);

Alternative:

	var site_url = 'http://www.example.com'
	, force = require('express-force-domain');

	app.use( force(site_url) );


or you can pass the url for the homepage manually, (four examples, pick one):

	app.use( require('express-force-domain')('http://example.com') );
	app.use( require('express-force-domain')('http://example.com:8080') );
	app.use( require('express-force-domain')('http://www.example.com') );
	app.use( require('express-force-domain')('http://www.example.com:8080') );

For parked domains you want to redirect, this assumes example2.com points to the same ip as example.com, and you prefer your app live at http://www.example.com:

	app.use( require('express-force-domain')('http://www.example.com') );

Requests for http://example2.com, http://www.example2.com, and http://example.com will all redirect to http://www.example.com.

More info
----

* http://nodejs.org/
* http://expressjs.com/
* http://npmjs.org/
* http://www.senchalabs.org/connect/

LICENSE
----

(The MIT License)
