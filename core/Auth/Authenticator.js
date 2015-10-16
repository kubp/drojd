
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var handler =function(){

    this.login = login;
    this.auth = auth;
    this.setUser=save;

}


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
    var hash = crypto.createHmac('sha512', "f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d")

    if(typeof req.query.pass === "undefined"){
        req.query.pass="";
    }
    hash.update(req.query.pass)
    var hashPassword = hash.digest('hex')


    UserModel.find({mail:req.params.mail,pass:hashPassword}, function (err, user) {
        if(user.length==1){

            var token = jwt.sign({ user: 'test'}, 'kocicka',{expiresIn: 60*60});
            res.json({status:"succes",apikey:token});

        }else{
            res.json({status:"error"});
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

    jwt.verify(token, "kocicka", function(err, decoded) {

        if(err){
            res.json({message:"Problem occurred. Exterminate Exterminate"})

        }else{
            return next();
        }

    });

}

/**
 *
 * @param req
 * @param res
 */
function save(req,res){
    var hash = crypto.createHmac('sha512', "f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d")
    hash.update(req.body.pass)
    var hashPassword = hash.digest('hex')

    var todo = new UserModel({mail:req.params.mail,pass:hashPassword });

    todo.save(function (err) {
        console.log(err)
        res.json({status:"ok"});
    });
}







module.exports = handler;

