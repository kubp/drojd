module.exports = function(app) {

var React = require("react")
var App = require("../browser/lib/components/Simple")

  app.get("/",function(req,res){
  	
  	var content = React.renderToString(React.createElement(App, { data: "page" }));
      res.send("<!DOCTYPE html>"+ content +"")

  });


}