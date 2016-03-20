var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var should = require('should');
var assert = require('assert');


process.env.PORT = '8099'
process.env.DB = "mongodb://localhost/drojd_test"
var app = require("../server/app").getApp;


describe('Sections', function(){

describe('GET /page/', function(){
  it('section data', function(done){
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
   });


describe('GET Blog Section query', function(){
  it('correct data', function(done){
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
  it('correct data', function(done){
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


describe('GET Comments query', function(){
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



});