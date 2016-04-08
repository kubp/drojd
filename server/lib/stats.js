var Logger = require("./../models/LoggerSchema")

var handler = function() {
  this.getMonth = getMonth;
  this.getDay = getDay;
  this.getDayDetail = getDayDetail;
  this.getUnique = getUnique;
};



function getMonth(req, res) {
 
  Logger.aggregate(   {
            $project: {
                month: {$month: "$access_time"}
            }
        }, {
            $group: {
                _id: "$month",
                count: {$sum: 1}
            }
        }
  ).sort({_id: 1}).exec(function(error, stats) {

    for(i=0; i < stats.length; i++){
      stats[i].month=stats[i]._id
      delete stats[i]._id
    }
    res.json(stats)

  })

}


function getDay(req, res) {
  var start = new Date(req.query.start)
  var end = new Date(req.query.end)

  Logger.count({
        "access_time" : 
    {
        "$gte" : start,
        "$lt" : end
    }
  }

  ).exec(function(error, stats) {
    var diff = end.getTime() - start.getTime();
    var days = Math.floor((diff) / (1000) / 60 / 60 / 24);

    res.json({days:days, count:stats})
  })

}


function getDayDetail(req, res) {

  var start = new Date(req.query.start)
  var end = new Date(req.query.end)

  Logger.find({
        "access_time" : 
    {
        "$gte" : start,
        "$lt" : end
    }
  }

  ).exec(function(error, stats) {
      res.json({count:stats.length,stats:result})
    })

}

function getUnique(req, res){
  Logger.aggregate(
    {$group : {_id : "$ip"} }, 
    {$group: {_id:1, count: {$sum : 1 }}}
  ).exec(function(error, stats) {
    if(stats.length != 0){
      delete stats[0]._id
      res.json(stats[0])
    }
    
  })

}



function getUniqueIp(req, res){
  Logger.distinct("ip").exec(function(error, stats) {
    res.json(stats)
  })
}

module.exports = handler;