(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shipment_readydellivery.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/babel-loader/lib??ref--6!./app/shipment_readydellivery.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Common_th = exports.Common_td = exports.Price_td = exports.Brandname_td = exports.Shipmentnumber_td = exports.Shipment_readyordelivery = exports.Shipments = undefined;

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

function getMapObject() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var defineTh = dataConvert.defineTh;
	var parceDate = dataConvert.parceDate;

	/*
 "AD000133741":
 {"SHIPMENT_INFO":
 {"shipnumber":"AD000133741",
 "currency":"USD","NUMBER":"AD000133741",
 "SHIPMENT_TYPE":null,"DELIVERY_ALLOW":null,
 "CLIENT_CODE":"00742","AGREEMENT_CODE":
 "000000061","DATE":"06.18.2018"},
 "56947486":{"ShipingID":"56947485",
 "Shiping1cCode":"AD000133741",
 "ItemCode":"287513S000",
 "ItemCodeTamlated":"28751-3S000",
 "BrandCode":"Hyundai","Caption":"GASKET-EXH","Quantity":"1","Price":"3.53","Sum":"3.53","Order":"161716"}}}
  "AgreementInfo":{"CurrencyCode":"USD",
 "OrdersAllSumm":"5952.54","OrdersWorkSumm":"5952.54","CurrentDebt":"2131.12","CurrentDelayDebt":"0"
 */

	var mapObject = {
		ID: { functions: {}, params: [] },
		shipnumber: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: ["Номер/Дата/Замовлення", "", React.createElement(Shipmentnumber_td, null), [React.createElement(Common_th, null), "Номер/Дата/Замовлення"]] },
		currency: { functions: {}, params: [] },
		CLIENT_CODE: { functions: {}, params: [] },
		AGREEMENT_CODE: { functions: {}, params: [] },
		DATE: { functions: {}, params: [] },
		ShipingID: { functions: {}, params: [] },
		Shiping1cCode: { functions: {}, params: [] },
		SHIPMENT_TYPE: { functions: {}, params: [] },
		DELIVERY_ALLOW: { functions: {}, params: [] },
		BrandCode: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: ["Бренд/Номер/Найм-ня", "", React.createElement(Brandname_td, null), [React.createElement(Common_th, null), "Бренд/Номер/Найм-ня"]] },
		ItemCode: { functions: {}, params: [] },
		ItemCodeTamlated: { functions: {}, params: [] },
		Caption: { functions: { formatNumber: formatNumber }, params: [] },
		Price: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Ціна/Кіл-ть/Сума", "", React.createElement(Price_td, null), [React.createElement(Common_th, null), "Ціна/Кіл-ть/Сума"]] },
		Quantity: { functions: {}, params: [] },
		Sum: { functions: { formatNumber: formatNumber }, params: [[".", "2"]] },
		Order: { functions: {}, params: [] },
		CurrentDebt: { functions: { formatNumber: formatNumber }, params: [[".", "2"]] },
		CurrentDelayDebt: { functions: { formatNumber: formatNumber }, params: [[".", "2"]] },
		totalSum: { functions: {}, params: [], addNew: true },
		deliveryType: { functions: {}, params: [], addNew: true },
		comments: { functions: {}, params: [], addNew: true }
	};
	return mapObject;
}
function getMapObjectId() {
	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var parceDate = dataConvert.parceDate;
	var mapObject = {
		ID: { functions: {}, params: [] }
	};

	return mapObject;
}

var Shipments = exports.Shipments = function (_Extends) {
	_inherits(Shipments, _Extends);

	function Shipments(props) {
		_classCallCheck(this, Shipments);

		var _this = _possibleConstructorReturn(this, (Shipments.__proto__ || Object.getPrototypeOf(Shipments)).call(this, props));

		_this.state.mapArray = [];
		return _this;
	}

	_createClass(Shipments, [{
		key: 'getShipments',
		value: function getShipments() {
			data = "SHIPNUMBERONLY=Y";
			var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/shipmentReadyToDeliver.php", data);

			var shipmentInfo = function shipmentInfo(responseText) {
				handleBR = new _data_convert.handleData(responseText, getMapObjectId());
				this.setState({ mapArray: handleBR.mapArray });
			};
			shipmentInfo = shipmentInfo.bind(this);
			Prom.then(shipmentInfo);
		}
		///////////////////////////////////////////////////

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(Shipments.prototype.__proto__ || Object.getPrototypeOf(Shipments.prototype), 'componentDidUpdate', this).call(this);
			if (this.state.mapArray.length != 0) {
				this.deActivateProgressBar();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getShipments();
			if (this.state.mapArray.length != 0) {

				this.deActivateProgressBar();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var tables = null;
			try {
				tables = this.state.mapArray.map(function (row) {

					for (item in row) {
						return React.createElement(Shipment_readyordelivery, { shipmentID: row[item].fValue });
					}
				});
			} catch (e) {}
			return React.createElement('div', null, tables);
		}
	}]);

	return Shipments;
}(_main_component.Extends);

var Shipment_readyordelivery = exports.Shipment_readyordelivery = function (_Extends2) {
	_inherits(Shipment_readyordelivery, _Extends2);

	function Shipment_readyordelivery(props) {
		_classCallCheck(this, Shipment_readyordelivery);

		var _this2 = _possibleConstructorReturn(this, (Shipment_readyordelivery.__proto__ || Object.getPrototypeOf(Shipment_readyordelivery)).call(this, props));

		_this2.state.shipmentID = _this2.props.shipmentID;
		_this2.state.mapArray = [];
		_this2.state.shipmentTypes = { "0": "Самовивіз", "1": "Відправка", "2": "Доставка" };
		_this2.state.comments = { "0": "Видачу товару зі складу не схвалено", "1": "Борг", "2": "Баланс" };
		_this2.state.debtComments = { "0": "" };
		return _this2;
	}

	_createClass(Shipment_readyordelivery, [{
		key: 'getShipmentInfo',
		value: function getShipmentInfo() {
			data = "SHIPMENTID=" + this.state.shipmentID;
			var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/shipmentReadyToDeliver.php", data);

			var shipmentInfo = function shipmentInfo(responseText) {
				handleBR = new _data_convert.handleData(responseText, getMapObject());
				this.setState({ mapArray: handleBR.mapArray });
			};
			shipmentInfo = shipmentInfo.bind(this);
			Prom.then(shipmentInfo);
		}

		////////////////////////////////////////////////


	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getShipmentInfo();
		}
	}, {
		key: 'render',
		value: function render() {
			var tableHead = null;
			var tableBody = null;

			try {
				var totalSum = 0;
				var shipmentType = "";
				var deliveryAllow = "";
				var comments = "";
				var currentDebt = 0;
				var debtComments = "";
				this.state.mapArray.map(function (tr) {
					for (item in tr) {
						if (item == "Sum") {
							totalSum += Number(tr[item].fValue);
						} else if (item == "SHIPMENT_TYPE") {
							shipmentType = tr[item].fValue;
						} else if (item == "DELIVERY_ALLOW") {
							deliveryAllow = tr[item].fValue;
						} else if (item == "CurrentDebt") {
							currentDebt = Number(tr[item].fValue);
						}
					}
				});

				if (shipmentType == null || shipmentType == undefined) {
					shipmentType = 0;
				}
				if (deliveryAllow == null || deliveryAllow == undefined) {
					deliveryAllow = 0;
				}

				if (shipmentType != 0) {
					if (deliveryAllow == 0) comments += this.state.comments[deliveryAllow] + "\n";
					if (Number(currentDebt) > 0) {
						debtComments += this.state.comments["1"] + ": " + currentDebt;
					}
				}

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
					return React.createElement('tr', { key: i }, item);
				});
			} catch (e) {
				return React.createElement('div', { className: 'block' }, ' ');
			}

			var a = React.createElement('div', { className: 'block' }, React.createElement('table', { className: 'table table-vcenter table-condensed table-bordered' }, React.createElement('thead', null, tableHead), React.createElement('tbody', null, tableBody)), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-4' }, "Всього: " + totalSum)), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-4' }, this.state.shipmentTypes[shipmentType])), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12' }, comments)), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-4' }, debtComments)));
			return a;
		}
	}]);

	return Shipment_readyordelivery;
}(_main_component.Extends);

var Shipmentnumber_td = exports.Shipmentnumber_td = function (_Extends3) {
	_inherits(Shipmentnumber_td, _Extends3);

	function Shipmentnumber_td(props) {
		_classCallCheck(this, Shipmentnumber_td);

		var _this3 = _possibleConstructorReturn(this, (Shipmentnumber_td.__proto__ || Object.getPrototypeOf(Shipmentnumber_td)).call(this, props));

		_this3.state = _this3.props;

		return _this3;
	}

	_createClass(Shipmentnumber_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement('a', { href: '#' }, this.state.proto.shipnumber.fValue), React.createElement('br', null), this.state.proto.DATE.fValue, React.createElement('br', null), React.createElement('a', { href: '#' }, this.state.proto.Order.fValue));
		}
	}]);

	return Shipmentnumber_td;
}(_main_component.Extends);

var Brandname_td = exports.Brandname_td = function (_Extends4) {
	_inherits(Brandname_td, _Extends4);

	function Brandname_td(props) {
		_classCallCheck(this, Brandname_td);

		var _this4 = _possibleConstructorReturn(this, (Brandname_td.__proto__ || Object.getPrototypeOf(Brandname_td)).call(this, props));

		_this4.state = _this4.props;

		return _this4;
	}

	_createClass(Brandname_td, [{
		key: 'render',
		value: function render() {

			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.BrandCode.fValue, React.createElement('br', null), this.state.proto.ItemCode.fValue, React.createElement('br', null), this.state.proto.Caption.fValue, React.createElement('br', null));
		}
	}]);

	return Brandname_td;
}(_main_component.Extends);

var Price_td = exports.Price_td = function (_Extends5) {
	_inherits(Price_td, _Extends5);

	function Price_td(props) {
		_classCallCheck(this, Price_td);

		var _this5 = _possibleConstructorReturn(this, (Price_td.__proto__ || Object.getPrototypeOf(Price_td)).call(this, props));

		_this5.state = _this5.props;

		return _this5;
	}

	_createClass(Price_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.Price.fValue, React.createElement('br', null), "x ", React.createElement('strong', null, React.createElement('span', { 'class': 'badge' }, this.state.proto.Quantity.fValue)), React.createElement('br', null), "= ", this.state.proto.Sum.fValue, React.createElement('br', null), this.state.proto.currency.fValue);
		}
	}]);

	return Price_td;
}(_main_component.Extends);

var Common_td = exports.Common_td = function (_Extends6) {
	_inherits(Common_td, _Extends6);

	function Common_td(props) {
		_classCallCheck(this, Common_td);

		var _this6 = _possibleConstructorReturn(this, (Common_td.__proto__ || Object.getPrototypeOf(Common_td)).call(this, props));

		_this6.state = _this6.props;

		return _this6;
	}

	_createClass(Common_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, ' ', this.state.proto[this.state.NAME].fValue);
		}
	}]);

	return Common_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends7) {
	_inherits(Common_th, _Extends7);

	function Common_th(props) {
		_classCallCheck(this, Common_th);

		var _this7 = _possibleConstructorReturn(this, (Common_th.__proto__ || Object.getPrototypeOf(Common_th)).call(this, props));

		_this7.state = _this7.props;

		return _this7;
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
//# sourceMappingURL=12.12.js.map