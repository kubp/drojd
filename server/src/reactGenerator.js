var path = require('path')
var fs = require('fs')
var HTMLtoJSX = require('htmltojsx');
var converter = new HTMLtoJSX({createClass: false});

var Template = require("../models/TemplateSchema")


var handler = function() {
  this.jsxToHtml = jsxToHtml;
  this.move = move;
  this.get = load;
  this.remove = remove;
  this.update = update;
  this.set = add;
}


function load(req, res) {
  var query = req.params.id ? {_id:req.params.id} : {};

  Template.find(query).exec(function(err, templates) {
    templates = templates ? templates : [];
    if (templates.length == 0) {
      return res.json(
        []
      );
    }

    res.json(templates);
  })
}


function remove(req, res) {
  Template.findOneAndRemove({
    _id: req.params.id
  }, function(err, doc) {

    if (err) {
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.status(200).json({
      status: "Resource removed successfully"
    });
  });
}

function update(req, res) {
  makeTemplate(req.body.file, req.body.jsx)

  var content = {};
    req.body.html ? content.html = req.body.html : null;
  req.body.jsx ? content.jsx = req.body.jsx : null;
  req.body.file ? content.file = req.body.file : null;

  Template.findOneAndUpdate({
      _id: req.params.id
    }, content, {
      upsert: true
    },

    function(err, doc) {
      if (err) {
        console.log(err)
      return res.status(404).json({
        error: "Requested resource doesn't exist"
      })
    }

    res.status(200).json({
        status: "Resource updated successfully"
      })
    });
}

function add(req, res) {

makeTemplate(req.body.file, req.body.jsx)
 
  var template = new Template({
     html: req.body.html,
    jsx: req.body.jsx,
    file: req.body.file
  })

  template.save();

  res.status(200).json({status: "Resource created successfully"})



}




function reactify(text){
var list = ["Menu","Content","Page","Post", "BlogList"]

var transform = ["{this.props.data.menu ? <Menu menu={this.props.data.menu}/> : null}",
                 "<Content data={this.props.data}/>" , 
                 "<div><div dangerouslySetInnerHTML={{__html: this.props.data.raw_content}} /></div>", 
                 '<div className="row"> <div className="col-1-4"/> <div className="col-1-2"> <article> <h1 className="c">{this.props.data.headline}</h1> <span>{this.props.data.post.author}</span><span className="info"></span> <p dangerouslySetInnerHTML={{__html: this.props.data.raw_content}} /> </article> {this.state.comments && this.props.data.post.comments ? <Comments data={this.state.comments} id={this.props.data._id}/> : null} </div> </div>',
                 ""]

  var reactified = text.match(/{[a-zA-Z]+}/g) || [];
     // console.log(reactified)
  for(i = 0; i<reactified.length;i++){
    d= (list.indexOf(reactified[i].replace("{","").replace("}","")))
 

    if(d != -1){
      text = text.replace(reactified[i],transform[d])
    }
  }

  return text;

}









function jsxToHtml(req, res) {
   var tags = req.query.tags || [];
   var jsxtegs = "";
   for(var i = 0; i < tags.length; i++){
      jsxtegs = jsxtegs+ 'import '+tags[i]+' from "../components/'+tags[i]+'" \n';
   }

    if(!req.query.html){
    return res.json({status: "error"})
  }

  var html =converter.convert(req.query.html)
  html = reactify(html)

  var result = 'import React from "react"; \n '+jsxtegs+' \n class GenPage extends React.Component { \n constructor(props){ \n super(props); \n} \n render() { \n  return ( \n '+ html +' )  \n} \n} \n module.exports=GenPage';
  res.json({status: "ok", data: result})
};


function makeTemplate(template, jsx){

 fs.writeFile(__dirname + '/../../browser/src/templates/'+ template +'.js',jsx, function(err) {
    if(err) {
        return console.log(err);
    }})

//main.js


fs.readFile( __dirname + '/../../browser/src/Main.js', function (err, data) {
  if (err) {
    throw err; 
  }

fs.readdir( __dirname + '/../../browser/src/templates', function(err, items) {
    //console.log(items);
    var imports = [], templates = []

    for(var i =0; i<items.length; i++){
      items[i]=items[i].replace(".js","")
      var upper = items[i].charAt(0).toUpperCase() + items[i].slice(1)
      
templates[i] = 'this.props.data.layout == "'+items[i]+'" ? template = <'+upper+' data={this.props.data}/> : null'

     

      imports[i] = 'import '+upper+' from "./templates/'+items[i]+'";'

    }
//console.log(templates)



  var file_content = data.toString();

var g = "//GENERATED";


var replaced = file_content.match(/\/\/GENERATED((.|\s)*?)\/\/GENERATED/g)

file_content = file_content.replace(replaced[0], g +"\n"+ imports.join("\n") +"\n"+g)
file_content = file_content.replace(replaced[1], g+"\n"+ templates.join("\n") +"\n"+g)

fs.writeFile(__dirname + '/../../browser/src/Main.js', file_content, function (err) {
    if (err) 
        return console.log(err);
   // console.log('Hello World > helloworld.txt');
});

//file_content=(file_content.replace(/\/\/GENERATED((.|\s)*?)\/\/GENERATED/g, g+replace+g))
  

});




})

}



function move(req, res){

  purgeCache("rekt")
var exec = require('child_process').exec;
var cmd = './node_modules/.bin/babel browser/src -d ./node_modules/rekt/lib --experimental';

exec(cmd, function(error, stdout, stderr) {
      if(stdout){
        //console.log("done")
        
      }
  

});


var webpack = require("webpack");

// returns a Compiler instance
webpack({
  devtool: 'source-map',
  entry: [
   // 'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    __dirname+'/../../browser/src/entry',
  ],
  output: {
    path: __dirname + '/../../www/assets',
    filename: 'min.js',
    //publicPath: 'http://localhost:8080/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
}
, function(err, stats) {
     res.json({status:"ok"});
});

 
}









function purgeCache(moduleName) {
    // Traverse the cache looking for the files
    // loaded by the specified module name
    searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};



function searchCache(moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function traverse(mod) {
            // Go over each of the module's children and
            // traverse them
            mod.children.forEach(function (child) {
                traverse(child);
            });

            // Call the specified callback providing the
            // found cached module
            callback(mod);
        }(mod));
    }
};








module.exports = handler