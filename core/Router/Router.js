var fs = require('fs');
module.exports = {


    /**
     * Loading routes in /routes folder
     * @param app Dependency for express.js routers
     */

    load: function(app) {

        var dir = __dirname+'/../../routes/';

        var files = fs.readdirSync(dir);
        files.sort(function(a, b) {
            return fs.statSync(dir + a).mtime.getTime() -
                   fs.statSync(dir + b).mtime.getTime();
        });


        for(i = 0; i < files.length; i++){
            require(dir+files[i])(app);
        }

    }


}