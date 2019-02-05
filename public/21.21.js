(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

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

/***/ })

}]);
//# sourceMappingURL=21.21.js.map