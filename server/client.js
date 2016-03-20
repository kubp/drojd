module.exports = function(app) {

var React = require("react")
var ReactDOM = require("react-dom/server")
var App = require("../browser/lib/components/Main")

var Page = require("./models/PageSchema")


app.get(/^\/(?!api(\/|$)).*$/,function(req,res){

var Logger = require("./lib/logger")
Logger.log(req)


Page.findOne({url:req.path}).lean().exec().then(function(page) {

if(page){
  page.menu=cache.getCache()
  if(page.type == "blog_section"){
    Page.find({type:"post", section:page.section}).lean().exec().then(function(section) {
      page.posts=section;
      var content = ReactDOM.renderToString(React.createElement(App, { data: page}));
      return res.send("<!DOCTYPE html>"+ content +"")

  });
  
  }else{
    var content = ReactDOM.renderToString(React.createElement(App, { data: page}));
    return res.send("<!DOCTYPE html>"+ content +"")
}
}else{
  var content = ReactDOM.renderToString(React.createElement(App, { data: {type:"404"}}));
  return res.status(404).send("<!DOCTYPE html>"+ content +"")
}

});









})

}