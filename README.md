Express Force Domain
===========

Force Express 3.x to use a specific domain. Good for adding or removing www. and handling parked domains that redirect to your main domain.

Installing
----

	npm install express-force-domain --save

--save will add the package to your package.json file automatically.


Usage
----

Setup a middleware before your routes all defined, and pass the app object along with the full url (including port if other than 80):

	app.use( require('express-force-domain')(app, 'http://example.com') );
	app.use( require('express-force-domain')(app, 'http://www.example.com') );
	app.use( require('express-force-domain')(app, 'http://example.com:8080') );
	app.use( require('express-force-domain')(app, 'http://www.example.com:8080') );


More info
----

* http://nodejs.org/
* http://expressjs.com/
* http://npmjs.org/

