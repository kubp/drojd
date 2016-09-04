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
  prompt.get([{
      name: 'db',
      required: true,
      default: 'mongodb://localhost/drojd',  
        message: 'DB'
       },
      {
        name: 'secret',
        required: true,
        message: 'secret:',
         default: '4c2106cdfe6b',  
      
      },
       {
        name: 'jwtexpires',
        required: true,
        default: '86400',
        message: 'jwtexpires: in seconds'
      
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
      
      }

      ]
      , function (err, result) {
    //
    // Log the results.
    //

      var config = {
        "db":result.db,
        "secret":result.secret,
        "jwtexpires":result.jwtexpires,
        "api_url":result.api_url,
        "url":result.url
      }


      fs.writeFile(__dirname+"/config2.json", JSON.stringify(config), function(err) {
    if(err) {
        return console.log(err);
    }})

   console.log(colors.cyan("config.json has been saved"));
  });