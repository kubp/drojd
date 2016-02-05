var fs = require('fs');



function getConfig(){
  var config = JSON.parse(fs.readFileSync(__dirname+'/config.json', 'utf8'));
  
  config.db = process.env.DB ? process.env.DB : config.db;
  config.secret = process.env.SECRET ? process.env.SECRET : config.secret;
  config.jwtexpires = process.env.JWTEXPIRES ? process.env.JWTEXPIRES : config.jwtexpires;
  config.api_url = process.env.API_URL ? process.env.API_URL : config.api_url;

  return config
}


module.exports = getConfig()
