var User = require("../models/UserSchema")
var bcrypt = require('bcryptjs');

var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;

};



function loadAll(req, res) {
  User.find({}).select("-pass").exec(function(error, posts) {
    res.json(posts)
  })
}

function load(req, res) {
  User.find({
    _id: req.params.id
  }).select("-pass").exec(function(err, posts) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.json(posts[0]);
  })
}


function remove(req, res) {
  User.findOneAndRemove({
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
  var salt = bcrypt.genSaltSync(10);
var password = bcrypt.hashSync(req.body.pass, salt);

  var content = {};
  req.body.mail ? content.mail = req.body.mail : null;
  content.pass = password
  req.body.name ? content.name = req.body.name : null;
  req.body.profile_picture ? content.profile_picture = req.body.profile_picture : null;
  req.body.permission ? content.permission = req.body.permission : null;


  User.findOneAndUpdate({
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

var salt = bcrypt.genSaltSync(10);
var password = bcrypt.hashSync(req.body.pass, salt);

  var user = new User({
    mail: req.body.mail,
    pass: password,
    name: req.body.name,
    profile_picture: req.body.profile_picture,
    permission: req.body.permission,
 

  })



  user.save();

  res.status(200).json({status: "Resource created successfully"})



}





module.exports = handler;