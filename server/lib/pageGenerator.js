var request = require('request');
var async = require('async');
var fs = require('fs');
var path = require("path")
var archiver = require('archiver');

var handler = function() {
  this.generate = generate
  this.makeZip = makeZip
};


function generate(req, res){
  res.json({"status" : "in progress"})
  deleteFolderRecursive("./static/")
  fs.mkdirSync("./static/");
  copyFolderRecursiveSync("./www/images", "./static/")
  copyFolderRecursiveSync("./www/assets", "./static/")
async.waterfall([
  function(callback){
  request({uri: config.url+config.api_url+'/page'}, function(err, response, body){
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
        request({uri: config.url+url[i]},function(err, r,b){
      callback(null,b,this.uri.path);
    });
  }
    

  },
  function(err, response,body,a,callback){
  var odkazy = err.match(/<a href="((\/[a-z-]+)+|([a-z-]+))"/g)
  if(!odkazy){
    odkazy = [];
  }

  for(i=0;i<odkazy.length;i++){
    var o=odkazy[i].match(/"([a-z\-\/]+)"/g)
 
     rep=o[0].match(/([a-z\-\/]+)/g)
     err=err.replace(o[0],'"'+rep[0]+'.html"')
  
  }

    
    if(response=="/"){
      res=["index"]
    }else{
 var res = response.match(/\/[a-z-]+/g);
    
    }
   

    
    for(i=0;i<res.length;i++){
        
          res[i]=res[i].replace("/","")

        
      }


    if(res.length==1){

      fs.writeFile("./static/"+res[0]+".html", err, function(err) {
    if(err) {
        return console.log(err);
    }})
    }

    var k=""
    if(res.length>1){
      for(i=0;i<res.length-1;i++){
        
        k=k+"/"+res[i];

         try {
         fs.mkdirSync("./static"+k+"");
            } catch(e) {
   
          }

      }

      fs.writeFile("./static/"+k+"/"+res[res.length-1]+".html", err, function(err) {
    if(err) {
        return console.log(err);
    }else{
        return "ok"
    }
  })


    }


  }]
)

}

function makeZip(req,res){



var output = fs.createWriteStream('static-content.zip');
var archive = archiver('zip');

output.on('close', function () {
    res.setHeader('Content-disposition', 'attachment; filename=static-content.zip');
    res.sendFile(path.resolve(__dirname + '/../../static-content.zip'))
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);
archive.bulk([
    { expand: true, cwd: './static/', src: ['**'], dest: './static/'}
]);
archive.finalize();
}


function copyFileSync( source, target ) {

    var targetFile = target;

    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];
    

    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { 
        deleteFolderRecursive(curPath);
      } else { 
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports = handler;













