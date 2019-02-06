(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./app/catalogs_auto.js":
/*!******************************!*\
  !*** ./app/catalogs_auto.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Catalogs_auto = undefined;

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

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

var Catalogs_auto = exports.Catalogs_auto = function (_Extends) {
	_inherits(Catalogs_auto, _Extends);

	function Catalogs_auto(props) {
		_classCallCheck(this, Catalogs_auto);

		return _possibleConstructorReturn(this, (Catalogs_auto.__proto__ || Object.getPrototypeOf(Catalogs_auto)).call(this, props));
	}
	///////////////////////


	_createClass(Catalogs_auto, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			/*var $script = require("scriptjs");
         var scr= new $script("//gui.parts-catalogs.com/parts-catalogs.js", function() {});*/
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = "http://gui.parts-catalogs.com/parts-catalogs.js";
			head.appendChild(script);
			this.deActivateProgressBar();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			/*var $script = require("scriptjs");
        var scr= new $script("//gui.parts-catalogs.com/parts-catalogs.js", function() {});*/
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = "http://gui.parts-catalogs.com/parts-catalogs.js";
			head.appendChild(script);
			this.deActivateProgressBar();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var thisElement = ReactDOM.findDOMNode(this);
			var scriptsCollection = document.getElementsByTagName("script");
			for (item in scriptsCollection) {
				if (scriptsCollection[item].src == "http://gui.parts-catalogs.com/bundle.js" || scriptsCollection[item].src == "http://gui.parts-catalogs.com/parts-catalogs.js") scriptsCollection[item].parentNode.removeChild(scriptsCollection[item]);
			}
			var svgCollection = document.getElementsByTagName("svg");
			for (item in svgCollection) {
				try {
					svgCollection[item].parentNode.removeChild(svgCollection[item]);
				} catch (e) {}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', null, React.createElement('div', { id: 'parts-catalog', 'data-key': 'TWS-6B325EDE-DE5D-4DC7-AF10-FA8B49E121C5', 'data-target': 'new_window' }));
		}
	}]);

	return Catalogs_auto;
}(_main_component.Extends);

/***/ }),

/***/ "./app/contacts.js":
/*!*************************!*\
  !*** ./app/contacts.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Contacts = undefined;

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

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

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

var Contacts = exports.Contacts = function (_Extends) {
    _inherits(Contacts, _Extends);

    function Contacts(props) {
        _classCallCheck(this, Contacts);

        return _possibleConstructorReturn(this, (Contacts.__proto__ || Object.getPrototypeOf(Contacts)).call(this, props));
    }

    _createClass(Contacts, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12 col-sm-3 col-md-3' }, React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'fa fa-building' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '097 025 11 10')), React.createElement('small', null, React.createElement('em', null, "\u041E\u0444\u0456\u0441"))))), React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'gi gi-cart_in' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '044 545 70 17 + 111')), React.createElement('small', null, React.createElement('em', null, "\u0417\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u043E \u0423\u043A\u0440\u0430\u0457\u043D\u0456"))))), React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'gi gi-globe_af' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '044 545 70 17 + 105')), React.createElement('small', null, React.createElement('em', null, "\u0417\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043A\u043E\u0440\u0434\u043E\u043D"))))), React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'gi gi-money' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '044 545 70 17 + 107')), React.createElement('small', null, React.createElement('em', null, "\u0411\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440"))))), React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'gi gi-money' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '044 545 70 17 + 107')), React.createElement('small', null, React.createElement('em', null, "\u0413\u043E\u043B\u043E\u0432\u043D\u0438\u0439 \u0431\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440"))))), React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'gi gi-money' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '044 545 70 17 + 107')), React.createElement('small', null, React.createElement('em', null, "\u0421\u043F\u0456\u0440\u043D\u0456 \u043F\u0438\u0442\u0430\u043D\u043D\u044F")))))), React.createElement('div', { className: ' col-xs-12 col-sm-4 col-md-8' }, React.createElement('div', { className: 'col-md-4' }, React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'mailto:office@parts.avtodok.com.ua' }, ' office', React.createElement('br', null), '@parts.avtodok.com.ua'), React.createElement('small', null, React.createElement('em', null, "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0456 \u043F\u0438\u0442\u0430\u043D\u043D\u044F")))))), React.createElement('div', { className: 'col-md-4' }, React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'mailto:sklad@parts.avtodok.com.ua' }, 'sklad', React.createElement('br', null), '@parts.avtodok.com.ua'), React.createElement('small', null, React.createElement('em', null, "\u041F\u0438\u0442\u0430\u043D\u043D\u044F \u043F\u043E \u043F\u0440\u0430\u0439\u0441\u0443")))))), React.createElement('div', { className: 'col-md-4' }, React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'mailto:accountant@parts.avtodok.com.ua' }, 'accountant', React.createElement('br', null), '@parts.avtodok.com.ua'), React.createElement('small', null, React.createElement('em', null, "\u0424\u0456\u043D\u0430\u043D\u0441\u043E\u0432\u0456 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F")))))), React.createElement('div', { className: 'col-md-12 hidden-xs' }, React.createElement('div', { className: 'block full' }, React.createElement('div', { className: 'block-title' }, React.createElement('h4', null, React.createElement('strong', null, "\u041A\u0430\u0440\u0442\u0430"))), React.createElement('iframe', { src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.1534316958764!2d30.57767197538826!3d50.40618950559063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7b6db373c439eae!2z0JDQstGC0L7QtNC-0Log0J_QsNGA0YLRgQ!5e0!3m2!1sru!2sua!4v1480087827109', width: '100%', height: '400em', frameborder: '0', style: { "border": "0" }, allowfullscreen: true })))), React.createElement('div', { className: 'col-xs-12 visible-xs' }, React.createElement('div', { className: 'block full' }, React.createElement('div', { className: 'block-title' }, React.createElement('h4', null, React.createElement('strong', null, "\u041A\u0430\u0440\u0442\u0430"))), React.createElement('iframe', { src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.1534316958764!2d30.57767197538826!3d50.40618950559063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7b6db373c439eae!2z0JDQstGC0L7QtNC-0Log0J_QsNGA0YLRgQ!5e0!3m2!1sru!2sua!4v1480087827109', width: '100%', height: '400em', frameborder: '0', style: { "border": "0" }, allowfullscreen: true }))));
        }
    }]);

    return Contacts;
}(_main_component.Extends);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_basket.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/order_basket.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Order_basket = undefined;

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

var _order_detail = __webpack_require__(/*! ./order_detail.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_detail.js");

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

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

var Order_basket = exports.Order_basket = function (_Extends) {
	_inherits(Order_basket, _Extends);

	function Order_basket(props) {
		_classCallCheck(this, Order_basket);

		var _this = _possibleConstructorReturn(this, (Order_basket.__proto__ || Object.getPrototypeOf(Order_basket)).call(this, props));

		_this.state = _this.props.match;
		_this.state.id = 0;

		return _this;
	}

	_createClass(Order_basket, [{
		key: 'orderBusket',
		value: function orderBusket() {

			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/autodoc/process_order.php", this.makePostDataFromState());
			var busket = function (responseText) {
				handleOrders = new _data_convert.handleData(responseText, undefined, "ORDERS");
				handleOrderNum = new _data_convert.handleData(responseText, undefined, "NUM_ORDERS");
				this.setState({ mapArray: handleOrders.mapArray, ordersNum: handleOrderNum.mapArray });
			}.bind(this);

			Prom.then(busket);
		}
		//////////////////////////////////////

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.deActivateProgressBar();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.orderBusket();
		}
	}, {
		key: 'render',
		value: function render() {
			var madeOrders = [];
			try {

				var idS = this.state.mapArray.map(function (item) {
					return item.ORDER.ID;
				});
				madeOrders = idS.map(function (item) {
					return React.createElement(_order_detail.Order_detail, { id: item });
				});
			} catch (e) {}
			return React.createElement('div', { 'class': 'block full' }, madeOrders);
		}
	}]);

	return Order_basket;
}(_main_component.Extends);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/page_content_v1.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/page_content_v1.js ***!
  \****************************************************************************************************************/
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

var _search_content = __webpack_require__(/*! ./search_content.js */ "./app/search_content.js");

var _basket_items = __webpack_require__(/*! ./basket_items.js */ "./app/basket_items.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _order_basket = __webpack_require__(/*! ./order_basket.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_basket.js");

var _order_list = __webpack_require__(/*! ./order_list.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_list.js");

var _order_detail = __webpack_require__(/*! ./order_detail.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_detail.js");

var _sidebar_userinfo = __webpack_require__(/*! ./sidebar_userinfo.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/sidebar_userinfo.js");

var _search_content_v = __webpack_require__(/*! ./search_content_v2.js */ "./app/search_content_v2.js");

var _start_page = __webpack_require__(/*! ./start_page.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/start_page.js");

var _balance = __webpack_require__(/*! ./balance.js */ "./app/balance.js");

var _shipment_readydellivery = __webpack_require__(/*! ./shipment_readydellivery.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shipment_readydellivery.js");

var _itemcodes_history = __webpack_require__(/*! ./itemcodes_history.js */ "./app/itemcodes_history.js");

var _shipingdocs = __webpack_require__(/*! ./shipingdocs.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shipingdocs.js");

var _shiping_detail = __webpack_require__(/*! ./shiping_detail.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shiping_detail.js");

var _shipingdoc_detail = __webpack_require__(/*! ./shipingdoc_detail.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shipingdoc_detail.js");

var _contacts = __webpack_require__(/*! ./contacts.js */ "./app/contacts.js");

var _catalogs_auto = __webpack_require__(/*! ./catalogs_auto.js */ "./app/catalogs_auto.js");

var _return_docs = __webpack_require__(/*! ./return_docs.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/return_docs.js");

var _item_info = __webpack_require__(/*! ./item_info.js */ "./app/item_info.js");

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

var Page_content = exports.Page_content = function (_Extends) {
  _inherits(Page_content, _Extends);

  function Page_content(props) {
    _classCallCheck(this, Page_content);

    //this.state={renderIN:""};
    //this.state={parentMod:props.parentMod}; 
    var _this = _possibleConstructorReturn(this, (Page_content.__proto__ || Object.getPrototypeOf(Page_content)).call(this, props));

    _this.state.defineRoutes = true;
    _this.touchMove = _this.touchMove.bind(_this);

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
    key: 'defineRoutes',
    value: function defineRoutes(defRoutes) {
      if (defRoutes) {
        return React.createElement(_reactRouterDom.Switch, null, React.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _start_page.Start_page }), React.createElement(_reactRouterDom.Route, { path: '/balance', component: _balance.Balance }), React.createElement(_reactRouterDom.Route, { path: '/history', component: _itemcodes_history.History }), React.createElement(_reactRouterDom.Route, { path: '/shdocs', component: _shipingdocs.Shiping_docs }), React.createElement(_reactRouterDom.Route, { path: '/shipments', component: _shipment_readydellivery.Shipments }), React.createElement(_reactRouterDom.Route, { path: '/basket', component: _basket_items.Basket }), React.createElement(_reactRouterDom.Route, { path: '/order_basket/:DELIVERY/:PAYS', component: _order_basket.Order_basket }), React.createElement(_reactRouterDom.Route, { path: '/order_list', component: _order_list.Order_list }), React.createElement(_reactRouterDom.Route, { path: '/order_detail/:id', component: _order_detail.Order_detail }), React.createElement(_reactRouterDom.Route, { path: '/shiping_detail/:id', component: _shiping_detail.Shiping_detail }), React.createElement(_reactRouterDom.Route, { path: '/shipingdoc_detail/:id', component: _shipingdoc_detail.Shipingdoc_detail }), React.createElement(_reactRouterDom.Route, { path: '/user_info', component: _sidebar_userinfo.Sidebar_usersettings }), React.createElement(_reactRouterDom.Route, { path: '/search/:id?', component: _search_content_v.Search_table_v2 }), React.createElement(_reactRouterDom.Route, { path: '/avtodok.com.ua/search/:id?', component: _search_content_v.Search_table_v2 }), React.createElement(_reactRouterDom.Route, { path: '/contacts', component: _contacts.Contacts }), React.createElement(_reactRouterDom.Route, { path: '/catalogs_auto', component: _catalogs_auto.Catalogs_auto }), React.createElement(_reactRouterDom.Route, { path: '/retdocs', component: _return_docs.Return_docs }), React.createElement(_reactRouterDom.Route, { path: '/catalog/:brandname?/:itemcode?/:itemanalogcode?', component: _item_info.Item_info }));
      } else {
        return React.createElement('div', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var routes = this.defineRoutes(this.state.defineRoutes);
      return React.createElement('div', { id: 'page-content', style: { 'min-height': '977px' } }, routes, this.state.renderIN);
    }
  }]);

  return Page_content;
}(_main_component.Extends);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/return_docs.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/return_docs.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Return_docs = undefined;

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

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

var _tablesDatatables = __webpack_require__(/*! ./js/pages/tablesDatatables.js */ "./app/js/pages/tablesDatatables.js");

var _app = __webpack_require__(/*! ./js/app.js */ "./app/js/app.js");

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

var Return_docs = exports.Return_docs = function (_Extends) {
	_inherits(Return_docs, _Extends);

	function Return_docs(props) {
		_classCallCheck(this, Return_docs);

		return _possibleConstructorReturn(this, (Return_docs.__proto__ || Object.getPrototypeOf(Return_docs)).call(this, props));
	}

	_createClass(Return_docs, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', { className: 'block' });
		}
	}]);

	return Return_docs;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=24.24.js.map