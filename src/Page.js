var Section = require("./models/SectionSchema")
var Page = require("./models/PageSchema")

var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;
  this.search = search;

};



function loadAll(req, res) {
  Page.find({}).exec(function(error, posts) {
    res.json(posts)
  })
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
  req.body.title ? content.title = req.body.title : null;
  req.body.description ? content.description = req.body.description : null;
  req.body.headline ? content.headline = req.body.headline : null;
  req.body.raw_content ? content.raw_content= req.body.raw_content : null;
  req.body.md_content ? content.md_content= req.body.md_content : null;
  req.body.keywords ? content.keywords = req.body.keywords : null;
  req.body.url ? content.url= req.body.url : null;

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
    description: req.body.description,
    headline: req.body.headline,
    raw_content: req.body.raw_content,
    md_content: req.body.md_content,
    keywords: req.body.keywords,
    url: req.body.url

  })

  var section = new Section({
    url: req.body.url,
    type: "page",
    page: page._id,
    section:req.body.section
  })

  page.save();
  section.save();

  res.status(200).json({status: "Resource created successfully"})



}

function search(req, res) {
  Page.find( {"$text": {
      "$search": req.query.search
    }}).exec(function(error, posts) {
    res.json(posts)
  })
}




module.exports = handler;