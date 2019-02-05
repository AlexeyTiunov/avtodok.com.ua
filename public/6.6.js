(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./app/sidebar_nav.js":
/*!****************************!*\
  !*** ./app/sidebar_nav.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar_nav = exports.items = undefined;

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
var Li = __webpack_require__(/*! ./sidebar_li.js */ "./app/sidebar_li.js");

//debugger


/*
    props.items;
*/
var items = exports.items = [{ name: "Головна", href: "/", className: "active gi gi-file sidebar-nav-icon", inner: null }, { name: "Пошук", href: "/search", className: "active gi gi-table sidebar-nav-icon", inner: null }, { name: "Особистий кабінет", href: "#", className: "sidebar-nav-menu",
  inner: [{ name: "Замовлення", href: "/order_list", className: "gi gi-table sidebar-nav-icon", inner: null }, { name: "Баланс", href: "/balance", className: "gi gi-database_plus sidebar-nav-icon", inner: null }, { name: "Історія позицій", href: "/history", className: "gi gi-show_thumbnails_with_lines sidebar-nav-icon", inner: null }, { name: "Декларації", href: "/shdocs", className: "gi gi-message_out sidebar-nav-icon", inner: null }, { name: "Повернення", href: "/retdocs", className: "gi gi-unshare sidebar-nav-icon", inner: null }, { name: "Готовий до видачі", href: "/shipments", className: "si si-dropbox sidebar-nav-icon", inner: null }]
}, { name: "Каталоги", href: null, className: "sidebar-header", inner: null }, { name: "Каталог автозапчастин", href: "/catalogs_auto", className: "gi gi-cars sidebar-nav-icon", inner: null }, { name: "Каталог аксесуарів", href: "/catalog/BROTHER/XDK171", className: "gi gi-beach_umbrella sidebar-nav-icon", inner: null }, { name: "Корисне", href: null, className: "", inner: null }, { name: "Про нас", href: "", className: "fa fa-users sidebar-nav-icon", inner: null }, { name: "Умови роботи", href: "", className: "gi gi-file sidebar-nav-icon", inner: null }, { name: "Скачати прайс", href: "", className: "gi gi-download_alt sidebar-nav-icon", inner: null }, { name: "Контакти", href: "/contacts", className: "gi gi-phone_alt sidebar-nav-icon", inner: null }];

var Sidebar_nav = exports.Sidebar_nav = function (_Extends) {
  _inherits(Sidebar_nav, _Extends);

  function Sidebar_nav(props) {
    _classCallCheck(this, Sidebar_nav);

    var _this = _possibleConstructorReturn(this, (Sidebar_nav.__proto__ || Object.getPrototypeOf(Sidebar_nav)).call(this, props));

    _this.state = { items: _this.props.items };
    _this.onclick = _this.onclick.bind(_this);
    _this.onclickNoAuthCheck = _this.onclickNoAuthCheck.bind(_this);
    _this.ontouchstart = _this.ontouchstart.bind(_this);
    _this.stPropagation = _this.stPropagation.bind(_this);
    return _this;
  }

  _createClass(Sidebar_nav, [{
    key: 'ontouchstart',
    value: function ontouchstart(e) {

      e.stopPropagation();
    }
  }, {
    key: 'stPropagation',
    value: function stPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: 'onclick_old',
    value: function onclick_old() {
      if (window.isMobile) this.sideBarToogle();
      this.activateProgressBar();
      if (!this.checkAuth()) {
        //e.preventDefault();
        this.showAuthWindow();
        this.deActivateProgressBar();
      }

      //this.deActivateProgressBar();
      this.scrollToTop();

      getWorkPage().setState({ renderIN: "", defineRoutes: true });
    }
  }, {
    key: 'onclick',
    value: function onclick(e) {
      var func = function func(moduleWebPath, component) {
        var target = e.target;
        if (window.isMobile) this.sideBarToogle();
        this.activateProgressBar();
        if (!this.checkAuth()) {
          //e.preventDefault();co
          this.showAuthWindow();
          this.deActivateProgressBar();
        }

        //this.deActivateProgressBar();
        this.scrollToTop();

        //getWorkPage().setState({renderIN:"",defineRoutes:true});
        //var routingSwitch=getWorkPage().defineRoute(moduleWebPath,component);
        getWorkPage().setState({ componentSwitch: component, componentSwitchPath: moduleWebPath });
        //getWorkPage().setState({renderIN:routingSwitch,defineRoutes:true});
      };
      func = func.bind(this);

      this.loadNeedModule(e.currentTarget.pathname, func);

      //e.stopPropagation();
      //return;
    }
  }, {
    key: 'onclickNoAuthCheck_old',
    value: function onclickNoAuthCheck_old() {
      if (window.isMobile) this.sideBarToogle();
      //this.deActivateProgressBar();
      this.scrollToTop();
      this.activateProgressBar();
      getWorkPage().setState({ renderIN: "", defineRoutes: true });
    }
  }, {
    key: 'onclickNoAuthCheck',
    value: function onclickNoAuthCheck(e) {
      var func = function func(moduleWebPath, component) {
        if (window.isMobile) this.sideBarToogle();
        //this.deActivateProgressBar();
        this.scrollToTop();
        this.activateProgressBar();
        getWorkPage().setState({ componentSwitch: component, componentSwitchPath: moduleWebPath });
      };

      func = func.bind(this);

      this.loadNeedModule(e.currentTarget.pathname, func);
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch(error, info) {
      console.log(error);
    }
  }, {
    key: 'render',
    value: function render() {
      // debugger  
      var findMySelf = this.findMySelf(this.constructor.name);
      var self = this;

      var b = this.state.items.map(function (item) {
        if (item.hasOwnProperty("href") && item.href != null) {
          if (item.inner instanceof Array) {

            var gg = item.inner.map(function (item_inner) {

              return React.createElement('li', null, React.createElement(_reactRouterDom.Link, { onClick: self.onclick, to: item_inner.href }, React.createElement('i', { className: item_inner.className }), React.createElement('font', null, React.createElement('font', null, item_inner.name))));
            });

            var c = React.createElement('li', null, React.createElement('a', { onClick: self.onclick, href: item.href, className: item.className + " open" }, React.createElement('i', { className: 'fa fa-angle-left sidebar-nav-indicator' }), React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }), React.createElement('font', null, React.createElement('font', null, item.name))), React.createElement('ul', { style: { "display": "block" } }, gg));
            return c;
          } else {
            var ff = React.createElement('li', null, React.createElement(_reactRouterDom.Link, { onClickCapture: self.onclickNoAuthCheck, onMouseOutCapture: self.stPropagation, onMouseOverCapture: self.stPropagation, onTouchStartCapture: self.stPropagation, onTouchMoveCapture: self.stPropagation, to: item.href }, React.createElement('i', { className: item.className }), React.createElement('font', null, React.createElement('font', null, item.name))));
            return ff;
          }
        } else {
          var f = React.createElement('li', { 'class': 'sidebar-header' }, React.createElement('span', { className: 'sidebar-header-title' }, React.createElement('font', null, React.createElement('font', null, item.name))));
          return f;
        }
      });

      var text =

      //for (var item in this.state.items)

      this.state.items.map(function (item) {
        if (item.hasOwnProperty("href") && item.href != null) {
          var ff = false;
          if (item.inner instanceof Array && ff == true) {
            return React.createElement('li', null, React.createElement('a', { href: item.href, className: item.className }, React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }), React.createElement('font', null, React.createElement('font', null, item.name))), React.createElement('ul', null, item.inner.map(function (item_iner) {
              return React.createElement('li', null, React.createElement('a', { href: item_iner.href, className: item_iner.className }, React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }), React.createElement('font', null, React.createElement('font', null, item_iner.name))));
            })));
          } else {

            React.createElement('li', null, React.createElement('a', { className: item.className }, React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }), React.createElement('font', null, React.createElement('font', null, item.name))));
          }
        } else {}
      });
      return React.createElement('ul', { className: 'sidebar-nav' }, ' ', b, ' ');
    }
  }]);

  return Sidebar_nav;
}(_main_component.Extends);
//module.exports = Sidebar_nav;

/***/ })

}]);
//# sourceMappingURL=6.6.js.map