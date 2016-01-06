var Section = require("./models/SectionSchema")
var Page = require("./models/PageSchema")

var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;

};



function loadAll(req, res) {
  if(typeof req.query.q === "undefined"){
      var q = {};
    }else{
      var search = req.query.q.split(":");
      var query = search[0];
      var type = search[1];
      var q = { [type]: [query]};
    }


  Section.find(q).select('-__v').lean().populate('page').exec(function(err, page) {

    if (err) {
      return res.json({
        error: "ID doesn't exist"
      })
    }

    res.json({
      results: page.length,
      items: page
    });

  });
}


function load(req, res) {
  Section.find({
    _id: req.params.id
  }).select('-__v').lean().populate('page').exec(function(err, page) {

    if (err) {
      return res.json({
        error: "ID doesn't exist"
      })
    }

    res.json({
      results: page.length,
      items: page
    });

  });
}


function remove(req, res) {
  Section.findOneAndRemove({
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
  req.body.url ? content.url = req.body.url : null;
  req.body.section ? content.section = req.body.section : null;
  req.body.visible ? content.visible = req.body.visible : null;
  req.body.page ? content.page = req.body.section : null;

  PageModel.findOneAndUpdate({
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
  res.send("add")
}




module.exports = handler;