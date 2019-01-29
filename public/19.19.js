(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./app/info_message.js":
/*!*****************************!*\
  !*** ./app/info_message.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Info_message = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _main_component = __webpack_require__(/*! ./main_component.js */ "./app/main_component.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var Info_message = exports.Info_message = function (_Extends) {
  _inherits(Info_message, _Extends);

  function Info_message(props) {
    _classCallCheck(this, Info_message);

    var _this = _possibleConstructorReturn(this, (Info_message.__proto__ || Object.getPrototypeOf(Info_message)).call(this, props));

    _this.state.header = "";
    _this.state.body = "";
    _this.state.footer = "";
    _this.state.isOn = false;
    _this.offMassage = _this.offMassage.bind(_this);
    return _this;
  }

  _createClass(Info_message, [{
    key: 'offMassage',
    value: function offMassage(e) {
      if (this.state.isOn) this.setState({ isOn: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { onClick: this.offMassage, id: 'info_message', className: 'modal fade', role: 'dialog' }, React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header' }, this.state.header), React.createElement('div', { className: 'modal-body' }, this.state.body), React.createElement('div', { className: 'modal-footer' }, this.state.footer))));
    }
  }]);

  return Info_message;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=19.19.js.map