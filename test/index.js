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

    request('wrong.example.com')
    .then(function(res) {

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

    });

  });

  it('responds with 200 when domain matches', function(done) {

    app.use(forceDomain('example.com'));
    app.get('/', function(req, res) {
      res.sendStatus(200);
      res.end();
    });

    request('example.com')
    .then(function(res) {

      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);
      done();

    });

  });

  it('can be used with path prefixes', function(done) {

    app.get('/baz', function(req, res) {
      res.sendStatus(200);
      res.end();
    });

    app.use('/foo', forceDomain('example.com'));
    app.get('/foo/bar', function(req, res) {
      res.sendStatus(200);
      res.end();
    });

    request('example.com', '/foo/bar')
    .then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);

      return request('example.com', '/baz');
    }).then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);

      return request('wrong.example.com', '/foo/bar');
    })
    .then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(301);

      return request('wrong.example.com', '/baz');
    })
    .then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);
      done();
    });

  });

  it('can allow multiple hosts with the first as redirect target', function(done) {


    app.use(forceDomain([
      'a.example.com',
      'b.example.com'
    ]));
    app.get('/', function(req, res) {
      res.sendStatus(200);
      res.end();
    });

    request('a.example.com', '/')
    .then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);

      return request('b.example.com', '/');
    }).then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(200);

      return request('c.example.com', '/');
    }).then(function(res) {
      expect(res).to.exist;
      expect(res.statusCode).to.be.equal(301);

      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        expect(res.headers.location).to.be.equal('http://a.example.com/');
        done();
      });

    })

  });

});

function request(hostname, path, callback) {

  path = path || '/';

  var q = new Promise(function(resolve, reject) {
    if(!callback) {
      callback = resolve;
    }
  });

  http.get({
    port: serverPort,
    hostname: '127.0.0.1',
    path: path,
    headers: {
      host: hostname
    }
  }, callback);

  return q;

}
