
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

