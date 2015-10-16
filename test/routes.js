var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Sections', function() {
    var url = 'http://localhost:8080';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect("mongodb://localhost/kktech2");
        done();
    });

    describe('Get All Sections', function() {
        it('', function(done) {
            request(url)
                .get('/api/section/all')

                .expect(200)


                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.res.body[0].should.have.property('_id');
                    res.res.body[0].should.have.property('url');
                    res.res.body[0].should.have.property('title');
                    res.res.body[0].should.have.property('description');

                    done();
                });
        });

    });

    describe('Create Section', function() {
        it('', function(done) {
           var data = {
               title:"test_title",
               description:"test_description"
           }


            request(url)
                .post('/api/section/test')
                .send(data)
                .expect(200)


                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.res.body.should.have.property('status');


                    done();
                });
        });

    });


    describe('Get section', function() {
        it('', function(done) {
            request(url)
                .get('/api/section/test')

                .expect(200)


                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.res.body.should.have.property('url');
                    res.res.body.should.have.property('title');
                    res.res.body.should.have.property('description');


                    done();
                });
        });

    });

    describe('Remove section', function() {
        it('', function(done) {
            request(url)
                .delete('/api/section/test')

                .expect(200)
                .expect('Content-Type', /json/)

                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.res.body.should.have.property('status');



                    done();
                });
        });

    });


});