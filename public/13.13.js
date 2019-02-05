(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/order_list.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/order_list.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Action_td = exports.Action_td_old = exports.Status_td = exports.Quantity_td = exports.Common_td = exports.Name_td = exports.Orderid_td = exports.Order_list = undefined;

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
		ID: { functions: {}, params: [] }, // BASKET_ID
		ORDER_ID: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Зам-ня", React.createElement(Orderid_td, null)] },
		DATE_INSERT: { functions: { parceDate: parceDate, defineColumnClass: defineColumnClass, defineColumnName: defineColumnName, defineTd: defineTd }, params: ["", "hidden-xs", "Дата", React.createElement(Common_td, null)] },
		BRAND: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Бренд", "hidden-xs", React.createElement(Common_td, null)] },
		REGIONCODE: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Регион", "hidden-xs hidden-sm hidden-md", React.createElement(Common_td, null)] },
		ARTICLE: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Номер", "hidden-xs hidden-sm hidden-md", React.createElement(Common_td, null)] },
		NAME: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Найм-ня", "", React.createElement(Name_td, null)] },
		QUANTITY: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Количество", "hidden-xs", React.createElement(Common_td, null)] },
		PRICE: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: [[".", "2"], "Ціна", "hidden-xs", React.createElement(Common_td, null)] },
		ORDER_PRICE: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Сума", "hidden-xs", React.createElement(Common_td, null)] },
		ITEMSTATUS: { functions: {}, params: [] },
		ITEMSTATUSQUANTITY: { functions: {}, params: [] },
		ITEMSTATUS2: { functions: {}, params: [] },
		ITEMSTATUSQUANTITY2: { functions: {}, params: [] },
		ITEMSTATUSCHANGEQUERY: { functions: {}, params: [] },
		QUANTITYCHANGEQUERY: { functions: {}, params: [] },
		SHIPPING_DOCUMENT: { functions: {}, params: [] },
		ISRETURNABLE: { functions: {}, params: [] },
		DELIVERYMETHODTOUA: { functions: {}, params: [] },
		WAREHOUSEDATE: { functions: {}, params: [] },
		action: { functions: { defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd }, params: ["Дія", " ", React.createElement(Action_td, null)], addNew: true },
		state: { functions: { defineColumnName: defineColumnName, defineTd: defineTd }, params: ["Статус", React.createElement(Status_td, null)], addNew: true }

	};
	return mapObject;
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

var ThemeContext = React.createContext("value");
var regTD = {};
var regTDStatus = {};

var Order_list = exports.Order_list = function (_Extends) {
	_inherits(Order_list, _Extends);

	function Order_list(props) {
		_classCallCheck(this, Order_list);

		var _this = _possibleConstructorReturn(this, (Order_list.__proto__ || Object.getPrototypeOf(Order_list)).call(this, props));

		_this.state.mapArray = [];
		return _this;
	}

	_createClass(Order_list, [{
		key: 'getOrderListData',
		value: function getOrderListData() {
			var findMySelf = this.findMySelf(this.constructor.name);
			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/order_list.php", this.makePostDataFromState());

			Prom.then(function (responseText) {
				try {
					handleDT = new _data_convert.handleData(responseText, getMapObject());
					findMySelf().setState({ mapArray: handleDT.mapArray, shouldComponentUpdate: true });
				} catch (e) {
					//findMySelf().cleanData();
					//var Element=ReactDOM.findDOMNode(findMySelf());
					// ReactDOM.unmountComponentAtNode(Element);
				}
			});
		}
	}, {
		key: 'cleanData',
		value: function cleanData() {
			this.setState({ mapArray: [], shouldComponentUpdate: true });
		}
	}, {
		key: 'initOrderList',
		value: function initOrderList() {
			/* Initialize Bootstrap Datatables Integration */
			_app.App.datatables();
			if ($.fn.dataTable.isDataTable('#example-datatable')) {
				return;
			}
			$('[data-toggle="tooltip"]').tooltip();
			/* Initialize Datatables */
			$('#example-datatable').dataTable({
				"order": [[0, 'desc']],
				"aoColumnDefs": [{ "bSortable": false, "aTargets": [1, 5] }],
				"iDisplayLength": 10,
				"aLengthMenu": [[10, 20, 30, -1], [10, 20, 30, "Всі"]]
			});

			$('.pagination').on('click', function () {
				$('[data-toggle="tooltip"]').tooltip();
			});

			/* Add placeholder attribute to the search input */
			$('.dataTables_filter input').attr('placeholder', 'Пошук');
		}
	}, {
		key: 'initToolTip',
		value: function initToolTip() {
			$('[data-toggle="tooltip"]').tooltip();
		}
		/////////////////////////////////////

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (!nextState.shouldComponentUpdate) {
				var getOrderListData = function getOrderListData() {
					this.getOrderListData();
				};
				getOrderListData = getOrderListData.bind(this);
				getOrderListData();
			}

			return nextState.shouldComponentUpdate;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			_get(Order_list.prototype.__proto__ || Object.getPrototypeOf(Order_list.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
			for (state in regTDStatus) {
				regTDStatus[state].setState({ otherTd: null });
			}
			for (action in regTD) {
				regTD[action].setState({ otherTd: null });
			}
			if (this.state.mapArray.length != 0) {
				this.initOrderList();
				this.deActivateProgressBar();
			}

			setTimeout(this.initToolTip, 5000);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Order_list.prototype.__proto__ || Object.getPrototypeOf(Order_list.prototype), 'componentDidMount', this).call(this);
			/*var getOrderListData=function(){ this.getOrderListData();}
   getOrderListData=getOrderListData.bind(this);		
   getOrderListData();*/
			this.setState({ shouldComponentUpdate: false });

			//TablesDatatables.init();
			//this.setState({twiceUpdated:true,shouldComponentUpdate:true});
			//TablesDatatables.init();

			//
		}
	}, {
		key: 'render',
		value: function render() {
			var names = this.state.mapArray.map(function (tr) {
				var mas = [];
				for (th in tr) {
					if (tr[th].Name) mas.push(React.createElement('th', { className:  true ? tr[th].className : undefined }, tr[th].Name));
				}

				return mas;

				//return <th className="text-center">{item.Name}</th> 
			})[0];
			var tableHead = React.createElement('thead', null, React.createElement('tr', null, names));

			var rows = this.state.mapArray.map(function (tr) {
				var mas = [];
				for (td in tr) {

					mas.push(tr[td].TD);
				}

				return mas;

				//return <th className="text-center">{item.Name}</th> 
			});

			var i = 0;
			var tableBody = rows.map(function (item) {
				i++;
				return React.createElement(ThemeContext.Provider, { value: i }, React.createElement('tr', { key: i }, item), '  ');
			});

			return React.createElement('div', { className: 'block full' }, React.createElement('div', { className: 'block-title', style: { "backgroundColor": "white" } }, React.createElement('div', { className: 'table-responsive ' }, React.createElement('table', { id: 'example-datatable', className: 'table table-vcenter table-condensed table-bordered table-striped' }, tableHead, React.createElement('tbody', null, tableBody)))));
		}
	}]);

	return Order_list;
}(_main_component.Extends);

var Orderid_td = exports.Orderid_td = function (_Extends2) {
	_inherits(Orderid_td, _Extends2);

	function Orderid_td(props) {
		_classCallCheck(this, Orderid_td);

		var _this2 = _possibleConstructorReturn(this, (Orderid_td.__proto__ || Object.getPrototypeOf(Orderid_td)).call(this, props));

		_this2.state = _this2.props;
		_this2.onclick = _this2.onclick.bind(_this2);
		return _this2;
	}

	_createClass(Orderid_td, [{
		key: 'onclick_old',
		value: function onclick_old() {
			this.activateProgressBar();
		}
	}, {
		key: 'onclick',
		value: function onclick(e) {

			var func = function func(moduleWebPath, component) {
				this.activateProgressBar();
				getWorkPage().setState({ componentSwitch: component, componentSwitchPath: moduleWebPath });
			};
			func = func.bind(this);
			this.loadNeedModule(e.currentTarget.pathname, func);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement(_reactRouterDom.Link, { onClick: this.onclick, to: "/order_detail/" + this.state.proto[this.state.NAME].fValue }, this.state.proto[this.state.NAME].fValue), React.createElement('br', null));
		}
	}]);

	return Orderid_td;
}(_main_component.Extends);

var Name_td = exports.Name_td = function (_Extends3) {
	_inherits(Name_td, _Extends3);

	function Name_td(props) {
		_classCallCheck(this, Name_td);

		var _this3 = _possibleConstructorReturn(this, (Name_td.__proto__ || Object.getPrototypeOf(Name_td)).call(this, props));

		_this3.state = _this3.props;

		return _this3;
	}

	_createClass(Name_td, [{
		key: 'render',
		value: function render() {
			var article = "";
			var br = "";
			if (window.isMobile) {
				article = this.state.proto["ARTICLE"].fValue;
				br = React.createElement('br', null);
			}
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, article, br, this.state.proto[this.state.NAME].fValue);
		}
	}]);

	return Name_td;
}(_main_component.Extends);

var Common_td = exports.Common_td = function (_Extends4) {
	_inherits(Common_td, _Extends4);

	function Common_td(props) {
		_classCallCheck(this, Common_td);

		var _this4 = _possibleConstructorReturn(this, (Common_td.__proto__ || Object.getPrototypeOf(Common_td)).call(this, props));

		_this4.state = _this4.props;

		return _this4;
	}

	_createClass(Common_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto[this.state.NAME].fValue);
		}
	}]);

	return Common_td;
}(_main_component.Extends);

var Quantity_td = exports.Quantity_td = function (_Extends5) {
	_inherits(Quantity_td, _Extends5);

	function Quantity_td(props) {
		_classCallCheck(this, Quantity_td);

		var _this5 = _possibleConstructorReturn(this, (Quantity_td.__proto__ || Object.getPrototypeOf(Quantity_td)).call(this, props));

		_this5.state = _this5.props;

		return _this5;
	}

	_createClass(Quantity_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto[this.state.NAME].fValue);
		}
	}]);

	return Quantity_td;
}(_main_component.Extends);

var Status_td = exports.Status_td = function (_Extends6) {
	_inherits(Status_td, _Extends6);

	function Status_td(props) {
		_classCallCheck(this, Status_td);

		var _this6 = _possibleConstructorReturn(this, (Status_td.__proto__ || Object.getPrototypeOf(Status_td)).call(this, props));

		_this6.state = _this6.props;
		_this6.id = 0;
		_this6.state.updateFromOtherTD = false;
		_this6.state.otherTd = null;
		_this6.imagePath = '/app/img/order_list/';
		_this6.style = { "width": "20px", "height": "20px" };

		_this6.bClasses = window.configObject["Status_td"].bClasses;
		_this6.iClasses = { "2": "gi gi-remove_2" };
		_this6.statusNames = { "2": "Отказ" };

		_this6.touchstart = _this6.touchstart.bind(_this6);

		return _this6;
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
		key: 'defineStatus',
		value: function defineStatus() {
			var state = this.state.proto.ITEMSTATUS.fValue;
			var state2 = this.state.proto.ITEMSTATUS.fValue;
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

			return React.createElement('a', { href: '####' }, React.createElement('img', { title: '', src: this.imagePath + "v_rabote.png", style: this.style }));
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
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ITEMSTATUS.fValue) }, state);
			}.bind(this));
		}
	}]);

	return Status_td;
}(_main_component.Extends);

var Action_td_old = exports.Action_td_old = function (_Extends7) {
	_inherits(Action_td_old, _Extends7);

	function Action_td_old(props) {
		_classCallCheck(this, Action_td_old);

		var _this7 = _possibleConstructorReturn(this, (Action_td_old.__proto__ || Object.getPrototypeOf(Action_td_old)).call(this, props));

		_this7.state = _this7.props;
		_this7.state.updateFromOtherTD = false;
		_this7.state.otherTd = null;
		_this7.bClasses = window.configObject["Action_td"].bClasses;
		_this7.style = { "width": "20px", "height": "20px" };
		// this.bClasses={"2":"label label-primary" };
		_this7.iClasses = { "2": "gi gi-remove_2" };
		_this7.statusNames = {
			"0": "В работе",
			"2": "Отказ",
			"5": "В пути"
		};
		_this7.imagePath = '/app/img/order_list/';

		_this7.itemStatusChangeQuery = _this7.itemStatusChangeQuery.bind(_this7);

		return _this7;
	}

	_createClass(Action_td_old, [{
		key: 'itemStatusChangeQueryOld',
		value: function itemStatusChangeQueryOld(e) {
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
		key: 'itemStatusChangeQuery',
		value: function itemStatusChangeQuery(e) {
			this.clearInforMassage();
			getItemStatusChangeQueryComponent = function () {
				_order_action_status.ItemStatusChange_Query.actionComponent = this;
				return _order_action_status.ItemStatusChange_Query;
			}.bind(this);
			var ItemStatusChangeQuery = getItemStatusChangeQueryComponent();

			this.showInforMassage("Інфо", React.createElement(ItemStatusChangeQuery, null));
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
		key: 'defineAction',
		value: function defineAction() {

			var itemStatusChangeQuery = this.state.proto.ITEMSTATUSCHANGEQUERY.fValue;
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
		/////////////////////////////////////////////////////////

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// alert("unmounted"+this.id);
		}
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
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Action_td_old.prototype.__proto__ || Object.getPrototypeOf(Action_td_old.prototype), 'componentDidMount', this).call(this);
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
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ITEMSTATUS.fValue) }, action);
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

		var _this8 = _possibleConstructorReturn(this, (Action_td.__proto__ || Object.getPrototypeOf(Action_td)).call(this, props));

		_this8.state = _this8.props;
		_this8.state.updateFromOtherTD = false;
		_this8.state.otherTd = null;
		_this8.bClasses = window.configObject["Action_td"].bClasses;
		_this8.style = { "width": "20px", "height": "20px" };
		// this.bClasses={"2":"label label-primary" };
		_this8.iClasses = { "2": "gi gi-remove_2" };
		_this8.statusNames = {
			"0": "В работе",
			"2": "Отказ",
			"5": "В пути"
		};
		_this8.imagePath = '/app/img/order_list/';

		_this8.itemStatusChangeQuery = _this8.itemStatusChangeQuery.bind(_this8);

		return _this8;
	}

	_createClass(Action_td, [{
		key: 'itemStatusChangeQueryOld',
		value: function itemStatusChangeQueryOld(e) {
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
		key: 'itemStatusChangeQuery',
		value: function itemStatusChangeQuery(e) {
			this.clearInforMassage();
			getItemStatusChangeQueryComponent = function () {
				_order_action_status.ItemStatusChange_Query.actionComponent = this;
				return _order_action_status.ItemStatusChange_Query;
			}.bind(this);
			var ItemStatusChangeQuery = getItemStatusChangeQueryComponent();

			this.showInforMassage("Інфо", React.createElement(ItemStatusChangeQuery, null));
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
		key: 'defineAction',
		value: function defineAction() {

			var itemStatusChangeQuery = this.state.proto.ITEMSTATUSCHANGEQUERY.fValue;
			if (itemStatusChangeQuery == "") return this.getActionCanQueryStatusChange();
			changeQueryArray = itemStatusChangeQuery.split(/#/);
			if (changeQueryArray.length != 2) return this.getActionCanQueryStatusChange();
			var statusToChange = changeQueryArray[0];
			var answerStatus = changeQueryArray[1];
			if (answerStatus == "?") return this.getActionQueryStatusChangeInWait();else if (answerStatus == "X") return this.getActionQueryStatusChangeDined();else if (statusToChange == answerStatus) return this.getActionQueryStatusChangeApproved();else return this.getNullAction();
		}
		/////////////////////////////////////////////////////////

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// alert("unmounted"+this.id);
		}
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
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Action_td.prototype.__proto__ || Object.getPrototypeOf(Action_td.prototype), 'componentDidMount', this).call(this);
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
				return React.createElement('td', { className: this.getRangeObjectValue(this.bClasses, this.state.proto.ITEMSTATUS.fValue) }, action);
			}.bind(this));

			/*return(
               
              <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                  
        
            )*/
		}
	}]);

	return Action_td;
}(_order_action_status.Order_Action);

/*export class ItemStatusChange_Query extends Extends
{
	 constructor(props)
	 {
		 super(props);
		 this.actionComponent=this.constructor.actionComponent;
		 this.itemStatusChangeQuery=this.itemStatusChangeQuery.bind(this);
		 this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
		 this.unMount=this.unMount.bind(this);
		 
	 }
	 itemStatusChangeQuery(e)
	 {
		 // /ws/ItemStatusChangeQuery.php
		 var basketId=this.actionComponent.state.proto.ID.fValue;
		 var data ="BASKET_ID="+basketId+"&STATUS_CODE=2";
		 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/ItemStatusChangeQuery.php",data);
		 
		 var updateIcon=function(responseText)
		    {
			  try
			  {
				  var answer= Number(responseText);
				  if (!isNaN(answer) && answer>0)
				  {
					 var inWait= this.actionComponent.getActionQueryStatusChangeInWait();
					 this.actionComponent.setState({updateFromOtherTD:true,otherTd:inWait})
					 this.queryText="Запит відправленно.";
					 
				  }else{
					 this.queryText="Запит не відправленно.";
				  }
			  }catch(e)
			  {
				  this.queryText="Запит не відправленно.";
			  }
				this.answerState=true;
			 this.setState({justUpdate:null})
			 
		    }.bind(this)
		    
		 Prom.then(updateIcon)
		  
		  
		 
		 
	 }
	 unMount(e)
	 {
		 var thisElement=ReactDOM.findDOMNode(this);
		 ReactDOM.unmountComponentAtNode(thisElement);
	 }
	 /////////////////////////////////////
	 componentDidMount()
	 {
		 super.componentDidMount();
		  this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
		 
	 }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
		  this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
	 }
	 render()
	 {
		 
		  
		   var buttons=(
		                 <div className="row"> 
		                   
                          <div className="col-xs-6 text-left">
						    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>{"  Ні  "}</font></font></button>
 						  </div>
						  <div className="col-xs-6 text-right">		                   
                            <button type="button" onClick={this.itemStatusChangeQuery}  className="btn btn-sm btn-primary"><font><font>{"  Так  "}</font></font></button>
                          </div>
                    </div>						 
		               )
		    if (this.answerState)
			{
			   buttons=(<div className="col-xs-12 text-right">
			              <button type="button" onClick={this.unMount} className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Вийти</font></font></button>						  
						 </div>
						 )
			}				
		  
		  return (
                       <div className="modal-dialog">                     
                         <div className="modal-content">
                           <div className="modal-header text-center">
                              <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font>Запит на відмову від позиції.</font></font></h2>
                           </div>
                           <div className="modal-body">
                             <fieldset>
                                <legend><font><font>{this.queryText}</font></font></legend>
                             </fieldset>
                              <div className="form-group form-actions">
                                
								 {buttons}
								                          
                               </div>
                             </div>    
                          <div className="modal-footer">
                          </div>
                    
                        
                      </div>
                      </div> 
		 )
	 }
	
}*/

/***/ })

}]);
//# sourceMappingURL=13.13.js.map