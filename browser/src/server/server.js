import express from "express";
import React from "react";
import Router from "react-router";
const app = express();


var Section = require("./models/SectionSchema")
var Blog = require("./models/BlogSchema")
var Page = require("./models/PageSchema")
var BlogSection= require("./models/BlogSectionSchema")

import App from "../components/Main";
// set up Jade
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
 
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/drojd");





app.get('*', function(req, res) {

Section.find({url:req.path}).select('-__v').lean().populate("page").populate("blog").populate("blogsection").exec(function(err, page) {
  
  if(page.length !=0){
    
    if(page[0].type=="blog_section"){
     
      Blog.find({section:page[0].blogsection.section}).exec(function(err, posts) {
      page[0].posts=posts;
      let content = React.renderToString(<App data={page}/>);
      res.send("<!DOCTYPE html>"+ content +"")
     
      })
    }else{
     
      let content = React.renderToString(<App data={page}/>);
      res.send("<!DOCTYPE html>"+ content +"")
    
    }
  }else{
  
  res.send("noo");
  
  }
  })
})



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
