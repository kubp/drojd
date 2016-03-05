

var request = require('request');
var async = require('async');
var fs = require('fs');

app.get("/generate", function(){

 request({uri: 'http://localhost:8090/main.css'}, function(err, response, body){
      fs.writeFile("./static/main.css", body, function(err) {
    if(err) {
        return console.log(err);
    }})

});

async.waterfall([
  function(callback){
  request({uri: 'http://localhost:8090/api/section'}, function(err, response, body){
   var data =JSON.parse(body);
  var url =[];
  for(i=0; i<data.length;i++){
    url[i]=data[i].url
  }
  callback(null, url)

});
   
  },
  function(url,callback){

     for(i=0; i<url.length;i++){
        request({uri: 'http://localhost:8090'+url[i]},function(err, r,b){
      callback(null,b,this.uri.path);
    });
  }
    

  },
  function(err, response,body,a,callback){
  var odkazy = err.match(/<a href="((\/[a-z-]+)+|([a-z-]+))"/g)
  //console.log(odkazy)
  console.log("---")
  for(i=0;i<odkazy.length;i++){
    var o=odkazy[i].match(/"([a-z\-\/]+)"/g)
     //console.log(o[2])
   
     console.log(o[0])
     rep=o[0].match(/([a-z\-\/]+)/g)
     //console.log(rep[0])

    err=err.replace(o[0],'"'+rep[0]+'.html"')
  
  }

    
    if(response=="/"){
      res=["index"]
    }else{
 var res = response.match(/\/[a-z-]+/g);
    
    }
   
    //console.log(res)
    
    for(i=0;i<res.length;i++){
        
          res[i]=res[i].replace("/","")

        
      }


    if(res.length==1){
      //console.log("make file "+res[0])
      fs.writeFile("./static/"+res[0]+".html", err, function(err) {
    if(err) {
        return console.log(err);
    }})
    }

    var k=""
    if(res.length>1){
      for(i=0;i<res.length-1;i++){
        
        k=k+"/"+res[i];

       // console.log(k)
        //console.log("dir ./static"+k+"")
         try {
         fs.mkdirSync("./static"+k+"");
            } catch(e) {
   
          }

      }
     // console.log("./static/"+k+"/"+res[res.length-1]+".html")
      fs.writeFile("./static/"+k+"/"+res[res.length-1]+".html", err, function(err) {
    if(err) {
        return console.log(err);
    }})


    }




/*
   fs.writeFile("./static/"+g+".html", err, function(err) {
    if(err) {
        return console.log(err);
    }})
*/

  }]
)

})

















