/*
 * Packages
 */
var express = require('express');
var Cookies = require("cookies");
var compress = require('compression'); //GZIP
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var webalize = require('./lib/webalize');
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kktech2');
loader = require("./core/Loader/Loader.js");




/*
 * Static files
 */
app.use(express.static(__dirname + '/public'));
app.use(compress());


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





app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080');