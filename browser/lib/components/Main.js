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

var _Post = require("./Post");

var _Post2 = _interopRequireDefault(_Post);

var _BlogList = require("./BlogList");

var _BlogList2 = _interopRequireDefault(_BlogList);

var _Page = require("./Page");

var _Page2 = _interopRequireDefault(_Page);

var _error404 = require("./error404");

var _error4042 = _interopRequireDefault(_error404);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Head = require("./Head");

var _Head2 = _interopRequireDefault(_Head);

var _configJs = require("../../config.js");

var _configJs2 = _interopRequireDefault(_configJs);

var Main = (function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props);
  }

  _createClass(Main, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "html",
        null,
        _react2["default"].createElement(_Head2["default"], { data: this.props.data }),
        _react2["default"].createElement(
          "body",
          null,
          _react2["default"].createElement(
            "header",
            null,
            this.props.data.menu ? _react2["default"].createElement(_Menu2["default"], { menu: this.props.data.menu }) : null,
            _react2["default"].createElement("div", { className: "clear" })
          ),
          _react2["default"].createElement(
            "main",
            null,
            _react2["default"].createElement(
              "div",
              { className: "wrapper" },
              _react2["default"].createElement(Content, { data: this.props.data })
            )
          ),
          _react2["default"].createElement("script", { dangerouslySetInnerHTML: { __html: "window._sharedData = " + JSON.stringify(this.props.data) } }),
          _react2["default"].createElement("script", { src: _configJs2["default"].script, defer: "defer" })
        )
      );
    }
  }]);

  return Main;
})(_react2["default"].Component);

var Content = (function (_React$Component2) {
  _inherits(Content, _React$Component2);

  function Content(props) {
    _classCallCheck(this, Content);

    _get(Object.getPrototypeOf(Content.prototype), "constructor", this).call(this, props);
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {

      if (this.props.data.type == "page") {
        return _react2["default"].createElement(_Page2["default"], { data: this.props.data });
      } else if (this.props.data.type == "post") {
        return _react2["default"].createElement(_Post2["default"], { data: this.props.data });
      } else if (this.props.data.type == "blog_section") {
        return _react2["default"].createElement(_BlogList2["default"], { data: this.props.data });
      } else {
        return _react2["default"].createElement(_error4042["default"], null);
      }
    }
  }]);

  return Content;
})(_react2["default"].Component);

module.exports = Main;