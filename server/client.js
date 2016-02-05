module.exports = function(app) {

var React = require("react")
var App = require("../browser/lib/components/Main")
var Section = require("./models/SectionSchema")
var Page = require("./models/PageSchema")

  app.get("/*",function(req,res){
  	 Section.find({}).populate("page").exec(function(error, posts) {
    

    var content = React.renderToString(React.createElement(App, { data: posts}));
      res.send("<!DOCTYPE html>"+ content +"")
  })
  	

  });


}