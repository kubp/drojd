var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var should = require('should');
var assert = require('assert');


process.env.PORT = '8099'
var app = require("../server/app").getApp;


describe('Sections', function(){

describe('GET /section/', function(){
  it('section data', function(done){
    request(app)
      .get('/api/section')
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


describe('GET /section/ query', function(){
  it('search data', function(done){
    request(app)
      .get('/api/section?q=page:type')
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



});