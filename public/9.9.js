(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shiping_detail.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/babel-loader/lib??ref--6!./app/shiping_detail.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Common_th = exports.Summ_td = exports.Brandname_td = exports.Shiping_detail = undefined;

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

////////////////////////////////////////////////////////
function getMapObjectShipingDetail() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var defineTh = dataConvert.defineTh;
	var parceDate = dataConvert.parceDate;
	var makeAlias = dataConvert.makeAlias;
	var makeTitle = dataConvert.makeTitle;

	var mapObject = {
		ID: { functions: {}, params: [] },
		CODE: { functions: {}, params: [] },
		DATE: { functions: { parceDate: parceDate }, params: [""] },
		CLIENTCODE: { functions: {}, params: [] },
		AGREEMENTCODE: { functions: {}, params: [] },
		DOCUMENTDATE: { functions: {}, params: [] },
		SUMM: { functions: { makeAlias: makeAlias }, params: ["Сума"] },
		CURRENCYCODE: { functions: {}, params: [] },
		DOCUMENTTYPE: { functions: { defineTitle: defineTitle, makeTitle: makeTitle }, params: ["", ""] },
		STATUS: { functions: {}, params: [] },
		DECLARATIONID: { functions: {}, params: [] },
		AGREEMENTNAME: { functions: { makeAlias: makeAlias }, params: ["Договір"] }
	};

	return mapObject;
}
function defineTitle() {
	var titleMap = {
		"0": "Видаткова",
		"1": "Поверненя"
	};
	this.fValue = titleMap[this.fValue] + " від " + this.DATE.fValue;
}
function getMapObjectShipingDetailRows() {
	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var defineTh = dataConvert.defineTh;
	var parceDate = dataConvert.parceDate;

	var mapObject = {
		SHIPPINGID: { functions: {}, params: [] },
		BCODE: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["", React.createElement(Brandname_td, null), [React.createElement(Common_th, null), "Бренд/Номер/Найменування"]] },
		ICODE: { functions: {}, params: [] },
		CAPTION: { functions: {}, params: [] },
		QUANTITY: { functions: {}, params: [] },
		SUMM: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Кіл-ть/Сума", "", React.createElement(Summ_td, null), [React.createElement(Common_th, null), "Кіл-ть/Сума"]] },
		STATUS: { functions: {}, params: [] },
		PRICE: { functions: {}, params: [] }

	};
	return mapObject;
}

////////////////////////////////////////////////////////
function getShipingDetailRows() {
	var data = "";
	if ("id" in this.constructor && this.constructor.id != "") {
		try {
			data += "ID=" + this.constructor.id;
		} catch (e) {}
	}

	var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/shiping_detail.php", data);
	var shipingDetail = function (responseText) {
		//details=new handleData(responseText,this.constructor.mapObject,"SHIPMENT");				
		rows = new _data_convert.handleData(responseText, this.constructor.mapObject, "ROWS");
		this.setState({ mapArray: rows.mapArray, shouldComponentUpdate: true });
	}.bind(this);
	Prom.then(shipingDetail);
}

function getShipingDetail() {
	var data = "";
	if ("id" in this.constructor && this.constructor.id != "") {
		try {
			data += "ID=" + this.constructor.id;
		} catch (e) {}
	}

	var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/shiping_detail.php", data);
	var shipingDetail = function (responseText) {
		details = new _data_convert.handleData(responseText, this.constructor.mapObject, "SHIPMENT");
		//rows=new handleData(responseText,this.constructor.mapObject,"ROWS")
		this.setState({ mapArray: details.mapArray, shouldComponentUpdate: true });
	}.bind(this);
	Prom.then(shipingDetail);
}

//////////////////////////////////////////////////////////////


var Shiping_detail = exports.Shiping_detail = function (_Extends) {
	_inherits(Shiping_detail, _Extends);

	function Shiping_detail(props) {
		_classCallCheck(this, Shiping_detail);

		var _this = _possibleConstructorReturn(this, (Shiping_detail.__proto__ || Object.getPrototypeOf(Shiping_detail)).call(this, props));

		_this.id = _this.props.match.params.id;
		_this.DocsListComponent = getDocsListComponent();
		_this.HeaderComponent = getHeaderComponent();
		return _this;
	}

	_createClass(Shiping_detail, [{
		key: 'render',
		value: function render() {
			this.DocsListComponent.id = this.id;
			this.DocsListComponent.mapObject = getMapObjectShipingDetailRows();
			this.DocsListComponent.getFunc = getShipingDetailRows;

			this.HeaderComponent.id = this.id;
			this.HeaderComponent.mapObject = getMapObjectShipingDetail();
			this.HeaderComponent.getFunc = getShipingDetail;

			return React.createElement('div', { className: 'block' }, React.createElement('div', { className: 'block full' }, React.createElement('div', { className: 'block-title', style: { "backgroundColor": "white" } }, React.createElement(this.HeaderComponent, null), React.createElement(this.DocsListComponent, null))));
		}
	}]);

	return Shiping_detail;
}(_main_component.Extends);

function getHeaderComponent() {
	var Shiping_header = function (_Extends2) {
		_inherits(Shiping_header, _Extends2);

		function Shiping_header(props) {
			_classCallCheck(this, Shiping_header);

			var _this2 = _possibleConstructorReturn(this, (Shiping_header.__proto__ || Object.getPrototypeOf(Shiping_header)).call(this, props));

			_this2.state.mapArray = [];
			_this2.getFunc = _this2.constructor.getFunc;

			return _this2;
		}

		_createClass(Shiping_header, [{
			key: 'callGetFunc',
			value: function callGetFunc() {
				if (this.getFunc == null || this.getFunc == undefined) return;
				this.getFunc.call(this);
			}
			////////////////////////////

		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {

				if (!nextState.shouldComponentUpdate) {
					this.callGetFunc();
				}

				return nextState.shouldComponentUpdate;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_get(Shiping_header.prototype.__proto__ || Object.getPrototypeOf(Shiping_header.prototype), 'componentDidMount', this).call(this);
				this.callGetFunc();
			}
			/*render()
   {
    var agreementName="";
    var documentType="";
    var date="";
    var summ="";
   try
   {
   	agreementName=this.state.mapArray[0].AGREEMENTNAME.fValue;
             documentType=this.state.mapArray[0].DOCUMENTTYPE.fValue	
             date=this.state.mapArray[0].DATE.fValue;
   	summ=this.state.mapArray[0].SUMM.fValue;
   } catch(e)
   {
   	
   }
   	
   return ( <div>
             <div className="row">
   	         <div className='col-xs-12 text-center'>
   		     <h2>{documentType+" "+date }</h2>
   		    </div>
   	     </div>
   		 
   		 <div className="row">
   	        <div className='col-xs-6 text-center'>
   		      <p className="form-control-label"><h5><strong>{"Договір:"}</strong></h5></p>
   		    </div>
   		    <div className='col-xs-6 '>
   		      <p className="form-control-label"><h5>{agreementName}</h5></p>
   		    </div>
   	      </div>
   		 
   		 <div className="row">
   	        <div className='col-xs-6 text-center'>
   		      <p className="form-control-label"><h5><strong>{"Сума:"}</strong></h5></p>
   		    </div>
   		    <div className='col-xs-6 '>
   		      <p className="form-control-label"><h5>{summ}</h5></p>
   		    </div>
   	      </div>
   		  
   		  
   		  
   		  
   	   </div>
   	
   	
   	
   	)
   }
    */

		}, {
			key: 'render',
			value: function render() {

				var aliasArr = [];
				var titleArr = [];
				try {
					for (var i = 0; i < this.state.mapArray.length; i++) {
						for (var item in this.state.mapArray[i]) {

							if ("alias" in this.state.mapArray[i][item]) {
								aliasArr.push(React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 text-center' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, React.createElement('strong', null, this.state.mapArray[i][item].alias + ":")))), React.createElement('div', { className: 'col-xs-6 ' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h5', null, this.state.mapArray[i][item].fValue)))));
							}
							if ("title" in this.state.mapArray[i][item]) {
								titleArr.push(React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-12 text-center' }, React.createElement('h2', null, this.state.mapArray[i][item].title))));
							}
						}
					}
				} catch (e) {}

				return React.createElement('div', null, titleArr.map(function (item) {
					return item;
				}), aliasArr.map(function (item) {
					return item;
				}));
			}
		}]);

		return Shiping_header;
	}(_main_component.Extends);

	return Shiping_header;
}

function getDocsListComponent() {
	var Doc_list = function (_Extends3) {
		_inherits(Doc_list, _Extends3);

		function Doc_list(props) {
			_classCallCheck(this, Doc_list);

			var _this3 = _possibleConstructorReturn(this, (Doc_list.__proto__ || Object.getPrototypeOf(Doc_list)).call(this, props));

			_this3.state.itemCode = "" + _this3.props.itemCode;
			_this3.state.mapArray = [];
			_this3.getFunc = _this3.constructor.getFunc;
			/*this.urlGetParametr=this.constructor.urlGetParametr;
   this.subData=this.constructor.subData
   this.mapObject=this.constructor.mapObject;
   this.documentName=this.constructor.documentName;*/

			return _this3;
		}

		_createClass(Doc_list, [{
			key: 'callGetFunc',
			value: function callGetFunc() {
				if (this.getFunc == null || this.getFunc == undefined) return;
				this.getFunc.call(this);
			}
			//////////////////////////////////////

		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {

				if (!nextState.shouldComponentUpdate) {
					this.callGetFunc();
				}

				return nextState.shouldComponentUpdate;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_get(Doc_list.prototype.__proto__ || Object.getPrototypeOf(Doc_list.prototype), 'componentDidMount', this).call(this);
				this.callGetFunc();
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
						return React.createElement('tr', { key: i }, item);
					});
				} catch (e) {
					return React.createElement('div', null, ' ');
				}

				return React.createElement('div', { className: 'table-responsive' }, React.createElement('table', { className: 'table table-vcenter table-condensed table-bordered table-striped' }, React.createElement('thead', null, tableHead), React.createElement('tbody', null, tableBody)));
			}
		}]);

		return Doc_list;
	}(_main_component.Extends);
	/*History_item.urlGetParametr=urlGetParametr;
 History_item.subData=subData;
 History_item.getShipingDocsList=getShipingDocsList;
 History_item.mapObject=mapObject;
 History_item.documentName=documentName;*/

	return Doc_list;
}

var Brandname_td = exports.Brandname_td = function (_Extends4) {
	_inherits(Brandname_td, _Extends4);

	function Brandname_td(props) {
		_classCallCheck(this, Brandname_td);

		var _this4 = _possibleConstructorReturn(this, (Brandname_td.__proto__ || Object.getPrototypeOf(Brandname_td)).call(this, props));

		_this4.state = _this4.props;

		return _this4;
	}

	_createClass(Brandname_td, [{
		key: 'checkCaption',
		value: function checkCaption(caption) {
			try {
				var length = caption.length;
				if (length > 20) {
					var pattern = "^(.{" + length / 2 + "})(.*)$";
					var regExp = new RegExp(pattern, "g");
					return [caption.replace(regExp, "$1"), caption.replace(regExp, "$2")];
				} else {
					return [caption];
				}
			} catch (e) {}
		}
		//////////////////////////////////////////////////

	}, {
		key: 'render',
		value: function render() {
			var captionArr = this.checkCaption(this.state.proto.CAPTION.fValue);

			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.BCODE.fValue, React.createElement('br', null), this.state.proto.ICODE.fValue, React.createElement('br', null), captionArr.map(function (item) {
				return React.createElement('span', null, React.createElement('span', null, item), React.createElement('br', null));
			}));
		}
	}]);

	return Brandname_td;
}(_main_component.Extends);

var Summ_td = exports.Summ_td = function (_Extends5) {
	_inherits(Summ_td, _Extends5);

	function Summ_td(props) {
		_classCallCheck(this, Summ_td);

		var _this5 = _possibleConstructorReturn(this, (Summ_td.__proto__ || Object.getPrototypeOf(Summ_td)).call(this, props));

		_this5.state = _this5.props;

		return _this5;
	}

	_createClass(Summ_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.PRICE.fValue, React.createElement('br', null), "x ", React.createElement('strong', null, React.createElement('span', { 'class': 'badge' }, this.state.proto.QUANTITY.fValue)), React.createElement('br', null), "= ", this.state.proto.SUMM.fValue);
		}
	}]);

	return Summ_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends6) {
	_inherits(Common_th, _Extends6);

	function Common_th(props) {
		_classCallCheck(this, Common_th);

		var _this6 = _possibleConstructorReturn(this, (Common_th.__proto__ || Object.getPrototypeOf(Common_th)).call(this, props));

		_this6.state = _this6.props;

		return _this6;
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
//# sourceMappingURL=9.9.js.map