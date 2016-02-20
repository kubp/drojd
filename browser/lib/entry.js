"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _componentsMain = require("./components/Main");

var _componentsMain2 = _interopRequireDefault(_componentsMain);

_reactDom2["default"].render(_react2["default"].createElement(_componentsMain2["default"], { data: window._sharedData }), document);