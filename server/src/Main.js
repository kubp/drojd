var handler = function() {

  this.get = load;
}

function load(req, res){
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;

   res.json({"section_url":url+"section", 
             "page_url":url+"page",
             "blog_url":url+"blog",
             "blog_section_url":url+"blog_section",
             "auth_url":url+"login"})
}

module.exports = handler