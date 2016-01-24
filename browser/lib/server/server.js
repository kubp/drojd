"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _componentsMain = require("../components/Main");

var _componentsMain2 = _interopRequireDefault(_componentsMain);

// set up Jade

var app = (0, _express2["default"])();

var Section = require("./models/SectionSchema");
var Blog = require("./models/BlogSchema");
var Page = require("./models/PageSchema");
var BlogSection = require("./models/BlogSectionSchema");

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(_express2["default"]["static"](__dirname + '/../public'));

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/drojd");

app.get('*', function (req, res) {

  Section.find({ url: req.path }).select('-__v').lean().populate("page").populate("blog").populate("blogsection").exec(function (err, page) {

    if (page.length != 0) {

      if (page[0].type == "blog_section") {

        Blog.find({ section: page[0].blogsection.section }).exec(function (err, posts) {
          page[0].posts = posts;
          var content = _react2["default"].renderToString(_react2["default"].createElement(_componentsMain2["default"], { data: page }));
          res.send("<!DOCTYPE html>" + content + "");
        });
      } else {

        var content = _react2["default"].renderToString(_react2["default"].createElement(_componentsMain2["default"], { data: page }));
        res.send("<!DOCTYPE html>" + content + "");
      }
    } else {

      res.send("noo");
    }
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});