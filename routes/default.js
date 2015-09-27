module.exports = function(app){

	auth = require("./../core/Auth/Authenticator");




	app.get('/api/login', function(req, res){

		auth.login(req.body.mail,req.body.pass, function(isAuthenticate){
			if(isAuthenticate){
				req.session.logged=true;
				res.json({message:'logged in'})
			}else{
				res.send({message:'error'});
			}

		});


	});


	app.get('/test', function(req, res){
		auth.auth(req,res)

		res.send("test");
	});



}
