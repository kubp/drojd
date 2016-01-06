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
      return res.json({
        error: "no results"
      });
    }

    res.json(posts[0]);
  })
}


function remove(req, res) {
  Page.findOneAndRemove({
    _id: req.params.id
  }, function(err, doc) {

    if (err) {
      return res.json({
        error: "ID doesn't exist"
      })
    }

    res.json({
      status: "ok"
    });
  });
}

function update(req, res) {
  var content = {};
  req.body.title ? content.title = req.body.title : null;
  req.body.description ? content.description = req.body.description : null;
  req.body.headline ? content.headline = req.body.headline : null;
  req.body.content ? content.content = req.body.content : null;
  req.body.keywords ? content.keywords = req.body.keywords : null;


  Page.findOneAndUpdate({
      _id: req.params.id
    }, content, {
      upsert: true
    },

    function(err, doc) {
      if (err) return res.json({
        status: "not ok"
      })
      res.json({
        status: "ok"
      })
    });
}

function add(req, res) {


  var page = new Page({
    title: req.body.title,
    description: req.body.description,
    headline: req.body.headline,
    content: req.body.content,
    keywords: req.body.keywords

  })

  var section = new Section({
    url: req.body.url,
    type: "page",
    page: page._id
  })

  page.save();
  section.save();

  res.json({status: "ok"})



}

function search(req, res) {
  res.send("search")
}




module.exports = handler;