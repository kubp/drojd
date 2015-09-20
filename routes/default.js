module.exports = function(app){

	console.log("default.js")

	app.get('/test', function(req, res){
		res.send("test");
	});

}
