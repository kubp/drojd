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

var _Time = require("./Time");

var _Time2 = _interopRequireDefault(_Time);

var querystring = require('querystring');

var Comments = (function (_React$Component) {
  _inherits(Comments, _React$Component);

  function Comments(props) {
    _classCallCheck(this, Comments);

    _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this, props);

    this.axiosSend = this.axiosSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { comments: this.props.data, reply: "", comment_content: "" };
    this.reply = this.reply.bind(this);
  }

  _createClass(Comments, [{
    key: "reply",
    value: function reply(id, name) {
      this.setState({
        reply_name: name,
        reply: id,
        comment_content: "@" + name + " " + this.state.comment_content.replace(/@([a-zA-Z\-])+/, "") });
    }
  }, {
    key: "axiosSend",
    value: function axiosSend() {

      var comments = this.state.comments;
      comments.push({
        author: this.state.comment_name,
        content: this.state.comment_content,
        created_at: new Date()
      });
      this.setState({ comments: comments });

      _axios2["default"].post('/api/comment', querystring.stringify({
        post_id: this.props.id,
        author: this.state.comment_name,
        mail: this.state.comment_mail,
        content: this.state.comment_content,
        reply: this.state.reply,
        reply_name: this.state.reply_name

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
      var that = this;
      return _react2["default"].createElement(
        "div",
        { className: "comment", id: "comment" },
        _react2["default"].createElement(
          "h3",
          null,
          "Komentáře"
        ),
        _react2["default"].createElement("textarea", { placeholder: "Leave a comment", name: "comment_content", onChange: this.handleChange, value: this.state.comment_content }),
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
          this.state.comments.map(function (result, i) {
            return _react2["default"].createElement(Comment, { reply: that.reply.bind(null), key: i, data: result });
          })
        )
      );
    }
  }]);

  return Comments;
})(_react2["default"].Component);

var Comment = (function (_React$Component2) {
  _inherits(Comment, _React$Component2);

  function Comment(props) {
    _classCallCheck(this, Comment);

    _get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this, props);
  }

  _createClass(Comment, [{
    key: "render",
    value: function render() {

      return _react2["default"].createElement(
        "div",
        { className: "post", id: this.props.data.p_id },
        _react2["default"].createElement(
          "div",
          { className: "comment-detail" },
          _react2["default"].createElement(
            "div",
            null,
            this.props.data.author
          ),
          _react2["default"].createElement(
            "span",
            null,
            _react2["default"].createElement(_Time2["default"], { time: this.props.data.created_at })
          ),
          _react2["default"].createElement(
            "span",
            null,
            _react2["default"].createElement(
              "a",
              { href: "#comment", onClick: this.props.reply.bind(null, this.props.data.p_id, this.props.data.author) },
              "reply"
            )
          )
        ),
        this.props.data.reply == "" || !this.props.data.reply ? _react2["default"].createElement(
          "p",
          null,
          this.props.data.content
        ) : _react2["default"].createElement(
          "p",
          null,
          _react2["default"].createElement(
            "a",
            { href: "#" + this.props.data.reply },
            "@",
            this.props.data.reply_name
          ),
          this.props.data.content.replace(/@([a-zA-Z\-])+/, "")
        )
      );
    }
  }]);

  return Comment;
})(_react2["default"].Component);

module.exports = Comments;