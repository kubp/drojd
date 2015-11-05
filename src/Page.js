var handler =function(){

    this.getPage = load;
    this.getAllPages = loadAll;
    this.removePage = remove;
    this.updatePage = update;
    this.setPage = add;

};


function schema(){
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

var SectionModel = mongoose.model('section', schema());


/**
 * page
 * @param req
 */
function load(req, res) {

    SectionModel.find({url:req.params.url}, function (err, user) {
        res.json(user[0]);
    });
}

/**
 * Pages
 * @param req
 * @param res
 */

function loadAll(req, res) {
    SectionModel.find({}, function (err, user) {
        res.json(user);
    });
}


function add(req, res) {

    var todo = new SectionModel({url:req.params.url, title:req.body.title,description:req.body.description});

    todo.save(function (err) {

        res.json({status:"ok"})
    });

}


function remove(req,res) {

    SectionModel.findOneAndRemove({url:req.params.url}, function(err, doc){
        if (err) return res.send(500, { err: err });
        res.json({status:"ok"});
    });
}


function update(req,res) {
    SectionModel.findOneAndUpdate({url: req.params.url}, {
        url: req.body.url,
        title: req.body.title,
        description: req.body.description
    }, {upsert: true}, function (err, doc) {
        if (err) return res.json({status:"not ok"})

        res.json({status:"ok"})
    });
}




module.exports = handler;

