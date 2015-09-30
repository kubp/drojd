

module.exports = function(app){

	var section = require("./../src/Section");
	var section = new section();


	app.get('/page/:url', function(req, res){

		section.load(req,["url"], function(err, pages){
			res.json(pages);
		});

	});


	app.post('/page/:url', function(req, res){

		section.add(req,["url","title","description","headline","page"]);
		res.json({status:"ok"});

	});

	app.put('/page/:url', function(req, res){

		section.update(req,["url","title","description","headline","page"]);
		res.json({status:"ok"});

	});

	app.delete('/page/:url', function(req, res){

		section.delete(req,["url","title","description","headline","page"]);
		res.json({status:"ok"});

	});


}
