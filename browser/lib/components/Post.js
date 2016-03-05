"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var querystring = require('querystring');

var Blog = (function (_React$Component) {
  _inherits(Blog, _React$Component);

  function Blog(props) {
    _classCallCheck(this, Blog);

    _get(Object.getPrototypeOf(Blog.prototype), "constructor", this).call(this, props);
    this.state = { post: this.props.data.post, comments: [{}] };
    this.axiosSend = this.axiosSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props.data.post._id);
  }

  _createClass(Blog, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      _axios2["default"].get('http://localhost:8090/api/comment/' + this.props.data.post._id + '').then((function (response) {
        this.setState({ comments: response.data
        });
      }).bind(this));
    }
  }, {
    key: "axiosSend",
    value: function axiosSend() {

      var comments = this.state.comments;
      comments.push({
        author: this.state.comment_name,
        content: this.state.comment_content,
        created_at: new Date().toString() });
      this.setState({ comments: comments });

      _axios2["default"].post('  http://localhost:8090/api/comment', querystring.stringify({
        post_id: this.props.data.post._id,
        author: this.state.comment_name,
        mail: this.state.comment_mail,
        content: this.state.comment_content

      }))["catch"](function (response) {});
    }
  }, {
    key: "handleChange",
    value: function handleChange(evt) {
      var name = evt.target.name;
      this.setState(_defineProperty({}, evt.target.name, evt.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "row" },
        _react2["default"].createElement("div", { className: "col-1-4" }),
        _react2["default"].createElement(
          "div",
          { className: "col-1-2" },
          _react2["default"].createElement(
            "article",
            null,
            _react2["default"].createElement(
              "h1",
              { className: "c" },
              this.state.post.headline
            ),
            _react2["default"].createElement(
              "span",
              null,
              this.state.post.author
            ),
            _react2["default"].createElement("span", { className: "info" }),
            _react2["default"].createElement("p", { dangerouslySetInnerHTML: { __html: this.state.post.raw_content } })
          ),
          _react2["default"].createElement(
            "div",
            { className: "comment" },
            _react2["default"].createElement(
              "h3",
              null,
              "Komentáře"
            ),
            _react2["default"].createElement("textarea", { placeholder: "Leave a comment", name: "comment_content", onChange: this.handleChange }),
            _react2["default"].createElement("input", { placeholder: "Name", name: "comment_name", onChange: this.handleChange }),
            _react2["default"].createElement("input", { placeholder: "Email", name: "comment_mail", onChange: this.handleChange }),
            _react2["default"].createElement(
              "button",
              { onClick: this.axiosSend },
              "Send"
            ),
            _react2["default"].createElement(
              "div",
              { className: "comments" },
              this.state.comments.map(function (comment) {
                return _react2["default"].createElement(
                  "div",
                  { className: "post" },
                  _react2["default"].createElement(
                    "div",
                    { className: "comment-detail" },
                    _react2["default"].createElement(
                      "div",
                      null,
                      comment.author
                    ),
                    _react2["default"].createElement(
                      "span",
                      null,
                      comment.created_at
                    )
                  ),
                  _react2["default"].createElement(
                    "p",
                    null,
                    comment.content
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Blog;
})(_react2["default"].Component);

module.exports = Blog;