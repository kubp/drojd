"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var BlogList = (function (_React$Component) {
  _inherits(BlogList, _React$Component);

  function BlogList(props) {
    _classCallCheck(this, BlogList);

    _get(Object.getPrototypeOf(BlogList.prototype), "constructor", this).call(this, props);
    this.state = { blog: this.props.data.blogsection };
  }

  _createClass(BlogList, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "row" },
        this.props.data.posts.map(function (result) {
          return _react2["default"].createElement(Post, { data: result, key: result._id });
        })
      );
    }
  }]);

  return BlogList;
})(_react2["default"].Component);

var Post = (function (_React$Component2) {
  _inherits(Post, _React$Component2);

  function Post(props) {
    _classCallCheck(this, Post);

    _get(Object.getPrototypeOf(Post.prototype), "constructor", this).call(this, props);
  }

  _createClass(Post, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "col-1-3" },
        _react2["default"].createElement(
          "article",
          null,
          _react2["default"].createElement(
            "h1",
            null,
            this.props.data.headline
          ),
          _react2["default"].createElement(
            "span",
            null,
            this.props.data.author
          ),
          _react2["default"].createElement("span", { className: "info" }),
          _react2["default"].createElement("p", { dangerouslySetInnerHTML: { __html: this.props.data.perex } }),
          _react2["default"].createElement(
            "a",
            { href: this.props.data.url },
            "Přečíst..."
          )
        )
      );
    }
  }]);

  return Post;
})(_react2["default"].Component);

module.exports = BlogList;