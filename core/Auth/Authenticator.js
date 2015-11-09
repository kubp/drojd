
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var handler =function(){

    this.login = login;
    this.auth = auth;
    this.verifyUser=verify;

};


function schema(){
    var UserSchema = new mongoose.Schema({
        mail: String,
        pass: String,
        level: {type: Number, default: 1},
        updated_at: {type: Date, default: Date.now}
    });

    return UserSchema;
}

var UserModel = mongoose.model('user', schema());


/**
 *
 * @param req
 * @param res
 */
function login(req, res) {
    var hash = crypto.createHmac('sha512', config.secret);

    if(typeof req.query.pass === "undefined"){
        req.query.pass="";
    }
    hash.update(req.query.pass);
    var hashPassword = hash.digest('hex');


    UserModel.find({mail:req.params.mail,pass:hashPassword}, function (err, user) {
        if(user.length==1){

            var token = jwt.sign({ user: user[0].mail}, config.secret,{expiresIn: config.jwtexpires});
            res.status(200).json({status: 200, message: "Authorized", apikey:token});

        }else{
            res.status(401).json({status: 401, message: "Unauthorized"});
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

        if(err){
            res.status(401).json({status: 401, message: "Unauthorized"});

        }else{
            return next();
        }

    });

}


function verify(req,res){

    res.status(200).json({status: 200, message: "Authorized"});

}







module.exports = handler;

