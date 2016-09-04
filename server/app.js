/*
 * Packages
 */
var express = require('express');
var Cookies = require("cookies");
var compress = require('compression'); //GZIP
var cors = require('cors')
var app = express();

config = require("../config");

Cache = require("./cache.js")

/*
* Database connection
*/
mongoose = require('mongoose')
mongoose.connect(config.db);

cache = require("./lib/cache")
cache.init()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));


/*
* Set logger
*/
var winston = require('winston');
winston.add(winston.transports.File, {
  filename: __dirname+'/logs/error.log'
});
winston.remove(winston.transports.Console);



/*
 * Static files
 */
app.use(express.static(__dirname + '/../www'));
app.use(compress());



/*
 * Set view engine to EJS and pretty spaces in JSON API
 */
app.set('view engine', 'ejs');
app.set('json spaces', 2);

/*
 *  PUT, DELETE, POST
 */
app.options('*', cors());


//Remove Express.js header
app.use(function(req, res, next) {
  res.removeHeader("X-Powered-By");
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


/* Redirect trailing slashes */
app.use(function(req, res, next) {
  if(req.path.split("/")[1]=="api"){
  
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
      var query = req.url.slice(req.path.length);
      res.redirect(301, req.path.slice(0, -1) + query);
    } else {
      next();
    }
  }else{
    next();
  }
  
});


/**
 * Initializing router
 * @type {*|exports|module.exports}
 */

var routes = require("./router.js");
router = new routes(app);


/**
 * Browser
 */

var Filer = require("./lib/filer.js");
filer = new Filer(app);

if (process.argv.indexOf("template")!= -1) {
  var client = require("./client-template.js");
}else{
  var client = require("./client.js");
}

client = new client(app);



/*
 * Error catch
 *
 */

app.use(function(req, res, next) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  if (app.get('env') == 'production') {
    winston.info("404 - " + fullUrl);
  } else {
    console.log('\x1b[31m', '404', '\x1b[32m', fullUrl, '\x1b[0m');
  }

  res.status(404).json({status: 404, message: "Not Found"});

});



app.use(function(err, req, res, next) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  var errweb = err.stack;

  if (app.get('env') == 'production') {
    errweb = "";
    winston.info(err.stack, {
    url: fullUrl
    });
  } else {
    console.log('\x1b[31m', err.stack, '\x1b[32m', fullUrl, '\x1b[0m');
  }


  res.status(500).json({status: 500, message: "Internal server error", error: errweb});
});


var port = process.env.PORT || 8090;

app.listen(port);

if (app.get('env') == 'production') {
  console.log('Listening on port ' + port + " -" + '\x1b[31m', app.get("env"), '\x1b[0m');
} else {
  console.log('Listening on port ' + port + " -" + '\x1b[32m', app.get("env"), '\x1b[0m');
}

module.exports.getApp = app;