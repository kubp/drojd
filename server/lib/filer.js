module.exports = function(app) {

  var multer  = require('multer')
  var upload = multer({ dest: __dirname+'/../../uploads/images/' },
     {limits: { fileSize: 50* 1024 * 1024}})

  var fs = require('fs');
  var path = require('path');

  app.post('/api/image/', upload.single('file'), function (req, res, next) {

    fs.rename(req.file.path, __dirname+'/../../uploads/images/'+req.file.originalname, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

  })

  app.get('/api/image', function(req, res) {
    fs.readdir(__dirname + '/../../uploads/images', function(err, items) {
    res.json(items)
    });

  });


}