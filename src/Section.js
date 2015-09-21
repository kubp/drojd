function Section() {

    var mongo = loader.load("mongoose")
    var mongo = new mongo();

    this.schema = function () {
        var SectionSchema = new mongoose.Schema({
            url: String,
            title: String,
            description: String,
            headline: String,
            page: String,
            updated_at: {type: Date, default: Date.now}
        });

        return SectionSchema;

    }


    var SectionModel = mongoose.model('section', this.schema());


    /**
     *
     * @param req
     * @param condition
     * @param callback
     */
    this.load = function (req, condition, callback) {

        var params = mongo.get(req, condition);

        SectionModel.find(params, function (err, user) {
            callback(null, user)
        });
    }


    /**
     *
     * @param req
     * @param condition
     */
    this.add = function (req, condition) {
        var params = mongo.get(req, condition);

        var todo = new SectionModel(params);

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

module.exports = Section;

