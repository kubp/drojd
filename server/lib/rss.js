var Page = require("../models/PageSchema")
var builder = require('xmlbuilder');

var handler = function() {
  this.rss = rss;
  this.main = main;
  this.sitemap = sitemap;
};


function rss(req, res) {
  var url = req.originalUrl.replace("rss/","")
  var fullUrl = req.protocol + '://' + req.get('host');

  Page.findOne({type:"blog_section",url:url}).exec(function(err, blog){
  if(!blog){
    var xml = builder.create('rss',  {version: '1.0', encoding: 'UTF-8'}).ele("error").text("No RSS").end({ pretty: true});
    return res.contentType("application/xml").send(xml)
  }
  Page.find({section: blog.section,visible: 1}).exec(function(err, sections){


var xml = builder.create('rss',  {version: '1.0', encoding: 'UTF-8'})
.att('version', '2.0')
.att('xmlns:atom', 'http://www.w3.org/2005/Atom')
.att('xmlns:content', 'http://purl.org/rss/1.0/modules/content/')

.ele('channel')
    .ele('title').txt(blog.title).up()
    
    .ele("link").txt(fullUrl+blog.url).up()
   
    .ele("description").txt(blog.description).up()

    .ele("atom:link").att('href', fullUrl+req.originalUrl).att('rel', 'self').att('type', 'application/rss+xml').up()
    




for(i=0;i<sections.length;i++){

var weekday = new Array(7);
weekday[0]=  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";


  var date = new Date(sections[i].created_at);
var months = Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var pubDate =weekday[date.getDay()]+", "+date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " 00:00:00"




xml=xml.ele('item').ele("title").txt(sections[i].title).up()
   
    .ele("link").txt(fullUrl+sections[i].url).up()

     .ele("guid").txt(fullUrl+sections[i].url).up()
  
    .ele("description").txt(sections[i].description).up()

    .ele("content:encoded").dat(sections[i].raw_content).up()

    .ele("pubDate").txt(pubDate).up().up()
}



xml=xml.end({ pretty: true});
    


res.contentType("application/xml").send(xml)

})

  })




}


  function main(req, res) {

var xml = builder.create('rss',  {version: '1.0', encoding: 'UTF-8'})
.ele("error").text("No RSS")
.end({ pretty: true});

res.status(404).contentType("application/xml").send(xml)

}



function sitemap(req, res){
  var fullUrl = req.protocol + '://' + req.get('host'); 

  Page.find({visible:1}).exec(function(err, sections){

    var xml = builder.create('urlset',  {version: '1.0', encoding: 'UTF-8'})
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    for(i=0;i<sections.length;i++){
      xml=xml.ele('url').ele("loc").text(fullUrl + sections[i].url).up().up()
    }

    xml=xml.end({ pretty: true});

    res.contentType("application/xml").send(xml)

  })


}

module.exports = handler;