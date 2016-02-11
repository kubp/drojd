var Logger = require("./../models/LoggerSchema")
module.exports =  {
  log: function(req){
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var log = new Logger({
       url: url,
       ip: req.ip,
       user_agent: req.headers['user-agent'],
       referer: req.headers['referer'],
       ip: req.ip,
       method: req.method
    })
    if (process.env.NODE_ENV == 'production') {
      log.save()
    }
  }
}