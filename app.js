/*
 * Packages
 */
var express = require('express');
var Cookies = require("cookies");
var compress = require('compression'); //GZIP
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var webalize = require('./lib/webalize');
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kktech2');
loader = require("./core/Loader/Loader.js");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


/*
 * Static files
 */
app.use(express.static(__dirname + '/public'));
app.use(compress());



app.use(session({
    secret: '9AvHc8ZO52SQAA6KbFDqwP0kHG7w3iQvRqn8C00y',
    store: new MongoStore({url:'mongodb://127.0.0.1:27017/kktech2'}),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));







//app.set('env', 'dev')



/*
 * Set view engine to EJS and pretty spaces in JSON API
 */
app.set('view engine', 'ejs');
app.set('json spaces', 40);



//Remove Express.js header
app.use(function(req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});



/**
 * Initializing router
 * @type {*|exports|module.exports}
 */
var router = loader.load("router");
router.load(app);







/*
 * Error catch
 *
 */


app.use(function(req, res, next) {
   // console.error(err.stack);

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('\x1b[31m', '404','\x1b[32m', fullUrl,'\x1b[0m');

    res.status(404);
    res.render("404");

});


app.use(function(err, req, res, next) {
    //console.error(err.stack);

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('\x1b[31m', '500','\x1b[32m', fullUrl,'\x1b[0m');

    var err = err.stack;

    if(app.get('env')=='production'){
        err="";
    }


    res.status(500);
    res.render("500",{err:err});

});


var port = process.env.PORT || 8080;

app.listen( port );
console.log('Listening on port '+ port +" -"+ '\x1b[31m', app.get("env"),'\x1b[0m');