module.exports = function(app) {


  Auth = require("./src/Auth");
  
  Section = require("./src/Section");
Page = require("./src/Page");

  var handlers = {
    page: new Page(),
    auth: new Auth(),
    //user: new User(),
    section: new Section()
  };




  app.get('/api/section/:id', handlers.section.get);

  app.get('/api/section/', handlers.section.getAll);

  app.post('/api/section/', handlers.section.set);

  app.delete('/api/section/:id', handlers.section.remove);

  app.put('/api/section/:id', handlers.section.update);



  app.get('/api/page/', handlers.page.getAll);

  app.get('/api/search/page/', handlers.page.search);

  app.get('/api/page/:id', handlers.page.get);

  app.post('/api/page/', handlers.page.set);

  app.delete('/api/page/:id', handlers.page.remove);

  app.put('/api/page/:id', handlers.page.update);



/**
 * Security
 */

  app.get('/api/login/:mail', handlers.auth.login);

  app.get('/api/verify/:apikey', handlers.auth.auth, handlers.auth.verifyUser);

}