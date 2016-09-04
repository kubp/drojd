module.exports = function(app) {

var React = require("react")
var ReactDOM = require("react-dom/server")
var App = require("../browser/lib/Main")
var Page = require("./models/PageSchema")
var Logger = require("./lib/logger")


// Handle all requests without /api
app.get(/^\/(?!api(\/|$)).*$/,function(req,res){
  //purgeCache("rekt")

var rekt = require("rekt")

Logger.log(req)

// Check if URL exists
Page.findOne({url:req.path, visible: 1}).lean().exec().then(function(page) {

if(page){
  page.menu=cache.getCache()
  if(page.type == "blog_section"){
    Page.find({type:"post", section:page.section}).select("-raw_content -md_content").lean().exec().then(function(section) {
      page.posts=section;
      var content = ReactDOM.renderToString(React.createElement(rekt(), { data: page}));
      return res.send("<!DOCTYPE html>"+ content +"")

  });
  
  }else{
    var content = ReactDOM.renderToString(React.createElement(rekt(), { data: page}));
    return res.send("<!DOCTYPE html>"+ content +"")
}
}else{
  var content = ReactDOM.renderToString(React.createElement(rekt(), { data: {type:"404"}}));
  return res.status(404).send("<!DOCTYPE html>"+ content +"")
}

});



})



}