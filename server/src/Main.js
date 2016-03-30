var handler = function() {

  this.get = load;
}

function load(req, res){
  var url = req.protocol + '://' + req.get('host')+config.api_url +"/";

   res.json({
     "current_url":url.substr(0,url.length-1),
     "page_url":url+"page{/search}?q={query}{&page,per_page,sort}",
     "auth_url":url+"login",
     "verify_url":url+"verify/{key}",
     "user_url":url+"user{/user_id}",
     "stats_url":url+"stats/monthly{/unique}",
     "stats_url_daily":url+"stats/daily{/detail}",
     "comment_url":url+"comment{/id}",
     "menu_url":url+"menu{/id}"
   })
}

module.exports = handler