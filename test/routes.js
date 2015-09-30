var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Routing', function() {
    var url = 'http://localhost:8080';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect("mongodb://localhost/kktech2");
        done();
    });

    describe('Account', function() {
        it('', function(done) {
            request(url)
                .get('/page/hlavni')
                .expect(200)


                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear

                    done();
                });
        });

    });
});