var Section = require("./models/SectionSchema")
var BlogSection= require("./models/BlogSectionSchema")

var handler = function() {


  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;


};





function update(req, res) {
  var content = {};
  req.body.title ? content.title = req.body.title : null;
  req.body.description ? content.description = req.body.description : null;
  req.body.author ? content.author = req.body.author : null;

  req.body.section ? content.section = req.body.section : null;


  BlogSection.findOneAndUpdate({
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


  var blog_section = new BlogSection({
    title: req.body.title,
    description: req.body.description,
    headline: req.body.headline,
    author: req.body.author,
    section: req.body.section
   

  })

  var section = new Section({
    url: req.body.url,
    type: "blog_section",
    blogsection: blog_section._id
    
  })

  blog_section.save();
  section.save();

  res.json({status: "ok"})

}


function remove(req, res) {
  BlogSection.findOneAndRemove({
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
function loadAll(req, res) {
 BlogSection.findOne({_id:req.params.id}).exec(function(error, posts) {
    res.json(posts)
  })
}

module.exports = handler;