var http = require('http');
var express = require('express');
var expect = require('chai').expect;
var forceDomain = require('../lib/express-force-domain');

var serverPort = 4321;

describe('express-force-domain middleware', function() {

  var app, server;

  beforeEach(function() {
    app = express();
    server = app.listen(serverPort);
  });

  afterEach(function() {
    server.close();
  });

  it('responds with 301 when the requested domain does not match', function(done) {

    app.use(forceDomain('example.com'))

    request('wrong.example.com', function(res) {

      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(301);

      var body = ''
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        expect(res.headers.location).to.be.equal('http://example.com/');
        done();
      });

    })

  });

  it('responds with 200 when domain matches', function(done) {

    app.use(forceDomain('example.com'));
    app.get('/', function(req, res) {
      res.sendStatus(200);
      res.end();
    });

    request('example.com', function(res) {

      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);
      done();

    })

  });

});

function request(hostname, callback) {
  http.get({
    port: serverPort,
    hostname: '127.0.0.1',
    headers: {
      host: hostname
    }
  }, callback);
}
