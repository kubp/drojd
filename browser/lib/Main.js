"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _marked = require("marked");

var _marked2 = _interopRequireDefault(_marked);

var _componentsHead = require("./components/Head");

var _componentsHead2 = _interopRequireDefault(_componentsHead);

var _componentsError404 = require("./components/error404");

var _componentsError4042 = _interopRequireDefault(_componentsError404);

var _componentsContent = require("./components/Content");

var _componentsContent2 = _interopRequireDefault(_componentsContent);

//import config from "./../config.js"

//GENERATED
//GENERATED

var Main = (function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props);
    this.getTemplate = this.getTemplate.bind(this);
  }

  _createClass(Main, [{
    key: "getTemplate",
    value: function getTemplate() {
      var template = "";

      template = _react2["default"].createElement(_componentsError4042["default"], null);

      //GENERATED
      //GENERATED

      this.props.data.layout == "Page" ? template = _react2["default"].createElement(_componentsContent2["default"], { data: this.props.data }) : null;
      this.props.data.layout == "Blog" ? template = _react2["default"].createElement(_componentsContent2["default"], { data: this.props.data }) : null;
      this.props.data.layout == "BlogSection" ? template = _react2["default"].createElement(_componentsContent2["default"], { data: this.props.data }) : null;

      if (this.props.data.type == "404") {
        template = _react2["default"].createElement(_componentsError4042["default"], null);
      }

      return template;
    }
  }, {
    key: "render",
    value: function render() {

      var template = this.getTemplate();
      return _react2["default"].createElement(
        "html",
        null,
        _react2["default"].createElement(_componentsHead2["default"], { data: this.props.data }),
        _react2["default"].createElement(
          "body",
          null,
          template,
          _react2["default"].createElement("script", { dangerouslySetInnerHTML: { __html: "\n\n\n window._sharedData = " + JSON.stringify(this.props.data) } }),
          _react2["default"].createElement("script", { src: "/assets/min.js", defer: "defer" })
        )
      );
    }
  }]);

  return Main;
})(_react2["default"].Component);

module.exports = Main;