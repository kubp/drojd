var handler = function() {

  this.getPage = load;
  this.getAllPages = loadAll;
  this.removePage = remove;
  this.updatePage = update;
  this.setPage = add;
  this.getPageSection = section;
};


function schema() {
  var PageSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    headline: String,
    content: String,
    type: String,
    image: String,
    sections: [String],
    allow: String,
    updated_at: {
      type: Date,
      default: Date.now
    }
  });

  return PageSchema;
}

var PageModel = mongoose.model('page', schema());


/**
 * page
 * @param req
 */
function load(req, res) {

  PageModel.find({
    url: req.query.url
  }, function(err, page) {
    
    if(page.length == 0){
      res.json({status:"not found"});
    }else{
      res.json(page[0]);
    }
    

  });
}

/**
 * Pages
 * @param req
 * @param res
 */

function loadAll(req, res) {
  PageModel.find({}, function(err, page) {
    res.json(page);
  });
}

function add(req, res) {

  var page = new PageModel({
    url: req.query.url,
    title: req.body.title,
    description: req.body.description,
    headline: req.body.headline,
    content: req.body.content,
    type:req.body.type,
    sections: req.body.sections,
    image:req.body.image,
    allow:req.body.allow
});

  page.save(function(err) {
    res.json({status: "ok"})
  });

}


function remove(req, res) {

  PageModel.findOneAndRemove({
    url: req.query.url
  }, function(err, doc) {
   
    if (err) return res.send(500, {
      err: err
    });
    res.json({ status: "ok" });
  });
}


function update(req, res) {
 
 PageModel.findOneAndUpdate({ url: req.query.url }, {
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    headline: req.body.headline,
    content: req.body.content,
    section: req.body.section,
    type:req.body.type,
    image:req.body.image
 }, 

 {
    upsert: true
 }, 

  function(err, doc) {
    if (err) return res.json({ status: "not ok" })
    res.json({ status: "ok" })
  });
}


function section(req,res){
  PageModel.find({ sections: req.query.section}, function(err, page) {
    
    if(page.length == 0){
      res.json({status:"not found"});
    }else{
      res.json(page);
    }
    });

}


module.exports = handler;