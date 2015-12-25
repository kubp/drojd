var handler = function() {

  this.getPage = load;
  this.getAllPages = loadAll;
  this.removePage = remove;
  this.updatePage = update;
  this.setPage = add;
  this.searchPage = search;
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
    _id: req.params.id
  }, function(err, page) {
    
    if (err){ 
      return res.json({error: "ID doesn't exist"})
    }

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
    url: req.body.url,
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
    _id: req.params.id
  }, function(err, doc) {
   
    if (err){ 
      return res.json({error: "ID doesn't exist"})
    }
    
    res.json({ status: "ok" });
  });
}


function update(req, res) {
  var content = {};
  req.body.url ? content.url = req.body.url : null
  req.body.title ? content.title = req.body.title : null
  req.body.description ? content.description = req.body.description : null
  req.body.headline ? content.headline = req.body.headline : null
  req.body.content ? content.content = req.body.content : null
  req.body.type ? content.type = req.body.type : null
  req.body.image ? content.image = req.body.image : null

  
 PageModel.findOneAndUpdate({ _id: req.params.id }, content, 
 {
    upsert: true
 }, 

  function(err, doc) {
    if (err) return res.json({ status: "not ok" })
    res.json({ status: "ok" })
  });
}


function search(req, res) {
  var search = req.query.q.split(":");
  var query = search[0];
  var type = search[1];

PageModel.find({
    [type]: [query]
  }, function(err, page) {
    
    if (err){ 
      return res.json({error: "ID doesn't exist"})
    }

    res.json({results: page.length, items:page});

  });

  
}


module.exports = handler;