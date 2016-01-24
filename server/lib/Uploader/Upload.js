

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' },
   {limits: { fileSize: 50* 1024 * 1024}})

var fs = require('fs');
var path = require('path');

app.post('/upload', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)

fs.rename(req.file.path, __dirname+'/uploads/'+req.file.originalname, function(err) {
    if ( err ) console.log('ERROR: ' + err);
});

})




app.get('/download/:file', function(req, res) {
 
  var file = __dirname + '/uploads/'+req.params.file.replace(/\//g,"");


fs.exists(file, function (exists) {
  exists ? res.download(file) : res.json({"error":"file not found"});
});


});


app.get('/files', function(req, res) {
  fs.readdir(__dirname + '/uploads', function(err, items) {
    
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
    res.json({items:items})

});



});




app.get('/', function(req, res) {
  res.render("upload");
});
