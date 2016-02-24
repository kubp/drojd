var Logger = require("./../models/LoggerSchema")

var handler = function() {
  this.getMonth = getMonth;
  this.getDay = getDay;
  this.getDayDetail = getDayDetail;
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
  ).exec(function(error, stats) {

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



module.exports = handler;