//### Packages ###
var express = require('express');
var S = require('string');
var stylus = require('stylus');
var Cookies = require("cookies");

var compress = require('compression'); //GZIP
var mongojs = require("mongojs"); //Database

var app = express();

//var webalize = require('./lib/webalize');   ### EDIT
var routes = require('./routes'); //Load rout  #Magixs starts here
routes.e(app);

/*
//Database connect
uri = "mongodb://127.0.0.1:27017/edaku",
    db = mongojs.connect(uri, ["product"]);
*/

//### MIDDLEWARES ###
app.use(stylus.middleware({
    src: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.use(compress());  

//Remove Express.js header
app.use(function (req, res, next){
	res.removeHeader("X-Powered-By");
	next();
});

//### SETY ###
app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('json spaces', 40); //Pretty JSON


//### ROUTES ###



app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080');