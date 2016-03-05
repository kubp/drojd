var Menu = require("../models/MenuSchema")


var handler = function() {


  this.load = load;
  this.loadAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.add = add;


};

function update(req, res) {

  var content = {};
  req.body.href? content.href = req.body.href : null;
  req.body.text ? content.text = req.body.text : null;
  req.body.title ? content.title = req.body.title : null;
  req.body.active ? content.active = req.body.active : null;
  req.body.menu_id ? content.menu_id = req.body.menu_id : null;


  Menu.findOneAndUpdate({
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
    cache.init()
    res.status(200).json({
        status: "Resource updated successfully"
      })
    });
}

function add(req, res) {


  var menu = new Menu({
    href:req.body.href,
    text :req.body.text,
    title:req.body.title,
    active: req.body.active,
    menu_id:req.body. menu_id
    })



  menu.save();
  cache.init()
  res.status(200).json({status: "Resource created successfully"})

}


function remove(req, res) {
 

  Menu.findOneAndRemove({
    _id: req.params.id
  }, function(err, doc) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }
    cache.init()
    res.status(200).json({
      status: "Resource removed successfully"
    });
  });
}


function load(req, res) {
  Menu.findOne({_id: req.params.id}).exec(function(error, posts) {
    res.json(posts)
  })
}

function loadAll(req, res) {
  Menu.find().exec(function(error, posts) {
    res.json(posts)
  })
}

module.exports = handler;