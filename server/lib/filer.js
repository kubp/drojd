var Auth = require("./../src/Auth");
var auth = new Auth();

module.exports = function(app) {

  var multer  = require('multer')
  var upload = multer({ dest: __dirname+'/../../uploads/images/' },
     {limits: { fileSize: 50* 1024 * 1024}})

  var fs = require('fs');
  var path = require('path');

  app.post('/api/image/', auth.auth, upload.single('file'), function (req, res, next) {
    try{
    fs.rename(req.file.path, __dirname+'/../../uploads/images/'+req.file.originalname, function(err) {
        if ( err ) return res.status(403).json({status:"error"})
        res.json({status:"ok"})
    });
    }catch(e){
      res.status(403).json({status:"error"})
    }

  })

  app.get('/api/image', auth.auth, function(req, res) {
    fs.readdir(__dirname + '/../../uploads/images', function(err, items) {
    res.json(items)
    });

  });


}