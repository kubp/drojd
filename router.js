

module.exports = function(app){

    Page = require("./src/Page.js");
    User = require("./core/Auth/Authenticator");


    var handlers = {
        page: new Page(),
        user: new User()
        };


    //todo: Security!

    app.get('/api/page/all', handlers.page.getAllPages);

    app.get('/api/page/:url', handlers.user.auth ,handlers.page.getPage);

    app.post('/api/page/:url', handlers.page.setPage);

    app.delete('/api/page/:url', handlers.page.removePage);

    app.put('/api/page/:url', handlers.page.updatePage);


    app.get('/api/login/:mail', handlers.user.login);

    app.get('/api/verify/:apikey', handlers.user.auth);

}
