
var crypto = require('crypto');
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


function login(req, res) {
    var hash = crypto.createHmac('sha512', config.secret)
    hash.update(req.body.pass)
    var hashPassword = hash.digest('hex')

    UserModel.find({mail:req.params.mail,pass:hashPassword}, function (err, user) {
        if(user.length==1){
            req.session.logged="logged";
            res.json({status:"succes"});

        }else{
            res.json({status:"error"});
        }

    });
}

function auth(req, res, next) {

    if(req.session.logged=="logged"){
        return next();
    }else{
        res.json({status:"not allowed"});
    }

}


function save(req,res){
    var hash = crypto.createHmac('sha512', config.secret)
    hash.update(req.body.pass)
    var hashPassword = hash.digest('hex')

    var todo = new UserModel({mail:req.params.mail,pass:hashPassword });

    todo.save(function (err) {
        console.log(err)
        res.json({status:"ok"});
    });
}







module.exports = handler;

