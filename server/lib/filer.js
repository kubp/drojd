var Auth = require("./../src/Auth");
var auth = new Auth();
var path = require('path');

module.exports = function(app) {

  var multer  = require('multer')
  var upload = multer({ dest: __dirname+'/../../www/images/' },
     {limits: { fileSize: 50* 1024 * 1024}})

  var fs = require('fs');
  var path = require('path');

  app.post('/api/image/', auth.auth, upload.single('file'), function (req, res, next) {
    try{
    fs.rename(req.file.path, __dirname+'/../../www/images/'+req.file.originalname, function(err) {
        if ( err ) return res.status(403).json({status:"error"})
        res.json({status:"ok", file: req.file.originalname})
    });
    }catch(e){
      res.status(403).json({status:"error"})
    }

  })

  app.get('/api/image', auth.auth, function(req, res) {
    fs.readdir(__dirname + '/../../www/images', function(err, items) {
    res.json(items)
    });

  });


   app.get('/api/image/:image', function(req, res) {
     try {

          stats = fs.lstatSync(__dirname + '/../../www/images/'+req.params.image);

          if (stats.isFile()) {
            
            res.sendFile(path.resolve(__dirname + '/../../www/images/'+req.params.image))
            

          }
      }
      catch (e) {
          res.status(404).send("")      }


  });


     app.delete('/api/image/:image', auth.auth, function(req, res) {
     try {

          stats = fs.lstatSync(__dirname + '/../../www/images/'+req.params.image);
         
          if (stats.isFile()) {
            fs.unlinkSync(__dirname + '/../../www/images/'+req.params.image)
            res.send("ok") 

          }
      }
      catch (e) {
          res.status(404).send("boos")      }


  });



}