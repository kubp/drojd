

module.exports = function(app){

    Page = require("./src/Page.js");
    Auth = require("./core/Auth/Authenticator");
    User = require("./src/User");


    var handlers = {
        page: new Page(),
        auth: new Auth(),
        user: new User()
    };


    //todo: Security!
    //todo: default pages

    app.get('/api/page/all', handlers.page.getAllPages);

    app.get('/api/page/:url', handlers.auth.auth ,handlers.page.getPage);

    app.post('/api/page/:url', handlers.page.setPage);

    app.delete('/api/page/:url', handlers.page.removePage);

    app.put('/api/page/:url', handlers.page.updatePage);


    app.post('/api/user/:url',handlers.user.setUser);


    app.get('/api/login/:mail', handlers.auth.login);

    app.get('/api/verify/:apikey', handlers.auth.auth,handlers.auth.verifyUser);

}
