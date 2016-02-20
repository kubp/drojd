module.exports = function(app) {

var React = require("react")
var ReactDOM = require("react-dom/server")
var App = require("../browser/lib/components/Main")
var Section = require("./models/SectionSchema")
var Page = require("./models/PageSchema")
var Blog = require("./models/BlogSchema")
var PageSection = require("./models/BlogSectionSchema")

app.get("/*",function(req,res){
Section.findOne({url:req.path}).populate("page").populate("blog").populate("blogsection").exec(function(error, posts) {
  
  if(posts){

    if(posts.type=="blog_section"){
      Blog.find({section:posts.blogsection.section}).exec(function(err, post) {
      posts.posts=post;
      
      var content = ReactDOM.renderToString(React.createElement(App, { data: posts}));
      return res.send("<!DOCTYPE html"+ content +"")
      })
    }else{
      var content = ReactDOM.renderToString(React.createElement(App, { data: posts}));
      res.send("<!DOCTYPE html>"+ content +"")
    }
    }else{
      var content = ReactDOM.renderToString(React.createElement(App, { data: {type:"404"}}));
      res.send("<!DOCTYPE html>"+ content +"")
    }
  })


});


}