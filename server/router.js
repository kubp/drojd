module.exports = function(app) {


  var Auth = require("./src/Auth");
  var Page = require("./src/Page");
  var Main = require("./src/Main");
  var User = require("./src/User")
  var Stats = require("./lib/stats")
  var Comment = require("./src/Comment")
  var Menu = require("./src/Menu")
  var Rss = require("./lib/rss")
  var pageGenerator = require("./lib/pageGenerator")
  var Admin = require("./src/Admin")
  var reactGenerator = require("./src/reactGenerator")
  
  var handlers = {
    page: new Page(),
    auth: new Auth(),
    user: new User(),
    main: new Main(),
    stats: new Stats(),
    comment: new Comment(),
    menu: new Menu(),
    rss: new Rss(),
    generator: new pageGenerator(),
    admin: new Admin(),
    reactgen: new reactGenerator() 
  };


  app.get('/cms-admin/*', handlers.admin.secure);

  app.get('/cms-admin/', handlers.admin.secure);

  app.get(config.api_url+'/', handlers.main.get);

/* Page */

  app.get(config.api_url+'/page/', handlers.page.getAll);

  app.get(config.api_url+'/page/search/', handlers.page.search);

  app.get(config.api_url+'/page/:id', handlers.page.get);

  app.post(config.api_url+'/page/', handlers.auth.auth, handlers.page.set);

  app.delete(config.api_url+'/page/:id', handlers.auth.auth, handlers.page.remove);

  app.put(config.api_url+'/page/:id', handlers.auth.auth, handlers.page.update);



/* Auth */

  app.post(config.api_url+'/login/', handlers.auth.login);

  app.get(config.api_url+'/verify/:apikey', handlers.auth.auth, handlers.auth.verifyUser);

/* User */

  app.get(config.api_url+'/user/', handlers.auth.authAdmin, handlers.user.getAll);

  app.get(config.api_url+'/user/:id', handlers.auth.authAdmin, handlers.user.get);

  app.post(config.api_url+'/user/', handlers.auth.authAdmin, handlers.user.set);

  app.delete(config.api_url+'/user/:id', handlers.auth.authAdmin, handlers.user.remove);

  app.put(config.api_url+'/user/:id', handlers.auth.authAdmin, handlers.user.update);

  /* Stats */

  app.get(config.api_url+'/stats/monthly', handlers.auth.auth, handlers.stats.getMonth);

  app.get(config.api_url+'/stats/daily', handlers.auth.auth, handlers.stats.getDay);

  app.get(config.api_url+'/stats/daily/detail', handlers.auth.auth, handlers.stats.getDayDetail);

  app.get(config.api_url+'/stats/unique', handlers.auth.auth, handlers.stats.getUnique);

  /* Comments */

  app.get(config.api_url+'/comment/:post', handlers.comment.get);

  app.get(config.api_url+'/comment/', handlers.comment.getAll);

  app.post(config.api_url+'/comment', handlers.comment.set);

  app.delete(config.api_url+'/comment/:id', handlers.comment.remove);

  app.put(config.api_url+'/comment/:id', handlers.comment.update);

  /* Menu */ 
  app.get(config.api_url+'/menu', handlers.auth.auth, handlers.menu.loadAll);

  app.get(config.api_url+'/menu/:id', handlers.auth.auth, handlers.menu.load);

  app.post(config.api_url+'/menu', handlers.auth.auth, handlers.menu.add);

  app.delete(config.api_url+'/menu/:id', handlers.auth.auth, handlers.menu.remove);

  app.put(config.api_url+'/menu/:id', handlers.auth.auth, handlers.menu.update);

  app.get('/rss/*',  handlers.rss.rss);

  app.get('/rss',  handlers.rss.main);

  app.get('/sitemap.xml',  handlers.rss.sitemap);

  app.get(config.api_url+'/static/generate', handlers.auth.auth, handlers.generator.generate);

  app.get(config.api_url+'/static/download', handlers.auth.auth, handlers.generator.makeZip);

  /* React Generator */

  app.get(config.api_url+'/generator/live', handlers.auth.auth, handlers.reactgen.jsxToHtml);

  app.get(config.api_url+'/generator/move', handlers.auth.auth, handlers.reactgen.move);

  app.get(config.api_url+'/template', handlers.auth.auth, handlers.reactgen.get);

  app.get(config.api_url+'/template/:id', handlers.auth.auth, handlers.reactgen.get);

  app.delete(config.api_url+'/template/:id', handlers.auth.auth, handlers.reactgen.remove);

  app.put(config.api_url+'/template/:id', handlers.auth.auth, handlers.reactgen.update);

  app.post(config.api_url+'/template', handlers.auth.auth, handlers.reactgen.set);

}