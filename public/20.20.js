(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./app/order_action_status.js":
/*!************************************!*\
  !*** ./app/order_action_status.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ItemStatusChange_Query = exports.Order_Action = undefined;

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

var Order_Action = exports.Order_Action = function (_Extends) {
	_inherits(Order_Action, _Extends);

	function Order_Action(props) {
		_classCallCheck(this, Order_Action);

		return _possibleConstructorReturn(this, (Order_Action.__proto__ || Object.getPrototypeOf(Order_Action)).call(this, props));
	}

	_createClass(Order_Action, [{
		key: 'getNullAction',
		value: function getNullAction() {
			return React.createElement('a', { href: '####' }, '-');
		}
	}, {
		key: 'getActionCanQueryStatusChange',
		value: function getActionCanQueryStatusChange() {
			return React.createElement('a', { href: '####', onClick: this.itemStatusChangeQuery }, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "user_button_cancel.png" }));
		}
	}, {
		key: 'getActionQueryStatusChangeInWait',
		value: function getActionQueryStatusChangeInWait() {
			return React.createElement('a', null, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "user_deny_wait.png" }));
		}
	}, {
		key: 'getActionQueryStatusChangeDined',
		value: function getActionQueryStatusChangeDined() {
			return React.createElement('a', { href: '####' }, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "v_rabote.png" }));
		}
	}, {
		key: 'getActionQueryStatusChangeApproved',
		value: function getActionQueryStatusChangeApproved() {
			this.updateStatus("getStatusUserDenyApproved");
			return React.createElement('a', { href: '####' }, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "user_deny.png" }));
		}
	}, {
		key: 'getActionWareHouse',
		value: function getActionWareHouse() {
			var dateArr = this.state.proto.WAREHOUSEDATE.fValue.split(/\s/);
			var date = "";
			if (dateArr instanceof Array) {
				date = dateArr[0];
			}
			return React.createElement('a', { href: '####' }, React.createElement('img', { style: this.style, 'data-toggle': 'tooltip', 'data-placement': 'top', 'data-original-title': date, src: this.imagePath + "date_come.png" }));
		}
	}, {
		key: 'updateStatus',
		value: function updateStatus(funcName, value) {
			try {
				var statusTd = this.getRegTdStatus()[this.id];
				var dataForStatus = statusTd[funcName](value);
				statusTd.setState({ updateFromOtherTD: true, otherTd: dataForStatus });
			} catch (e) {}
		}
	}]);

	return Order_Action;
}(_main_component.Extends);

var ItemStatusChange_Query = exports.ItemStatusChange_Query = function (_Extends2) {
	_inherits(ItemStatusChange_Query, _Extends2);

	function ItemStatusChange_Query(props) {
		_classCallCheck(this, ItemStatusChange_Query);

		var _this2 = _possibleConstructorReturn(this, (ItemStatusChange_Query.__proto__ || Object.getPrototypeOf(ItemStatusChange_Query)).call(this, props));

		_this2.actionComponent = _this2.constructor.actionComponent;
		_this2.itemStatusChangeQuery = _this2.itemStatusChangeQuery.bind(_this2);
		_this2.answerState = false;
		_this2.queryText = "Чи відправити запит на відмову від позиції?";
		_this2.unMount = _this2.unMount.bind(_this2);

		return _this2;
	}

	_createClass(ItemStatusChange_Query, [{
		key: 'itemStatusChangeQuery',
		value: function itemStatusChangeQuery(e) {
			// /ws/ItemStatusChangeQuery.php
			var basketId = this.actionComponent.state.proto.ID.fValue;
			var data = "BASKET_ID=" + basketId + "&STATUS_CODE=2";
			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/ItemStatusChangeQuery.php", data);

			var updateIcon = function (responseText) {
				try {
					var answer = Number(responseText);
					if (!isNaN(answer) && answer > 0) {
						var inWait = this.actionComponent.getActionQueryStatusChangeInWait();
						this.actionComponent.setState({ updateFromOtherTD: true, otherTd: inWait });
						this.queryText = "Запит відправленно.";
					} else {
						this.queryText = "Запит не відправленно.";
					}
				} catch (e) {
					this.queryText = "Запит не відправленно.";
				}
				this.answerState = true;
				this.setState({ justUpdate: null });
			}.bind(this);

			Prom.then(updateIcon);
		}
	}, {
		key: 'unMount',
		value: function unMount(e) {
			var thisElement = ReactDOM.findDOMNode(this);
			ReactDOM.unmountComponentAtNode(thisElement);
		}
		/////////////////////////////////////

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(ItemStatusChange_Query.prototype.__proto__ || Object.getPrototypeOf(ItemStatusChange_Query.prototype), 'componentDidMount', this).call(this);
			this.answerState = false;
			this.queryText = "Чи відправити запит на відмову від позиції?";
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(ItemStatusChange_Query.prototype.__proto__ || Object.getPrototypeOf(ItemStatusChange_Query.prototype), 'componentDidUpdate', this).call(this);
			this.answerState = false;
			this.queryText = "Чи відправити запит на відмову від позиції?";
		}
	}, {
		key: 'render',
		value: function render() {

			var buttons = React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 text-left' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "  Ні  ")))), React.createElement('div', { className: 'col-xs-6 text-right' }, React.createElement('button', { type: 'button', onClick: this.itemStatusChangeQuery, className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "  Так  ")))));
			if (this.answerState) {
				buttons = React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', onClick: this.unMount, className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0438\u0439\u0442\u0438"))));
			}

			return React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, "\u0417\u0430\u043F\u0438\u0442 \u043D\u0430 \u0432\u0456\u0434\u043C\u043E\u0432\u0443 \u0432\u0456\u0434 \u043F\u043E\u0437\u0438\u0446\u0456\u0457.")))), React.createElement('div', { className: 'modal-body' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, this.queryText)))), React.createElement('div', { className: 'form-group form-actions' }, buttons)), React.createElement('div', { className: 'modal-footer' })));
		}
	}]);

	return ItemStatusChange_Query;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=20.20.js.map