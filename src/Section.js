var handler = function() {

  this.getSection= load;
  this.getAllSections = loadAll;
  this.removeSection = remove;
  this.updateSection = update;
  this.setSection = add;

};


function schema() {
  var SectionSchema = new mongoose.Schema({
    name: String,
    description: String,
    title: String,
    updated_at: {
      type: Date,
      default: Date.now
    }
  });

  return SectionSchema;
}

var SectionModel = mongoose.model('section', schema());





function load(req, res) {

  SectionModel.find({
    name: req.query.name
  }, function(err, page) {
    
    if(page.length == 0){
      res.json({status:"not found"});
    }else{
      res.json(page[0]);
    }
    

  });
}


function loadAll(req, res) {
  SectionModel.find({}, function(err, page) {
    res.json(page);
  });
}


function add(req, res) {

  var page = new SectionModel({
    name: req.query.name,
    description: req.body.description,
    title: req.body.title,
});

  page.save(function(err) {
    res.json({status: "ok"})
  });

}


function remove(req, res) {

  SectionModel.findOneAndRemove({
    url: req.query.url
  }, function(err, doc) {
   
    if (err) return res.send(500, {
      err: err
    });
    res.json({ status: "ok" });
  });
}


function update(req, res) {
 
  SectionModel.findOneAndUpdate({name: req.query.name}, 
  {
     name: req.body.name,
    description: req.body.description,
    title: req.body.title,
 }, 

 {
    upsert: true
 }, 

  function(err, doc) {
    if (err) return res.json({ status: "not ok" })
    res.json({ status: "ok" })
  });
}



module.exports = handler;