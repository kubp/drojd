var Section = require("../models/SectionSchema")
var Blog = require("../models/BlogSchema")

var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;


};



function loadAll(req, res) {
  Blog.find({}).exec(function(error, posts) {
    res.json(posts)
  })
}

function load(req, res) {
  Blog.findOne({
    _id: req.params.id
  }).exec(function(err, posts) {

    if (posts.length == 0) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      });
    }

    res.json(posts);
  })
}


function remove(req, res) {
  Blog.findOneAndRemove({
    _id: req.params.id
  }, function(err, doc) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.status(200).json({
      status: "Resource removed successfully"
    });
  });
}

function update(req, res) {
  var content = {};
  req.body.title ? content.title = req.body.title : null;
  req.body.description ? content.description = req.body.description : null;
  req.body.headline ? content.headline = req.body.headline : null;
  req.body.raw_content ? content.raw_content= req.body.raw_content : null;
  req.body.md_content ? content.md_content= req.body.md_content : null;
  req.body.perex ? content.perex = req.body.perex : null;
  req.body.tags ? content.tags = req.body.tags : null;
  req.body.author ? content.author = req.body.author : null;
  req.body.section ? content.section = req.body.section : null;
  req.body.date ? content.date = req.body.date : null;
  req.body.url ? content.url= req.body.url : null;

  Blog.findOneAndUpdate({
      _id: req.params.id
    }, content, {
      upsert: true
    },

    function(err, doc) {
      if (err) {
        console.log(err)
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.status(200).json({
        status: "Resource updated successfully"
      })
    });
}

function add(req, res) {


  var blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    headline: req.body.headline,
    perex: req.body.perex,
    raw_content: req.body.raw_content,
    md_content: req.body.md_content,
    tags:req.body.tags,
    author: req.body.author,
    section:req.body.section,
    url: req.body.url
})

  var section = new Section({
    url: req.body.url,
    type: "blog",
    blog_section:req.body.section,
    blog: blog._id
  })

  blog.save();
  section.save();

  res.status(200).json({status: "Resource created successfully"})



}





module.exports = handler;