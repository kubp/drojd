var Comment = require("../models/CommentSchema")


var handler = function() {

  this.get = load;
  this.getAll = loadAll;
  this.remove = remove;
  this.update = update;
  this.set = add;


};





function load(req, res) {
  Comment.find({
    post_id: req.params.post
  }).exec(function(err, posts) {

    if (posts.length == 0) {
      return res.json(
        []
      );
    }

    res.json(posts);
  })
}


function loadAll(req, res) {
  Comment.find({}).exec(function(err, posts) {

    if (posts.length == 0) {
      return res.status(404).json({
        error: "Requested resources doesn't exist"
      });
    }

    res.json(posts);
  })
}

function remove(req, res) {
  Comment.findOneAndRemove({
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
  req.body.post_id ? content.post_id = req.body.post_id : null;
  req.body.author ? content.author = req.body.author : null;
  req.body.mail ? content.mail = req.body.mail : null;
  req.body.content ? content.content = req.body.content : null;
  req.body.permission ? content.permission = req.body.permission : null;

  Comment.findOneAndUpdate({
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

 
  var comment = new Comment({
    post_id: req.body.post_id,
    p_id: Math.random().toString(36).substring(12),
    author: req.body.author,
    mail: req.body.mail,
    profile_picture: req.body.profile_picture,
    reply: req.body.reply,
    reply_name: req.body.reply_name,
    content: req.body.content,
    permission: req.body.permission

    
})

  

  
  comment.save();

  res.status(200).json({status: "Resource created successfully"})



}





module.exports = handler;