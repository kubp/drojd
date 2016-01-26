var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require("../models/UserSchema")

var handler = function() {

  this.login = login;
  this.auth = auth;
  this.authAdmin = authAdmin;
  this.verifyUser = verify;
  this.add = add;
};



var UserModel = mongoose.model('User', User);


/**
 *
 * @param req
 * @param res
 */
function login(req, res) {

  if (typeof req.body.pass === "undefined" || typeof req.body.mail === "undefined" ) {
    return res.status(400).json({ status: 400, message: "Bad Request", "doc":"No password or mail given." });
  }

  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync(req.body.pass, salt);


  UserModel.findOne({ mail: req.body.mail
  }, function(err, user) {
    
    if (user && bcrypt.compareSync(req.body.pass, user.pass)) {

        
        var token = jwt.sign({user: user._id, permission: user.permission
        }, config.secret, {
          expiresIn: config.jwtexpires
        });

         res.status(200).json({
          status: 200,
          message: "Authorized",
          apikey: token,
          user_id: user._id
         });
      
    } else {
      res.status(401).json({
        status: 401,
        message: "Unauthorized"
      });
    }


  });
}



/**
 *
 * @param req
 * @param res
 * @param next
 */
function auth(req, res, next) {
  var token = req.params.apikey || req.body.apikey || req.query.apikey || req.headers['x-access-token'];

  jwt.verify(token, config.secret, function(err, decoded) {

    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized"
      });

    } else {
      return next();
    }

  });

}

function authAdmin(req, res, next) {
  var token = req.params.apikey || req.body.apikey || req.query.apikey || req.headers['x-access-token'];
  jwt.verify(token, config.secret, function(err, decoded) {
  
  var decoded = jwt.decode(token);

   if (err) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized"
      });

    } else if(decoded.permission != 2){
    
      return res.status(403).json({
        status: 403,
        message: "Forbidden"});
    
    }else{
      return next();
    
    }

  });

}




function verify(req, res) {

  res.status(200).json({status: 200, message: "Authorized"});

}

function add(req, res){
  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync("test", salt);
  user=new UserModel({
    mail:"test",
    pass: password,
    permission: 1
  })
  user.save();
}


module.exports = handler;