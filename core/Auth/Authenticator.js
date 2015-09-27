module.exports = {

    /**
     * Login function
     * @param mail
     * @param pass
     * @param callback
     */
    login: function(mail,pass,callback) {
        user = require("./../../src/User");

        user = new user();

        var promise = user.loadPromise(mail,pass);

        promise.then(function(user){

            if(user.length==1){
                callback(true);
            }else{
                callback(false);
            }
        })


    },

    /**
     *
     * @param req session
     * @param res redirect
     */
    auth: function(req,res){

        if(!req.session.logged){
            res.redirect("/api/login");
        }

    }

}
