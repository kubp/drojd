var Post = require("../models/PostSchema")
var BlogSection= require("../models/BlogSectionSchema")
var Section = require("../models/SectionSchema")
var builder = require('xmlbuilder');

var handler = function() {
  this.rss = rss;
  this.main = main;
};


function rss(req, res) {
  var url = req.originalUrl.replace("/rss/","")
  var fullUrl = req.protocol + '://' + req.get('host');


  Section.findOne({type:"blog_section",url:"/"+url}).populate("blogsection").exec(function(err, blog){
  Post.find({section: blog.blogsection.section,visible: 1}).exec(function(err, sections){


if(!blog){
  return res.send("")
}

console.log(blog)


var xml = builder.create('rss',  {version: '1.0', encoding: 'UTF-8'})
.att('version', '2.0')
.att('xmlns:atom', 'http://www.w3.org/2005/Atom')
.att('xmlns:content', 'http://purl.org/rss/1.0/modules/content/')

.ele('channel')
    .ele('title').txt(blog.blogsection.title).up()
    
    .ele("link").txt(fullUrl+blog.url).up()
   
    .ele("description").txt(blog.blogsection.description).up()

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
  return res.send("main rss")
}

module.exports = handler;