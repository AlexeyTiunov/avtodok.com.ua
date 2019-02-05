(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

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

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_detail.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/order_detail.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Common_th = exports.Brandname_td = exports.Price_td = exports.Action_td = exports.Action_td_old = exports.Status_td = exports.Common_td = exports.Order_header = exports.Order_detail = undefined;

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

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _main_component = __webpack_require__(/*! ./main_component.js */ "./app/main_component.js");

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

var _tablesDatatables = __webpack_require__(/*! ./js/pages/tablesDatatables.js */ "./app/js/pages/tablesDatatables.js");

var _order_action_status = __webpack_require__(/*! ./order_action_status.js */ "./app/order_action_status.js");

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

function getMapObject() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var parceDate = dataConvert.parceDate;

	var mapObject = {
		ORDER_ID: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Номер Заказа", React.createElement(Common_td, null)] },
		RegionCode: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Регион", React.createElement(Common_td, null)] },
		ORDER_STATUS_NAME: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Статус", React.createElement(Common_td, null)] },
		PRICE: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Регион", React.createElement(Common_td, null)] },
		CURRENCY: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Номер", React.createElement(Common_td, null)]
			/* NAME:{functions:{defineColumnName,defineTd},params:["Название",<Common_td />,]},
    QUANTITY:{functions:{defineColumnName,defineTd},params:["Количество",<Common_td/>,]},
    PRICE:{functions:{defineColumnName,defineTd},params:["Цена",<Common_td />,]}, 
    ORDER_PRICE:{functions:{defineColumnName,defineTd},params:["Сумма",<Common_td />,]},
    ITEMSTATUS:{functions:{},params:[]}, 
    action:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Действие","hidden-xs",<Status_td />,],addNew:true},
    state:{functions:{defineColumnName,defineTd},params:["Состояние",<Action_td />,],addNew:true},*/

		} };
	return mapObject;
}
function getMapObjectOrder() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var parceDate = dataConvert.parceDate;
	var mapObject = {
		ID: { functions: {}, params: [] },
		STATUS_ID: { functions: {}, params: [] },
		PRICE: { functions: {}, params: [] },
		DATE_INSERT: { functions: {}, params: [] },
		DARE_UPDATE: { functions: {}, params: [] },
		REGIONCODE: { functions: {}, params: [] },
		ALLOW_DELIVERY: { functions: {}, params: [] },
		REGION_SHORT_NAME: { functions: {}, params: [] },
		REGION_NAME: { functions: {}, params: [] },
		COMMENTS: { functions: {}, params: [] },
		STATUS: { functions: {}, params: [], ignore: true },
		PERSON_TYPE: { functions: {}, params: [], ignore: true },
		PAY_SYSTEM: { functions: {}, params: [], ignore: true },
		CURRENCY: { functions: {}, params: [], ignore: true }
	};
	return mapObject;
}

function getMapObjectItems() {
	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var parceDate = dataConvert.parceDate;
	var defineTh = dataConvert.defineTh;

	var mapObject = {
		ID: { functions: {}, params: [] },
		Brand: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: ["Бренд/Номер/Найм-ня", "", React.createElement(Brandname_td, null), [React.createElement(Common_th, null), "Бренд/Номер/Найм-ня"]] },
		ItemCode: { functions: {}, params: [] },
		NAME: { functions: {}, params: [] },
		PRICE: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Ціна/Кіл-ть/Сума", "", React.createElement(Price_td, null), [React.createElement(Common_th, null), "Ціна/Кіл-ть/Сума"]] },
		QUANTITY: { functions: {}, params: [] },
		CURRENCY: { functions: {}, params: [] },
		RegionCode: { functions: {}, params: [] },
		REGION_SHORT_NAME: { functions: {}, params: [] },
		REGION_NAME: { functions: {}, params: [] },
		ItemStatus: { functions: {}, params: [] },
		ItemStatusQuantity: { functions: {}, params: [] },
		ItemStatus2: { functions: {}, params: [] },
		ItemStatusQuantity2: { functions: {}, params: [] },
		IsReturnable: { functions: {}, params: [] },
		ItemStatusChangeQuery: { functions: {}, params: [] },
		QuantityChangeQuery: { functions: {}, params: [] },
		WAREHOUSEDATE: { functions: {}, params: [] },
		DeliveryMethodToUA: { functions: {}, params: [] },
		action: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: ["Действие", " ", React.createElement(Action_td, null), [React.createElement(Common_th, null), "Дія"]], addNew: true },
		state: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Состояние", React.createElement(Status_td, null), [React.createElement(Common_th, null), "Статус"]], addNew: true }
	};

	return mapObject;
}
var ThemeContext = React.createContext("value");
var regTD = {};
var regTDStatus = {};

var Order_detail = exports.Order_detail = function (_Extends) {
	_inherits(Order_detail, _Extends);

	function Order_detail(props) {
		_classCallCheck(this, Order_detail);

		//this.state=this.props.match.params;
		var _this = _possibleConstructorReturn(this, (Order_detail.__proto__ || Object.getPrototypeOf(Order_detail)).call(this, props));

		_this.state.mapArray = [];
		_this.state.orderHeaderInfo = {};
		try {
			_this.id = _this.props.match.params.id;
		} catch (e) {
			_this.id = _this.props.id;
		}

		return _this;
	}

	_createClass(Order_detail, [{
		key: 'getOrderDetail',
		value: function getOrderDetail(id) {

			var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/order_detail.php", "ID=" + this.id);
			var OrderInfo = function OrderInfo(responseText) {
				handleOrderHeader = new _data_convert.handleData(responseText, undefined, 'ORDER');
				handleOrderItems = new _data_convert.handleData(responseText, getMapObjectItems(), 'BASKET');
				this.setState({ mapArray: handleOrderItems.mapArray, orderHeaderInfo: handleOrderHeader.mapArray });
			};
			OrderInfo = OrderInfo.bind(this);
			Prom.then(OrderInfo);
		}

		///////////////////////////////////

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			_get(Order_detail.prototype.__proto__ || Object.getPrototypeOf(Order_detail.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
			for (state in regTDStatus) {
				regTDStatus[state].setState({ otherTd: null });
			}
			for (action in regTD) {
				regTD[action].setState({ otherTd: null });
			}
			if (this.state.mapArray.length != 0) {

				this.deActivateProgressBar();
			}
			$('[data-toggle="tooltip"]').tooltip();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Order_detail.prototype.__proto__ || Object.getPrototypeOf(Order_detail.prototype), 'componentDidMount', this).call(this);
			//this.getOrderDetail(this.props.match.params.id);
			this.getOrderDetail(this.id);
		}
	}, {
		key: 'render',
		value: function render() {
			var tableHead = null;
			var tableBody = null;
			try {
				var names = this.state.mapArray.map(function (tr) {

					var mas = [];
					for (th in tr) {
						if (tr[th].THH) mas.push(tr[th].THH);
					}
					return mas;
				})[0];
				tableHead = React.createElement('tr', null, names.map(function (item) {
					return item;
				}));
				var rows = this.state.mapArray.map(function (tr) {
					var mas = [];
					for (td in tr) {
						if (tr[td].TD) mas.push(tr[td].TD);
					}

					return mas;

					//return <th className="text-center">{item.Name}</th> 
				});

				var i = 0;
				tableBody = rows.map(function (item) {
					i++;
					return React.createElement(ThemeContext.Provider, { value: i }, React.createElement('tr', { key: i }, item));
				});
			} catch (e) {
				return React.createElement('div', { className: 'block' }, ' ');
			}

			return React.createElement('div', { className: 'block' }, React.createElement('div', { className: 'block full' }, React.createElement('div', { className: 'block-title', style: { "backgroundColor": "white" } }, React.createElement(Order_header, { info: this.state.orderHeaderInfo }), React.createElement('table', { id: 'general-table', className: 'table table-vcenter table-striped table-condensed table-bordered' }, React.createElement('thead', null, tableHead), React.createElement('tbody', null, tableBody)))));
		}
	}]);

	return Order_detail;
}(_main_component.Extends);

var Order_header = exports.Order_header = function (_Extends2) {
	_inherits(Order_header, _Extends2);

	function Order_header(props) {
		_classCallCheck(this, Order_header);

		var _this2 = _possibleConstructorReturn(this, (Order_header.__proto__ || Object.getPrototypeOf(Order_header)).call(this, props));

		_this2.state.info = _this2.props.info;

		return _this2;
	}

	_createClass(Order_header, [{
		key: 'getRegionName',
		value: function getRegionName() {
			var regionRangeObjectValue = {
				"0-1": this.state.info["REGION_NAME"],
				"2-4": this.state.info["REGION_SHORT_NAME"],
				"980-999": this.state.info["REGION_SHORT_NAME"],
				"default": "Украина"

			};

			var RegionCode = this.state.info["REGIONCODE"];
			return this.getRangeObjectValue(regionRangeObjectValue, RegionCode);
		}
	}, {
		key: 'getDeliveryName',
		value: function getDeliveryName() {
			var deliveryNames = {
				"N": "Самовивіз", "Y": "Доставка/Відправка"
			};
			return deliveryNames[this.state.info.ALLOW_DELIVERY];
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', null, React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12 text-center' }, React.createElement('h2', null, "Замовлення № " + this.state.info.ID + " від " + this.state.info.DATE_INSERT))), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 text-center' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, React.createElement('strong', null, "Сума замовлення")))), React.createElement('div', { className: 'col-xs-6 ' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, this.state.info.PRICE + " " + this.state.info.CURRENCY)))), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 text-center' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, React.createElement('strong', null, "Регіон")))), React.createElement('div', { className: 'col-xs-6 ' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h3', null, this.getRegionName())))), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 text-center' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, React.createElement('strong', null, "Спосіб доставки")))), React.createElement('div', { className: 'col-xs-6' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, this.getDeliveryName())))), React.createElement('div', { className: 'row' }));
		}
	}]);

	return Order_header;
}(_main_component.Extends);

var Common_td = exports.Common_td = function (_Extends3) {
	_inherits(Common_td, _Extends3);

	function Common_td(props) {
		_classCallCheck(this, Common_td);

		var _this3 = _possibleConstructorReturn(this, (Common_td.__proto__ || Object.getPrototypeOf(Common_td)).call(this, props));

		_this3.state = _this3.props;

		return _this3;
	}

	_createClass(Common_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: 'text-center' }, this.state.proto[this.state.NAME].fValue);
		}
	}]);

	return Common_td;
}(_main_component.Extends);

var Status_td = exports.Status_td = function (_Extends4) {
	_inherits(Status_td, _Extends4);

	function Status_td(props) {
		_classCallCheck(this, Status_td);

		var _this4 = _possibleConstructorReturn(this, (Status_td.__proto__ || Object.getPrototypeOf(Status_td)).call(this, props));

		_this4.state = _this4.props;
		_this4.id = 0;
		_this4.state.updateFromOtherTD = false;
		_this4.state.otherTd = null;
		_this4.imagePath = '/app/img/order_list/';
		_this4.style = { "width": "20px", "height": "20px" };

		_this4.bClasses = window.configObject["Status_td"].bClasses;
		_this4.iClasses = { "2": "gi gi-remove_2" };
		_this4.statusNames = { "2": "Отказ" };

		_this4.touchstart = _this4.touchstart.bind(_this4);

		return _this4;
	}

	_createClass(Status_td, [{
		key: 'touchstart',
		value: function touchstart() {
			alert("www");
		}
	}, {
		key: 'getRegTd',
		value: function getRegTd() {
			return regTD;
		}
	}, {
		key: 'getRegTdStatus',
		value: function getRegTdStatus() {
			return regTDStatus;
		}
	}, {
		key: 'getfValue',
		value: function getfValue(valueName) {
			try {
				return this.state.proto[valueName].fValue;
			} catch (e) {
				return "";
			}
		}
	}, {
		key: 'defineStatus',
		value: function defineStatus() {

			//var state=this.state.proto.ItemStatus.fValue;
			//var state2=this.state.proto.ItemStatus2.fValue
			var state = this.getfValue("ItemStatus");
			if (state == "") return this.getStatusInWork();
			state = Number(state);
			switch (state) {
				case 0:
					return this.getStatusInWork();
				case 1:
					return this.getStatusPayed();
				case 2:
					return this.getStatusDenided();
				case 3:
					return this.getStatusInStock();
				case 4:
					return this.getStatusShipped();
				case 5:
					return this.getStatusOnTheWay();
				case 7:
					return this.getStatusDelayed();
				default:
					return this.getNullStatus();
			}
		}
	}, {
		key: 'getNullStatus',
		value: function getNullStatus() {
			return React.createElement('a', { href: '####' }, "-");
		}
	}, {
		key: 'getStatusInWork',
		value: function getStatusInWork() {

			return React.createElement('a', { href: '#', 'data-toggle': 'tooltip', 'data-placement': 'top', title: "\u0412 \u0440\u043E\u0431\u043E\u0442\u0456" }, React.createElement('img', { title: '', src: this.imagePath + "v_rabote.png", style: this.style }));
		}
	}, {
		key: 'getStatusDelayed',
		value: function getStatusDelayed() {
			//otlozhen


			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "otlozhen.png", style: this.style }));
		}
	}, {
		key: 'getStatusPayed',
		value: function getStatusPayed() {
			this.updateActionTd("getActionWareHouse");
			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "vykuplen.png", style: this.style }));
		}
	}, {
		key: 'getStatusDenided',
		value: function getStatusDenided() {
			/*try{
   var actionTd=this.getRegTd()[this.id];
      var dataForAction=actionTd.getNullAction();
   actionTd.setState({updateFromOtherTD:true,otherTd:dataForAction})
   }catch(e)
   {}*/
			this.updateActionTd("getNullAction");
			return React.createElement('a', { href: '####', onTouchStart: this.touchstart }, React.createElement('img', { title: 'denided', src: this.imagePath + "otkaz.png", style: this.style }));
		}
	}, {
		key: 'getStatusInStock',
		value: function getStatusInStock() {
			this.updateActionTd("getNullAction");
			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "sklad.png", style: this.style }));
		}
	}, {
		key: 'getStatusShipped',
		value: function getStatusShipped() {
			this.updateActionTd("getNullAction");
			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "otgruzhen.png", style: this.style }));
		}
	}, {
		key: 'getStatusOnTheWay',
		value: function getStatusOnTheWay() {
			this.updateActionTd("getActionWareHouse", '');
			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "method_sea.png", style: this.style }));
		}
	}, {
		key: 'getStatusUserDenyApproved',
		value: function getStatusUserDenyApproved() {
			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "user_deny.png", style: this.style }));
		}
	}, {
		key: 'updateActionTd',
		value: function updateActionTd(funcName, value) {
			try {
				var actionTd = this.getRegTd()[this.id];
				var dataForAction = actionTd[funcName](value);
				actionTd.setState({ updateFromOtherTD: true, otherTd: dataForAction });
			} catch (e) {}
		}

		////////////////////////////////////////////////////

	}, {
		key: 'render',
		value: function render() // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
		{
			/*return(
             
                 <td><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                                   
               
     
         )*/
			var state = null;

			//state=this.defineStatus();

			if ("updateFromOtherTD" in this.state) {
				if (this.state.updateFromOtherTD) {
					state = this.state.otherTd;
				} else {
					state = this.defineStatus();
				}
			} else {
				state = this.defineStatus();
			}

			/*return  (
             <td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{state}</td>
           )*/
			return React.createElement(ThemeContext.Consumer, null, function (id) {
				this.id = id;
				this.getRegTdStatus()[id] = this;
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ItemStatus.fValue) }, state);
			}.bind(this));
		}
	}]);

	return Status_td;
}(_main_component.Extends);

var Action_td_old = exports.Action_td_old = function (_Extends5) {
	_inherits(Action_td_old, _Extends5);

	function Action_td_old(props) {
		_classCallCheck(this, Action_td_old);

		var _this5 = _possibleConstructorReturn(this, (Action_td_old.__proto__ || Object.getPrototypeOf(Action_td_old)).call(this, props));

		_this5.state = _this5.props;
		_this5.state.updateFromOtherTD = false;
		_this5.state.otherTd = null;
		_this5.bClasses = window.configObject["Action_td"].bClasses;
		_this5.style = { "width": "20px", "height": "20px" };
		// this.bClasses={"2":"label label-primary" };
		_this5.iClasses = { "2": "gi gi-remove_2" };
		_this5.statusNames = {
			"0": "В работе",
			"2": "Отказ",
			"5": "В пути"
		};
		_this5.imagePath = '/app/img/order_list/';

		_this5.itemStatusChangeQuery = _this5.itemStatusChangeQuery.bind(_this5);

		return _this5;
	}

	_createClass(Action_td_old, [{
		key: 'itemStatusChangeQuery',
		value: function itemStatusChangeQuery(e) {
			// /ws/ItemStatusChangeQuery.php
			var basketId = this.state.proto.ID.fValue;
			var data = "BASKET_ID=" + basketId + "&STATUS_CODE=2";
			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/ItemStatusChangeQuery.php", data);

			var updateIcon = function (responseText) {
				try {
					var answer = Number(responseText);
					if (!isNaN(answer) && answer > 0) {
						var inWait = this.getActionQueryStatusChangeInWait();
						this.setState({ updateFromOtherTD: true, otherTd: inWait });
					} else {
						this.showInforMassage("ERROR", "Операция не прошла");
					}
				} catch (e) {
					this.showInforMassage("ERROR", "Операция не прошла");
				}
			}.bind(this);

			Prom.then(updateIcon);
		}
	}, {
		key: 'getRegTd',
		value: function getRegTd() {
			return regTD;
		}
	}, {
		key: 'getRegTdStatus',
		value: function getRegTdStatus() {
			return regTDStatus;
		}
	}, {
		key: 'getfValue',
		value: function getfValue(valueName) {
			try {
				return this.state.proto[valueName].fValue;
			} catch (e) {
				return "";
			}
		}
	}, {
		key: 'defineAction',
		value: function defineAction() {
			var itemStatusChangeQuery;
			//var itemStatusChangeQuery=this.state.proto.ItemStatusChangeQuery.fValue;
			var itemStatusChangeQuery = this.getfValue("ItemStatusChangeQuery");
			if (itemStatusChangeQuery == "") return this.getActionCanQueryStatusChange();
			changeQueryArray = itemStatusChangeQuery.split(/#/);
			if (changeQueryArray.length != 2) return this.getActionCanQueryStatusChange();
			var statusToChange = changeQueryArray[0];
			var answerStatus = changeQueryArray[1];
			if (answerStatus == "?") return this.getActionQueryStatusChangeInWait();else if (answerStatus == "X") return this.getActionQueryStatusChangeDined();else if (statusToChange == answerStatus) return this.getActionQueryStatusChangeApproved();else return this.getNullAction();
		}
	}, {
		key: 'getNullAction',
		value: function getNullAction() {
			return React.createElement('a', { href: '####' }, '-');
		}
	}, {
		key: 'getActionCanQueryStatusChange',
		value: function getActionCanQueryStatusChange() {
			return React.createElement('a', { href: '#', onClick: this.itemStatusChangeQuery, 'data-toggle': 'tooltip', 'data-placement': 'top', 'data-original-title': "\u0417\u043D\u044F\u0442\u0438 \u0437 \u0437\u0430\u043A\u0430\u0437\u0443" }, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "user_button_cancel.png" }));
		}
	}, {
		key: 'getActionQueryStatusChangeInWait',
		value: function getActionQueryStatusChangeInWait() {
			return React.createElement('a', { href: '#', 'data-toggle': 'tooltip', 'data-placement': 'top', 'data-original-title': "\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F" }, React.createElement('img', { style: this.style, title: '', src: this.imagePath + "user_deny_wait.png" }));
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
		/////////////////////////////////////////////////////////

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if ("updateFromOtherTD" in nextState) {
				if (nextState.updateFromOtherTD && (nextState.otherTd == undefined || nextState.otherTd == null)) {

					return false;
				}
			}
			return true;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(Action_td_old.prototype.__proto__ || Object.getPrototypeOf(Action_td_old.prototype), 'componentDidUpdate', this).call(this);
			$('[data-toggle="tooltip"]').tooltip();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Action_td_old.prototype.__proto__ || Object.getPrototypeOf(Action_td_old.prototype), 'componentDidMount', this).call(this);
			$('[data-toggle="tooltip"]').tooltip();
		}
	}, {
		key: 'render',
		value: function render() // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
		{
			var action = null;
			if ("updateFromOtherTD" in this.state) {
				if (this.state.updateFromOtherTD) {
					action = this.state.otherTd;
				} else {
					action = this.defineAction();
				}
			} else {
				action = this.defineAction();
			}
			/*return (
    <td className={this.state.proto.action.className}>{action}</td>		  
    )*/

			return React.createElement(ThemeContext.Consumer, null, function (id) {
				this.id = id;
				this.getRegTd()[id] = this;
				//return (<td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{action}</td>)							  
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ItemStatus.fValue) }, action);
			}.bind(this));

			/*return(
               
              <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                  
        
            )*/
		}
	}]);

	return Action_td_old;
}(_main_component.Extends);

var Action_td = exports.Action_td = function (_Order_Action) {
	_inherits(Action_td, _Order_Action);

	function Action_td(props) {
		_classCallCheck(this, Action_td);

		var _this6 = _possibleConstructorReturn(this, (Action_td.__proto__ || Object.getPrototypeOf(Action_td)).call(this, props));

		_this6.state = _this6.props;
		_this6.state.updateFromOtherTD = false;
		_this6.state.otherTd = null;
		_this6.bClasses = window.configObject["Action_td"].bClasses;
		_this6.style = { "width": "20px", "height": "20px" };
		// this.bClasses={"2":"label label-primary" };
		_this6.iClasses = { "2": "gi gi-remove_2" };
		_this6.statusNames = {
			"0": "В работе",
			"2": "Отказ",
			"5": "В пути"
		};
		_this6.imagePath = '/app/img/order_list/';

		_this6.itemStatusChangeQuery = _this6.itemStatusChangeQuery.bind(_this6);

		return _this6;
	}

	_createClass(Action_td, [{
		key: 'itemStatusChangeQuery',
		value: function itemStatusChangeQuery(e) {
			// /ws/ItemStatusChangeQuery.php
			var basketId = this.state.proto.ID.fValue;
			var data = "BASKET_ID=" + basketId + "&STATUS_CODE=2";
			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/ItemStatusChangeQuery.php", data);

			var updateIcon = function (responseText) {
				try {
					var answer = Number(responseText);
					if (!isNaN(answer) && answer > 0) {
						var inWait = this.getActionQueryStatusChangeInWait();
						this.setState({ updateFromOtherTD: true, otherTd: inWait });
					} else {
						this.showInforMassage("ERROR", "Операция не прошла");
					}
				} catch (e) {
					this.showInforMassage("ERROR", "Операция не прошла");
				}
			}.bind(this);

			Prom.then(updateIcon);
		}
	}, {
		key: 'getRegTd',
		value: function getRegTd() {
			return regTD;
		}
	}, {
		key: 'getRegTdStatus',
		value: function getRegTdStatus() {
			return regTDStatus;
		}
	}, {
		key: 'getfValue',
		value: function getfValue(valueName) {
			try {
				return this.state.proto[valueName].fValue;
			} catch (e) {
				return "";
			}
		}
	}, {
		key: 'defineAction',
		value: function defineAction() {
			var itemStatusChangeQuery;
			//var itemStatusChangeQuery=this.state.proto.ItemStatusChangeQuery.fValue;
			var itemStatusChangeQuery = this.getfValue("ItemStatusChangeQuery");
			if (itemStatusChangeQuery == "") return this.getActionCanQueryStatusChange();
			changeQueryArray = itemStatusChangeQuery.split(/#/);
			if (changeQueryArray.length != 2) return this.getActionCanQueryStatusChange();
			var statusToChange = changeQueryArray[0];
			var answerStatus = changeQueryArray[1];
			if (answerStatus == "?") return this.getActionQueryStatusChangeInWait();else if (answerStatus == "X") return this.getActionQueryStatusChangeDined();else if (statusToChange == answerStatus) return this.getActionQueryStatusChangeApproved();else return this.getNullAction();
		}
		/////////////////////////////////////////////////////////

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if ("updateFromOtherTD" in nextState) {
				if (nextState.updateFromOtherTD && (nextState.otherTd == undefined || nextState.otherTd == null)) {

					return false;
				}
			}
			return true;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(Action_td.prototype.__proto__ || Object.getPrototypeOf(Action_td.prototype), 'componentDidUpdate', this).call(this);
			$('[data-toggle="tooltip"]').tooltip();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Action_td.prototype.__proto__ || Object.getPrototypeOf(Action_td.prototype), 'componentDidMount', this).call(this);
			$('[data-toggle="tooltip"]').tooltip();
		}
	}, {
		key: 'render',
		value: function render() // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
		{
			var action = null;
			if ("updateFromOtherTD" in this.state) {
				if (this.state.updateFromOtherTD) {
					action = this.state.otherTd;
				} else {
					action = this.defineAction();
				}
			} else {
				action = this.defineAction();
			}
			/*return (
    <td className={this.state.proto.action.className}>{action}</td>		  
    )*/

			return React.createElement(ThemeContext.Consumer, null, function (id) {
				this.id = id;
				this.getRegTd()[id] = this;
				//return (<td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{action}</td>)							  
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ItemStatus.fValue) }, action);
			}.bind(this));

			/*return(
               
              <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                  
        
            )*/
		}
	}]);

	return Action_td;
}(_order_action_status.Order_Action);

var Price_td = exports.Price_td = function (_Extends6) {
	_inherits(Price_td, _Extends6);

	function Price_td(props) {
		_classCallCheck(this, Price_td);

		var _this7 = _possibleConstructorReturn(this, (Price_td.__proto__ || Object.getPrototypeOf(Price_td)).call(this, props));

		_this7.state = _this7.props;

		return _this7;
	}

	_createClass(Price_td, [{
		key: 'render',
		value: function render() {
			dataConvert = new _data_convert.handleData(null, null);
			var fN = dataConvert.formatNumberRet;
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.PRICE.fValue, React.createElement('br', null), "x ", React.createElement('strong', null, React.createElement('span', { 'class': 'badge' }, this.state.proto.QUANTITY.fValue)), React.createElement('br', null), "= ", fN(Number(this.state.proto.PRICE.fValue) * Number(this.state.proto.QUANTITY.fValue), ".", "2"), React.createElement('br', null), this.state.proto.CURRENCY.fValue);
		}
	}]);

	return Price_td;
}(_main_component.Extends);

var Brandname_td = exports.Brandname_td = function (_Extends7) {
	_inherits(Brandname_td, _Extends7);

	function Brandname_td(props) {
		_classCallCheck(this, Brandname_td);

		var _this8 = _possibleConstructorReturn(this, (Brandname_td.__proto__ || Object.getPrototypeOf(Brandname_td)).call(this, props));

		_this8.state = _this8.props;

		return _this8;
	}

	_createClass(Brandname_td, [{
		key: 'render',
		value: function render() {

			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.Brand.fValue, React.createElement('br', null), this.state.proto.ItemCode.fValue, React.createElement('br', null), this.state.proto.NAME.fValue, React.createElement('br', null));
		}
	}]);

	return Brandname_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends8) {
	_inherits(Common_th, _Extends8);

	function Common_th(props) {
		_classCallCheck(this, Common_th);

		var _this9 = _possibleConstructorReturn(this, (Common_th.__proto__ || Object.getPrototypeOf(Common_th)).call(this, props));

		_this9.state = _this9.props;

		return _this9;
	}

	_createClass(Common_th, [{
		key: 'renderCaption',
		value: function renderCaption() {
			if (!this.state.caption) {
				return "";
			} else {
				return this.state.caption.split(/\//);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var caption = this.renderCaption();
			if (caption instanceof Array) {
				var a = React.createElement('th', { className: 'text-center' }, caption.map(function (item) {

					return React.createElement('span', null, React.createElement('span', null, item), ' ', React.createElement('br', null));
				}));
				return a;
			} else {
				var _a = React.createElement('th', { className: 'text-center' }, this.state.caption);
				return _a;
			}
		}
	}]);

	return Common_th;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=0.0.js.map