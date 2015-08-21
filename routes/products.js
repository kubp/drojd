product=require("../presenters/productPresenter.js");

module.exports = function(app){

	app.get('/users', function(req, res){
		a=product.giveProduct();
		res.send(a);
	});

	app.get('/users/:nick', function(req, res){
		res.send('Hello @'+req.params.nick);
	});	
}
