var Page = require("../models/PageSchema")

var handler = function() {
  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;
  this.search = search;
};

var b=require("./queryBuilder")

function loadAll(req, res) {

    Page.find(b.query(req.query.q), 
          b.ignore(), 
          b.paginator(req.query.page,req.query.per_page)
          ).sort(b.sort(req.query.sort)).lean().then(function(docs) {

    docs = b.doc(req,docs)

    res.json(docs)
  }, function(err) {});

 
}

function load(req, res) {
  Page.find({
    _id: req.params.id
  }).exec(function(err, posts) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.json(posts[0]);
  })
}


function remove(req, res) {
  Page.findOneAndRemove({
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
  content.post ={};
  req.body.title ? content.title = req.body.title : null;
  req.body.type ? content.type = req.body.type : null;
  req.body.section ? content.section = req.body.section : null;
  req.body.headline ? content.headline = req.body.headline : null;
  req.body.description ? content.description = req.body.description : null;
  req.body.raw_content ? content.raw_content= req.body.raw_content : null;
  req.body.md_content ? content.md_content= req.body.md_content : null;
  req.body.url ? content.url= req.body.url : null;
  req.body.visible ? content.visible= req.body.visible : null;
  req.body.image ? content.image= req.body.image : null;

  req.body.perex ? content.post.perex= req.body.perex : null;
  req.body.author ? content.post.author= req.body.author : null;
  req.body.tags ? content.post.tags= req.body.tags : null;
    req.body.comments ? content.post.comments= req.body.comments : null;

  Page.findOneAndUpdate({
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


  var page = new Page({
    title: req.body.title,
    type: req.body.type,
    section: req.body.section,
    headline: req.body.headline,
    description: req.body.description,
    raw_content: req.body.raw_content,
    md_content: req.body.md_content,
    url: req.body.url,
    visible: req.body.visible,
    post:{
      perex: req.body.perex,
      author: req.body.author,
      tags: req.body.tags,
      author: req.body.author,
      comments: req.body.comments

    },
    image: req.body.image
  })


  page.save();


  res.status(200).json({status: "Resource created successfully"})



}

function search(req, res) {
  Page.find( {visible:1, "$text": {
      "$search": req.query.search
    }}, "-visible").exec(function(error, posts) {
    res.json(posts)

    console.log(error)
  })
}




module.exports = handler;