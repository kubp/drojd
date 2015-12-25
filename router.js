module.exports = function(app) {

  Page = require("./src/Page.js");
  Auth = require("./core/Auth/Authenticator");
  User = require("./src/User");
  Section = require("./src/Section");


  var handlers = {
    page: new Page(),
    auth: new Auth(),
    user: new User(),
    section: new Section()
  };

/**
 * Page routes
 */
  app.get('/api/page/all', handlers.page.getAllPages);

  app.get('/api/page/search/', handlers.page.searchPage);

  app.get('/api/page/:id', handlers.page.getPage);

  app.post('/api/page/', handlers.page.setPage);

  app.delete('/api/page/:id', handlers.page.removePage);

  app.put('/api/page/:id', handlers.page.updatePage);

  app.post('/api/user/', handlers.user.setUser);

/**
 * Section routes
 */
/*
  app.get('/api/section/all', handlers.section.getAllSections);

  app.get('/api/section/', handlers.section.getSection);

  app.post('/api/section/', handlers.section.setSection);

  app.delete('/api/section/', handlers.section.removeSection);

  app.put('/api/section/', handlers.section.updateSection);

*/

/**
 * Security
 */

  app.get('/api/login/:mail', handlers.auth.login);

  app.get('/api/verify/:apikey', handlers.auth.auth, handlers.auth.verifyUser);

}