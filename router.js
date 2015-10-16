

module.exports = function(app){

    Section = require("./src/Section.js");
    User = require("./core/Auth/Authenticator");


    var handlers = {
        section: new Section(),
        user: new User()
    }


    //todo: Security!

    app.get('/api/section/all', handlers.section.getAllSection);

    app.get('/api/section/:url', handlers.user.auth ,handlers.section.getSection);

    app.post('/api/section/:url', handlers.section.setSection);

    app.delete('/api/section/:url', handlers.section.sectionRemove);

    app.put('/api/section/:url', handlers.section.sectionUpdate);


    app.get('/api/login/:mail', handlers.user.login);

    app.get('/api/verify/:apikey', handlers.user.auth);

}
