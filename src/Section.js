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


    this.load = function (req, condition, callback) {

        var params = mongo.get(req, condition);

        SectionModel.find({}, function (err, user) {
            callback(null, user)
        });
    }


    this.add = function (req, condition) {

        var todo = new SectionModel({
            url: "hlavni",
            title: "asd",
            description: "asd",
            headline: "asd",
            page: "asdasd"
        });

        todo.save(function (err) {
            console.log(err)
        });


    }
}

module.exports = Section;

