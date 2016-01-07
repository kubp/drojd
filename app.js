/*
 * Packages
 */
var express = require('express');
var Cookies = require("cookies");
var compress = require('compression'); //GZIP
var cors = require('cors')
var app = express();

config = require("./config");
mongoose = require('mongoose')




mongoose.connect(config.db);



var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

var winston = require('winston');


winston.add(winston.transports.File, {
  filename: 'logs/error.log'
});
winston.remove(winston.transports.Console);



/*
 * Static files
 */
app.use(express.static(__dirname + '/public'));
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



/**
 * Initializing router
 * @type {*|exports|module.exports}
 */

var routes = require("./router.js");
router = new routes(app);



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