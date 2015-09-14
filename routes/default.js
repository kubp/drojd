module.exports = function(app){

	console.log("default.js")

	app.get('/test', function(req, res){
		res.send("test");
	});

	app.get('/test/:nick', function(req, res){
		res.send('test/te');
	});

}
