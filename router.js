

module.exports = function(app){

    Section = require("./src/Section.js");
    User = require("./src/User.js");


    var handlers = {
        section: new Section(),
        user: new User()
    }


    //todo: Security!

    app.get('/api/section/all', handlers.section.getAllSection);

    app.get('/api/section/:url', handlers.section.getSection);

    app.post('/api/section/:url', handlers.section.setSection);

    app.delete('/api/section/:url', handlers.section.sectionRemove);

    app.put('/api/section/:url', handlers.section.sectionUpdate);

}
