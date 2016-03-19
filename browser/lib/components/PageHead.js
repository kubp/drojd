"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var PageHead = (function (_React$Component) {
  _inherits(PageHead, _React$Component);

  function PageHead(props) {
    _classCallCheck(this, PageHead);

    _get(Object.getPrototypeOf(PageHead.prototype), "constructor", this).call(this, props);
  }

  _createClass(PageHead, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "head",
        null,
        _react2["default"].createElement("meta", { charSet: "utf-8" }),
        _react2["default"].createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        _react2["default"].createElement(
          "title",
          null,
          this.props.data.title
        ),
        _react2["default"].createElement("meta", { name: "description", content: this.props.data.description }),
        _react2["default"].createElement("link", { rel: "stylesheet", type: "text/css", href: "/assets/style.css" }),
        _react2["default"].createElement("meta", { property: "og:image", content: this.props.data.image }),
        _react2["default"].createElement("meta", { property: "twitter:image", content: this.props.data.image }),
        _react2["default"].createElement("meta", { property: "og:type", content: "article" }),
        _react2["default"].createElement("meta", { property: "og:title", content: this.props.data.title }),
        _react2["default"].createElement("meta", { property: "og:description", content: this.props.data.description }),
        _react2["default"].createElement("meta", { name: "twitter:card", content: "summary" }),
        _react2["default"].createElement("meta", { name: "twitter:description", content: this.props.data.description }),
        _react2["default"].createElement("meta", { name: "twitter:title", content: this.props.data.title })
      );
    }
  }]);

  return PageHead;
})(_react2["default"].Component);

module.exports = PageHead;