var Section = require("../models/SectionSchema")
var Page = require("../models/PageSchema")

var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.search = search;

};

var b=require("./queryBuilder")


function loadAll(req, res) {


  Section.find(
          b.query(req.query.q), 
          b.ignore(), 
          b.paginator(req.query.page,req.query.per_page))
         .lean()
         .populate('page')
         .populate('blogsection')
         .populate('blog')
         .exec(function(err, page) {

    if (err) {
      return res.json({})
    }
    res.json(page);

  });



}


function load(req, res) {
  Section.find({
    _id: req.params.id
  }).select('-__v').lean().populate('page').exec(function(err, page) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.json(page[0]);

  });
}


function remove(req, res) {
  Section.findOneAndRemove({
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
  req.body.url ? content.url = req.body.url : null;
  req.body.section ? content.section = req.body.section : null;
  req.body.visible ? content.visible = req.body.visible : null;
  req.body.page ? content.page = req.body.section : null;

  Section.findOneAndUpdate({
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

function search(req, res) {
  res.send("add")
}




module.exports = handler;