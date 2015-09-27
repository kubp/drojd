var crypto = require('crypto');
function user() {

    var mongo = loader.load("mongoose")
    var mongo = new mongo();

    this.schema = function () {
        var UserSchema = new mongoose.Schema({
            mail: String,
            pass: String,
            level: String,
            updated_at: {type: Date, default: Date.now}
        });

        return UserSchema;

    }

    try {
        var UserModel = mongoose.model('user', this.schema());
    }catch(e){
        var UserModel = mongoose.model('user');
    }

    /**
     *
     * @param req
     * @param condition
     * @param callback
     */
    this.load = function (req, condition, callback) {

        var params = mongo.get(req, condition);

        UserModel.find(params, function (err, user) {
            callback(null, user)
        });
    }


    this.loadPromise = function(mail,pass){
        if(pass===undefined){pass="";}
        var hash = crypto.createHmac('sha512', "f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d")
        hash.update(pass)
        var hashPassword = hash.digest('hex')

        var promise = UserModel.find({mail:mail,pass:hashPassword}).exec();

        return promise;

    }

    /**
     *
     * @param req
     * @param condition
     */
    this.add = function (req, condition) {
        var params = mongo.get(req, condition);

        var hash = crypto.createHmac('sha512', "f1749991244c2106cdfe6b85ddf3582e915edb553a1af7d")
        hash.update(params.pass)
        var hashPassword = hash.digest('hex')

        params.pass=hashPassword;

        var todo = new UserModel(params);

        todo.save(function (err) {
            console.log(err)
        });

    }

    /**
     *
     * @param req
     * @param condition
     */
    this.update = function (req, condition) {
        var params = mongo.get(req, condition);

        var todo = new SectionModel(params);

        SectionModel.findOneAndUpdate({url:"hlavni"}, {title:"title"}, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            console.log("succesfully saved");
        });

    }

    /**
     *
     * @param req
     * @param condition
     */
    this.delete = function (req, condition) {
        var params = mongo.get(req, condition);

        var todo = new SectionModel(params);

        SectionModel.findOneAndRemove({url:"hlavni"}, function(err, doc){
            if (err) return res.send(500, { error: err });
            console.log("succesfully removed");
        });

    }




}

module.exports = user;

