var path = require('path');

var handler = function() {
  this.secure = secure;
}




function secure(req, res){
   res.sendFile(path.resolve(__dirname + '/../../admin/index.html'))
}




module.exports = handler