(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/sidebar_brand.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/sidebar_brand.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar_brand = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

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

var Sidebar_brand = exports.Sidebar_brand = function (_Extends) {
  _inherits(Sidebar_brand, _Extends);

  function Sidebar_brand(props) {
    _classCallCheck(this, Sidebar_brand);

    var _this = _possibleConstructorReturn(this, (Sidebar_brand.__proto__ || Object.getPrototypeOf(Sidebar_brand)).call(this, props));

    _this.onclick = _this.onclick.bind(_this);

    return _this;
  }

  _createClass(Sidebar_brand, [{
    key: 'onclick',
    value: function onclick() {
      if (window.isMobile) this.sideBarToogle();

      //this.deActivateProgressBar();
      this.scrollToTop();
      getWorkPage().setState({ renderIN: "", defineRoutes: true });
    }
  }, {
    key: 'startMouseEnterEvent',
    value: function startMouseEnterEvent() {
      var thisElement = ReactDOM.findDOMNode(this);

      function startEvent() {
        if (document.createEvent) {
          var event = document.createEvent("Event");
          event.target = thisElement;
          event.initEvent("mouseenter", false, true);
          this.dispatchEvent(event);
        } else {
          var event = new Event("click", { bubbles: true, cancelable: false });
          this.dispatchEvent(event);
        }
      }
      startEvent = startEvent.bind(thisElement);
      startEvent();
    }
  }, {
    key: 'render',
    value: function render() {
      /* return (  <a href="/" class="sidebar-brand">
                        <i class="gi gi-car"></i><strong><font><font>AVTODOK</font></font></strong>
                 </a>
       
       
       
                ) */
      return React.createElement(_reactRouterDom.Link, { onClick: this.onclick, to: "/", className: 'sidebar-brand', style: { "fontSize": "13px" } }, React.createElement('i', { className: 'gi gi-car' }), React.createElement('strong', null, React.createElement('font', null, React.createElement('font', null, "\u0410\u0432\u0442\u043E\u0434\u043E\u043A-\u041F\u0430\u0440\u0442\u0441-K\u0438\u0457\u0432"))));
    }
  }]);

  return Sidebar_brand;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=26.26.js.map