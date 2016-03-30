var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var should = require('should');
var assert = require('assert');


process.env.PORT = '8099'
var app = require("../server/app").getApp;




describe('GET /page/', function(){
  it('view', function(done){
    request(app)
      .get('/api/page')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
          
            res.body.should.be.a.Array()
            res.body[0].should.have.property("_id")
            res.body[0].should.have.property("url")
            res.body[0].should.have.property("type")
         
            done()
    });
  });

    it('404', function(done){
    request(app)
      .get('/api/page/0')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
          res.body.should.have.property("error")
          done()
    });
  });


   });



describe('POST /page/', function(){

    it('Unauthorized', function(done){
    request(app)
      .post('/api/page')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
          res.body.should.have.property("message")
          done()
    });
  });
});



describe('GET BlogSection query', function(){
  it('?q=blog_section:type', function(done){
    request(app)
      .get('/api/page?q=blog_section:type')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
        
            res.body.should.be.a.Array()
            res.body[0].should.have.property("_id")
            res.body[0].should.have.property("url")
            res.body[0].should.have.property("type")
       
            done()
    });
    });
 
});


describe('GET Post query', function(){
  it('?q=post:type', function(done){
    request(app)
      .get('/api/page?q=post:type')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
        
            res.body.should.be.a.Array()
            res.body[0].should.have.property("_id")
            res.body[0].should.have.property("url")
            res.body[0].should.have.property("type")
       
            done()
    });
    });
 });


describe('GET Comments', function(){
  it('correct data', function(done){
    request(app)
      .get('/api/comment')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
       .end(function (err, res) {
        if(err){
            throw err;
        }
        
            res.body.should.be.a.Array()
            res.body[0].should.have.property("_id")
            res.body[0].should.have.property("post_id")
            res.body[0].should.have.property("content")
       
            done()
    });
    });
 });

