  var prompt = require('prompt');
  var colors = require("colors/safe");
  var fs = require("fs");
  //
  // Start the prompt
  //

    prompt.message = colors.blue("setup");

  prompt.start();

  //
  // Get two properties from the user: username and email
  //

//todo: add admin.html config

if(process.argv.indexOf("template") > 0){
  try{
  fs.mkdirSync(__dirname+"/node_modules/rekt/");
  
}catch(e){}

data = "'use strict'; \n var main = require('./lib/Main') \n module.exports = function () { \n return main; \n};"
  fs.writeFile(__dirname+"/node_modules/rekt/index.js", data, function(err) {
  console.log(colors.cyan("/rekt/index.js has been saved"));
  })


var exec = require('child_process').exec;
var cmd = './node_modules/.bin/babel browser/src -d ./node_modules/rekt/lib --experimental';

exec(cmd, function(error, stdout, stderr) {
      if(stdout){
        //console.log("done")
        
      }
  

});

  return;
}


  prompt.get([{
      name: 'db',
      required: true,
      default: 'mongodb://localhost/drojd',  
        message: 'DB'
       },
      {
        name: 'secret',
        required: true,
        message: 'secret',
         default: '4c2106cdfe6b',  
      
      },
       {
        name: 'jwtexpires',
        required: true,
        default: '86400',
        message: 'jwtexpires in seconds'
      
      },
       {
        name: 'api_url',
        required: true,
     default: '/api',
          message: 'api_url'
      
      }, {
        name: 'url',
        required: true,
        default: 'localhost',
        message: 'url: ' 
      
      },
      {
        name: 'admin_api_url',
        required: true,
        default: 'http://example.com/api',
        message: 'admin api url' 
      
      }

      ]
      , function (err, result) {
      
      //admin

      fs.readFile( __dirname + '/admin/index.html', function (err, data) {
          var file_content = data.toString();

          var g = "//GENERATED";


          var replaced = file_content.match(/\/\/GENERATED((.|\s)*?)\/\/GENERATED/g)

          file_content = file_content.replace(replaced[0], g+'\n'+'window._sharedData = {config:"'+result.admin_api_url+'"}'+'\n'+g)
     

          fs.writeFile(__dirname + '/admin/index.html', file_content, function (err) {
              if (err) 
                  return console.log(err);
          });

      })

      var config = {
        "db":result.db,
        "secret":result.secret,
        "jwtexpires":result.jwtexpires,
        "api_url":result.api_url,
        "url":result.url
      }


      fs.writeFile(__dirname+"/config.json", JSON.stringify(config), function(err) {
    if(err) {
        return console.log(err);
    }})

   console.log(colors.cyan("config.json has been saved"));
  });