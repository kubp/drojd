

module.exports = function(app){

    test = require("./test");


    var handlers = {
        section: new test()
    }



    /**
     * @api {get} /user/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    app.get('/', handlers.section.testHandler);

//https://github.com/vgheri/ShopWithMe/
}
