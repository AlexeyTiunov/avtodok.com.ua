(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/page_content.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/babel-loader/lib??ref--6!./app/page_content.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page_content = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

var _main_component = __webpack_require__(/*! ./main_component.js */ "./app/main_component.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _start_page = __webpack_require__(/*! ./start_page.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/start_page.js");

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
/*import {Search_table} from './search_content.js'
import {Basket} from './basket_items.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import {Order_basket} from './order_basket.js'
import {Order_list} from './order_list.js'
import {Order_detail} from './order_detail.js'  
import {Sidebar_usersettings} from './sidebar_userinfo.js'
import {Search_table_v2} from './search_content_v2.js'
import {Start_page} from './start_page.js'
import {Balance} from './balance.js' 
import {Shipments} from './shipment_readydellivery.js'
import {History} from './itemcodes_history.js'
import {Shiping_docs} from './shipingdocs.js'
import {Shiping_detail} from './shiping_detail.js'
import {Shipingdoc_detail} from './shipingdoc_detail.js'
import {Contacts} from './contacts.js'
import {Catalogs_auto} from './catalogs_auto.js'
import {Return_docs} from './return_docs.js'
import {Item_info} from './item_info.js'*/

var Page_content = exports.Page_content = function (_Extends) {
  _inherits(Page_content, _Extends);

  function Page_content(props) {
    _classCallCheck(this, Page_content);

    //this.state={renderIN:""};
    //this.state={parentMod:props.parentMod}; 
    var _this = _possibleConstructorReturn(this, (Page_content.__proto__ || Object.getPrototypeOf(Page_content)).call(this, props));

    _this.state.defineRoutes = true;
    _this.touchMove = _this.touchMove.bind(_this);
    _this.state.componentSwitch = null;
    _this.state.componentSwitchPath = null;

    return _this;
  }

  _createClass(Page_content, [{
    key: 'touchMove',
    value: function touchMove(e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      alert(x);
    }
    ////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Page_content.prototype.__proto__ || Object.getPrototypeOf(Page_content.prototype), 'componentDidMount', this).call(this);
      // super.childUpdate(this,<h1>success</h1>);   
      // this.state.parentMod.childUpdate(this);

      // super.makeRequest("POST","/ws/auth.php",false,"LOGIN=Alex");
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      _get(Page_content.prototype.__proto__ || Object.getPrototypeOf(Page_content.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
      $('[data-toggle="tooltip"]').tooltip();
    }
  }, {
    key: 'defineRoute',
    value: function defineRoute(path, component) {
      return React.createElement(_reactRouterDom.Switch, null, React.createElement(_reactRouterDom.Route, { exact: true, path: path, component: component }));
    }
  }, {
    key: 'defineDefaultRoute',
    value: function defineDefaultRoute() {
      return React.createElement(_reactRouterDom.Switch, null, React.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _start_page.Start_page }));
    }
  }, {
    key: 'defineRoutes',
    value: function defineRoutes(defRoutes) {
      if (defRoutes) {
        return React.createElement(_reactRouterDom.Switch, null, React.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _start_page.Start_page }), React.createElement(_reactRouterDom.Route, { path: '/balance', component: Balance }), React.createElement(_reactRouterDom.Route, { path: '/history', component: History }), React.createElement(_reactRouterDom.Route, { path: '/shdocs', component: Shiping_docs }), React.createElement(_reactRouterDom.Route, { path: '/shipments', component: Shipments }), React.createElement(_reactRouterDom.Route, { path: '/basket', component: Basket }), React.createElement(_reactRouterDom.Route, { path: '/order_basket/:DELIVERY/:PAYS', component: Order_basket }), React.createElement(_reactRouterDom.Route, { path: '/order_list', component: Order_list }), React.createElement(_reactRouterDom.Route, { path: '/order_detail/:id', component: Order_detail }), React.createElement(_reactRouterDom.Route, { path: '/shiping_detail/:id', component: Shiping_detail }), React.createElement(_reactRouterDom.Route, { path: '/shipingdoc_detail/:id', component: Shipingdoc_detail }), React.createElement(_reactRouterDom.Route, { path: '/user_info', component: Sidebar_usersettings }), React.createElement(_reactRouterDom.Route, { path: '/search/:id?', component: Search_table_v2 }), React.createElement(_reactRouterDom.Route, { path: '/avtodok.com.ua/search/:id?', component: Search_table_v2 }), React.createElement(_reactRouterDom.Route, { path: '/contacts', component: Contacts }), React.createElement(_reactRouterDom.Route, { path: '/catalogs_auto', component: Catalogs_auto }), React.createElement(_reactRouterDom.Route, { path: '/retdocs', component: Return_docs }), React.createElement(_reactRouterDom.Route, { path: '/catalog/:brandname?/:itemcode?/:itemanalogcode?', component: Item_info }));
      } else {
        return React.createElement('div', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // const routes=this.defineRoutes(this.state.defineRoutes);
      var routes = "";
      if (this.state.defineRoutes) {
        if (this.state.componentSwitch == null || this.state.componentSwitchPath == null) {
          var locationPath = location.pathname;
          var func = function func(moduleWebPath, component) {
            this.setState({ componentSwitch: component, componentSwitchPath: moduleWebPath });
          };
          func = func.bind(this);
          this.loadNeedModule(locationPath, func);

          //routes=this.defineDefaultRoute();
        } else {
          routes = this.defineRoute(this.state.componentSwitchPath, this.state.componentSwitch);
        }
      } else {
        routes = this.defineRoutes(this.state.defineRoutes);
      }
      return React.createElement('div', { id: 'page-content', style: { 'min-height': '977px' } }, routes, this.state.renderIN);
    }
  }]);

  return Page_content;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=23.23.js.map