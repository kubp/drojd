module.exports = function(app){

	auth = require("./../core/Auth/Authenticator");



	app.get('/test', function(req, res){
		//res.redirect("/");
		//require("asd");
		auth.auth(req);
		res.send("ads");
	});

	app.get('/login', function(req, res){
		//res.redirect("/");
		//require("asd");
		auth.login(req);
		res.send("ads");
	});

}
