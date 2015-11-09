
var crypto = require('crypto');
var handler =function(){


    this.setUser=add;
    this.getUser=load;
    this.getAllUsers=loadAll;
    this.deleteUser =remove;
    this.updateUser=update;

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

try {
    var UserModel = mongoose.model('user', schema());
}catch (e){
    var UserModel = mongoose.model('user');
}




function load(req, res) {

    UserModel.find({url:req.params.url}, function (err, user) {
        res.json(user[0]);
    });
}


function loadAll(req, res) {
    SectionModel.find({}, function (err, user) {
        res.json(user);
    });
}


function add(req, res) {

    var todo = new UserModel({url:req.params.url, title:req.body.title,description:req.body.description});

    todo.save(function (err) {

        res.json({status:"ok"})
    });

}


function remove(req,res) {

    UserModel.findOneAndRemove({url:req.params.url}, function(err, doc){
        if (err) return res.send(500, { err: err });
        res.json({status:"ok"});
    });
}


function update(req,res) {
    UserModel.findOneAndUpdate({url: req.params.url}, {
        url: req.body.url,
        title: req.body.title,
        description: req.body.description
    }, {upsert: true}, function (err, doc) {
        if (err) return res.json({status:"not ok"})

        res.json({status:"ok"})
    });
}







module.exports = handler;

