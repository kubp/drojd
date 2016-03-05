module.exports = function(app) {

var React = require("react")
var ReactDOM = require("react-dom/server")
var App = require("../browser/lib/components/Main")
var Section = require("./models/SectionSchema")
var Page = require("./models/PageSchema")
var Post= require("./models/PostSchema")
var PageSection = require("./models/BlogSectionSchema")

app.get(/^\/(?!api(\/|$)).*$/,function(req,res){

var Logger = require("./lib/logger")
Logger.log(req)



Section.findOne({url:req.path, visible:1}).populate("page").populate("post").populate("blogsection").lean().exec(function(error, posts) {

  if(posts){
    posts.menu=cache.getCache()
    if(posts.type=="blog_section"){
      Post.find({section:posts.blogsection.section, visible: 1}).exec(function(err, post) {
      posts.posts=post;
      
      var content = ReactDOM.renderToString(React.createElement(App, { data: posts}));
      return res.send("<!DOCTYPE html>"+ content +"")
      })
    }else{
   
      if(posts.post){
        if(posts.post.visible==0){
      var content = ReactDOM.renderToString(React.createElement(App, { data: {type:"404"}}));
      return res.send("<!DOCTYPE html>"+ content +"")
        }
       
      }

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