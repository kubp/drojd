var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require("./models/UserSchema")

var handler = function() {

  this.login = login;
  this.auth = auth;
  this.verifyUser = verify;

};



var UserModel = mongoose.model('User', User);


/**
 *
 * @param req
 * @param res
 */
function login(req, res) {

  if (typeof req.query.pass === "undefined" || typeof req.params.mail === "undefined" ) {
    return res.status(401).json({ status: 401, message: "Unauthorized", "doc":"No password or mail given." });
  }

  var salt = bcrypt.genSaltSync(10);
  var password = bcrypt.hashSync(req.query.pass, salt);


  UserModel.findOne({ mail: req.params.mail
  }, function(err, user) {
    
    if (user && bcrypt.compareSync(req.query.pass, user.pass)) {

        
        var token = jwt.sign({user: user._id
        }, config.secret, {
          expiresIn: config.jwtexpires
        });

         res.status(200).json({
          status: 200,
          message: "Authorized",
          apikey: token,
          userid: user._id
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


function verify(req, res) {

  res.status(200).json({status: 200, message: "Authorized"});

}




module.exports = handler;