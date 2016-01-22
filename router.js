module.exports = function(app) {


  Auth = require("./src/Auth");
  
  Section = require("./src/Section");
Page = require("./src/Page");
Blog = require("./src/Blog");
BlogSection = require("./src/BlogSection");

  var handlers = {
    page: new Page(),
    auth: new Auth(),
    //user: new User(),
    section: new Section(),
    blog: new Blog(),
    blog_section: new BlogSection()
  };


/* Section */

  app.get('/api/section/:id', handlers.section.get);

  app.get('/api/section/', handlers.section.getAll);

  app.delete('/api/section/:id', handlers.auth.auth,handlers.section.remove);

  app.put('/api/section/:id', handlers.auth.auth,handlers.section.update);

/* Page */

  app.get('/api/page/', handlers.page.getAll);

  app.get('/api/search/page/', handlers.page.search);

  app.get('/api/page/:id', handlers.page.get);

  app.post('/api/page/', handlers.auth.auth, handlers.page.set);

  app.delete('/api/page/:id', handlers.auth.auth, handlers.page.remove);

  app.put('/api/page/:id', handlers.auth.auth, handlers.page.update);

/* Blog */

  app.get('/api/blog/', handlers.blog.getAll);

  app.get('/api/blog/:id', handlers.blog.get);

  app.post('/api/blog/', handlers.auth.auth, handlers.blog.set);

  app.delete('/api/blog/:id', handlers.auth.auth, handlers.blog.remove);

  app.put('/api/blog/:id', handlers.auth.auth, handlers.blog.update);


/* Blog Section */

  app.get('/api/blog_section/:id', handlers.blog_section.get);

  app.post('/api/blog_section/', handlers.auth.auth, handlers.blog_section.set);

  app.delete('/api/blog_section/:id', handlers.auth.auth, handlers.blog_section.remove);

  app.put('/api/blog_section/:id', handlers.auth.auth, handlers.blog_section.update);

/* Auth */

  app.post('/api/login/', handlers.auth.login);

  app.get('/api/login/add', handlers.auth.add);

  app.get('/api/verify/:apikey', handlers.auth.auth, handlers.auth.verifyUser);

}