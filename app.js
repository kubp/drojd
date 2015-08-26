//### Packages ###
var express = require('express');
var S = require('string');
var stylus = require('stylus');
var Cookies = require("cookies");

var compress = require('compression'); //GZIP
var mongojs = require("mongojs"); //Database

var app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var auth = require('./lib/Authenticator');

//var webalize = require('./lib/webalize');   ### EDIT
//var routes = require('./routes'); //Load rout  #Magixs starts here
//routes.e(app);


//Database connect
uri = "mongodb://127.0.0.1:27017/kktech",
    db = mongojs.connect(uri, ["pages", "menu", "users"]);

app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/kktech'
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));




app.use(function(req, res, next) {
    //console.log(req);
    auth.init(req);
    next();
});




//### MIDDLEWARES ###
app.use(stylus.middleware({
    src: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.use(compress());

//Remove Express.js header
app.use(function(req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

//### SETY ###
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('json spaces', 40); //Pretty JSON


//### ROUTES ###

app.get('/login', function(req, res) {

    auth.login("test", "test");

    res.send("nic");
    //console.log(req.session.user);
});




app.get('/admin', function(req, res) {

    db.pages.find({}, function(err, docs) {
        //console.log(docs);
        res.render("admin", {
            pages: docs
        });

    });
    console.log(auth.auth());

});




app.get('/admin/page/', function(req, res) {

    db.pages.find({
        url: req.query.url
    }, function(err, docs) {
        //console.log(docs[0]);
        res.render("edit", {
            edit: docs[0],
            url: req.query.url
        })

    });


});

app.get('/admin/page/new/', function(req, res) {

    res.render("new")



});

app.get('/admin/page/add/', function(req, res) {


    var url = req.query.url;
    var title = req.query.title;
    var description = req.query.description;
    var headline = req.query.headline;
    var page = req.query.page;


    db.pages.insert({
            url: url,
            title: title,
            description: description,
            headline: headline,
            page: page
        },
        function(err, saved) {
            if (err || !saved) console.log("User not saved");
            else console.log("User saved");
        });
    res.redirect("/admin/");
    res.send("das");
});




app.get('/admin/page/update/', function(req, res) {


    var url = req.query.url;
    var title = req.query.title;
    var description = req.query.description;
    var headline = req.query.headline;
    var page = req.query.page;


    db.pages.update({
            url: req.query.lurl
        }, {
            url: url,
            title: title,
            description: description,
            headline: headline,
            page: page
        },
        function(err, saved) {
            if (err || !saved) console.log("User not saved");
            //else console.log("User saved");
        });
    res.redirect("/admin/");
});



app.get('/admin/menu', function(req, res) {

    db.menu.find(function(err, docs) {
        //console.log(docs);
        //res.render("edit",{edit:docs[0], url:req.query.url})
        res.render("menu", {
            menu: docs
        });
    });



});


app.get('/admin/add', function(req, res) {
    var name = req.query.name;
    var url = req.query.url;
    db.menu.insert({
            url: url,
            name: name
        },
        function(err, saved) {
            if (err || !saved) console.log("User not saved");
            else console.log("User saved");
        });

    res.redirect("menu");

});


app.get('/admin/menu/update', function(req, res) {
    var name = req.query.name;
    var url = req.query.url;
    var id = req.query.id;
    console.log(id);

    if (name != undefined) {
        db.menu.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    name: name
                }
            },
            new: true
        }, function(err, doc, lastErrorObject) {
            // doc.tag === 'maintainer'
        });
    }

    if (url != undefined) {
        db.menu.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    url: url
                }
            },
            new: true
        }, function(err, doc, lastErrorObject) {
            // doc.tag === 'maintainer'
        });
    }



    res.send("ok");



});




app.get('/admin/menu/remove/:id', function(req, res) {
    db.menu.remove({
            _id: mongojs.ObjectId(req.params.id)
        },
        function(err, saved) {
            if (err || !saved) console.log("not removed");
            else console.log("removed");
        });
    res.redirect("admin/menu");
});




app.get('/', function(req, res) {

    var data = db.menu.find({}, {
        data: 0
    });

    var islocal = req.headers.host;
    if (islocal.indexOf("localhost") > -1) {
        islocal = 1;
    } else {
        islocal = 0;
    }

    db.pages.find({
        "url": "hlavni"
    }, function(err, records) {
        var main = records[0];

        data.toArray(function(err, docs) {
            res.render('index', {
                content: main,
                menu: docs,
                local: islocal
            });
        });

    });

});



app.get('/:url', function(req, res) {
    var url = req.params.url;
    var data = db.menu.find({}, {
        data: 0
    });
    var islocal = req.headers.host;
    if (islocal.indexOf("localhost") > -1) {
        islocal = 1;
    } else {
        islocal = 0;
    }

    db.pages.find({
        "url": url
    }, function(err, records) {
        var main = records[0];

        data.toArray(function(err, docs) {

            if (main == undefined) {
                res.render('error', {
                    menu: docs
                });
            } else {
                res.render('index', {
                    content: main,
                    menu: docs,
                    local: islocal
                });
            }

        });

    });

});




app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080');