module.exports = function(app){

    var user = require("./../src/User");
    var user = new user();


    app.get('/user/:mail', function(req, res){


        user.load(req,["mail"], function(err, pages){
            res.json(pages);
        });

    });


    app.post('/user/:mail', function(req, res){

        //console.log(req.body.title);
        user.add(req,["mail","pass","level"]);
        res.json({status:"ok"});

    });

    app.put('/user/:mail', function(req, res){

        //console.log(req.body.title);
        user.update(req,["mail","pass","level"]);
        res.json({status:"ok"});

    });

    app.delete('/user/:mail', function(req, res){

        //console.log(req.body.title);
        user.delete(req,["mail","pass","level"]);
        res.json({status:"ok"});

    });


}
