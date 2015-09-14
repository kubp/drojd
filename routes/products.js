module.exports = function(app){
	console.log("product.js")

	app.get('/user', function(req, res){
		res.send("user");
	});

	app.get('/user/:nick', function(req, res){
		res.send('user/nick');
	});

}
