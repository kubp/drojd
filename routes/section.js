

module.exports = function(app){

	var section = require("./../src/Section");
	var section = new section();


	app.get('/page/:url', function(req, res){


		section.load(req,["url"], function(err, pages){
			res.json(pages);
		});

	});


	app.post('/page/:name', function(req, res){

		section.add(req,{})
		res.json({status:"ok"});

	});


}
