(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./app/itemcodes_history.js":
/*!**********************************!*\
  !*** ./app/itemcodes_history.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common_td = exports.Common_th = exports.Summ_td = exports.Price_td = exports.Shiping_td = exports.Orderid_td = exports.History_header = exports.History = undefined;

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

function getHistoryItemComponent(urlGetParametr, subData, mapObject, documentName) {
  var History_item = function (_Extends) {
    _inherits(History_item, _Extends);

    function History_item(props) {
      _classCallCheck(this, History_item);

      var _this = _possibleConstructorReturn(this, (History_item.__proto__ || Object.getPrototypeOf(History_item)).call(this, props));

      _this.state.itemCode = "" + _this.props.itemCode;
      _this.state.mapArray = [];
      _this.getHistoryFunc = _this.constructor.getHistoryFunc;
      _this.urlGetParametr = _this.constructor.urlGetParametr;
      _this.subData = _this.constructor.subData;
      _this.mapObject = _this.constructor.mapObject;
      _this.documentName = _this.constructor.documentName;

      return _this;
    }

    _createClass(History_item, [{
      key: 'getHistory',
      value: function getHistory() {
        if (this.getHistoryFunc == null || this.getHistoryFunc == undefined) return;
        this.getHistoryFunc.call(this, this.urlGetParametr, this.subData, this.mapObject);
      }
    }, {
      key: 'initDataTable',
      value: function initDataTable() {
        var thisElement = ReactDOM.findDOMNode(this);
        var thisElement = thisElement.lastElementChild;
        if (thisElement == null) return;
        _app.App.datatables();
        if ($.fn.dataTable.isDataTable($(thisElement))) {
          return;
        }
        $(thisElement).dataTable({
          "aoColumnDefs": [{ "bSortable": false, "aTargets": [1] }],
          "iDisplayLength": 3,
          "aLengthMenu": [[3, 5, -1], [3, 5, "Всі"]]
        });

        /* Add placeholder attribute to the search input */
        $(thisElement).attr('placeholder', 'Пошук');
      }
      //////////////////////////////////////

    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {

        if (!nextState.shouldComponentUpdate) {
          this.getHistory();
        }

        return nextState.shouldComponentUpdate;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        this.initDataTable();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _get(History_item.prototype.__proto__ || Object.getPrototypeOf(History_item.prototype), 'componentDidMount', this).call(this);
        this.getHistory();
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

        return React.createElement('div', { className: 'table-responsive' }, React.createElement('div', { className: 'col-xs-12 text-center' }, React.createElement('table', { className: 'table table-vcenter table-condensed  table-striped' }, React.createElement('thead', null, React.createElement('th', { className: ' text-center' }, this.documentName)))), React.createElement('br', null), React.createElement('table', { className: 'table table-vcenter table-condensed table-bordered table-striped' }, React.createElement('thead', null, tableHead), React.createElement('tbody', null, tableBody)));
      }
    }]);

    return History_item;
  }(_main_component.Extends);

  History_item.urlGetParametr = urlGetParametr;
  History_item.subData = subData;
  History_item.getHistoryFunc = getHistoryOfItem;
  History_item.mapObject = mapObject;
  History_item.documentName = documentName;
  return History_item;
}

/*
function getHistoryOfShippings()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETSHIPINGS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleShipingHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGS');
				//handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
				//handleReturnsHistory=new handleData(responseText,getMapObjectShipings(),'RETURNS');
				
				this.setState({mapArray:handleShipingHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 */
function getHistoryOfItem(urlGetParametr, subData, mapObject) {
  if (this.state.itemCode == null || this.state.itemCode == undefined || this.state.itemCode == "") return;
  var data = urlGetParametr + "=Y&" + "ItemCode=" + this.state.itemCode;
  var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/fulldocdetail.php", data);
  var historyOfOrder = function (responseText) {
    handleHistory = new _data_convert.handleData(responseText, mapObject, subData);
    //handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
    //handleReturnsHistory=new handleData(responseText,getMapObjectShipings(),'RETURNS');

    this.setState({ mapArray: handleHistory.mapArray, shouldComponentUpdate: true });
  }.bind(this);
  Prom.then(historyOfOrder);
}
function getMapObjectShipingsDocs() {

  dataConvert = new _data_convert.handleData(null, null);
  var formatNumber = dataConvert.formatNumber;
  var addSuffix = dataConvert.addSuffix;
  var defineColumnName = dataConvert.defineColumnName;
  var defineColumnClass = dataConvert.defineColumnClass;
  var defineTd = dataConvert.defineTd;
  var defineTh = dataConvert.defineTh;
  var parceDate = dataConvert.parceDate;

  var mapObject = { ID: { functions: {}, params: [] },
    NUMBER: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Номер Документу", React.createElement(Shiping_td, null), [React.createElement(Common_th, null), "Номер/Документу"]] },
    DELIVER: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Перевізник", React.createElement(Common_td, null), [React.createElement(Common_th, null), "Перевізник"]] },
    //REGION:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Регіон","",<Common_td />,[<Common_th/>,"Регіон"]]},
    DATE: { functions: {}, params: [] },
    PLACES: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Килькість міст", React.createElement(Common_td, null), [React.createElement(Common_th, null), "Килькість/міст"]] }

  };
  return mapObject;
}

function getMapObjectShipings() {

  dataConvert = new _data_convert.handleData(null, null);
  var formatNumber = dataConvert.formatNumber;
  var addSuffix = dataConvert.addSuffix;
  var defineColumnName = dataConvert.defineColumnName;
  var defineColumnClass = dataConvert.defineColumnClass;
  var defineTd = dataConvert.defineTd;
  var defineTh = dataConvert.defineTh;
  var parceDate = dataConvert.parceDate;

  var mapObject = {

    NUMBER: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Номер Документу", React.createElement(Shiping_td, null), [React.createElement(Common_th, null), "Номер/Документу"]] },
    ID: { functions: {}, params: [] },
    STATUS: { functions: {}, params: [] },
    REGION: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Регіон", "", React.createElement(Common_td, null), [React.createElement(Common_th, null), "Регіон"]] },
    DATE: { functions: {}, params: [] },
    SUMM: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Кіл-ть/Сума", "", React.createElement(Summ_td, null), [React.createElement(Common_th, null), "Кіл-ть/Сума"]] },
    CURRENCY: { functions: {}, params: [] },
    QUANTITY: { functions: {}, params: [] }

  };
  return mapObject;
}

function getMapObjectOrders() {

  dataConvert = new _data_convert.handleData(null, null);
  var formatNumber = dataConvert.formatNumber;
  var addSuffix = dataConvert.addSuffix;
  var defineColumnName = dataConvert.defineColumnName;
  var defineColumnClass = dataConvert.defineColumnClass;
  var defineTd = dataConvert.defineTd;
  var defineTh = dataConvert.defineTh;
  var parceDate = dataConvert.parceDate;

  var mapObject = {
    ORDER_ID: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Номер Заказа", React.createElement(Orderid_td, null), [React.createElement(Common_th, null), "Номер/Замовлення"]] },
    STATUS_ID: { functions: {}, params: [] },
    REGION: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Регіон", "", React.createElement(Common_td, null), [React.createElement(Common_th, null), "Регіон"]] },
    DATE_INSERT: { functions: {}, params: [] },
    PRICE: { functions: { formatNumber: formatNumber, defineColumnName: defineColumnName, defineColumnClass: defineColumnClass, defineTd: defineTd, defineTh: defineTh }, params: [[".", "2"], "Ціна/Кіл-ть/Сума", "", React.createElement(Price_td, null), [React.createElement(Common_th, null), "Ціна/Кіл-ть/Сума"]] },
    CURRENCY: { functions: {}, params: [] },
    QUANTITY: { functions: {}, params: [] }

  };
  return mapObject;
}
var ComContext = React.createContext("value");
var c = 0;

var History = exports.History = function (_Extends2) {
  _inherits(History, _Extends2);

  function History(props) {
    _classCallCheck(this, History);

    var _this2 = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, props));

    _this2.state.itemCode = "";
    return _this2;
  }

  _createClass(History, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), 'componentDidUpdate', this).call(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var History_orders = getHistoryItemComponent("GETORDERS", "ORDERS", getMapObjectOrders(), "Замовлення");
      var History_shiping = getHistoryItemComponent("GETSHIPINGS", "SHIPINGS", getMapObjectShipings(), "Відгрузки");
      var History_shipingdocs = getHistoryItemComponent("GETSHIPINGS", "SHIPINGDOCS", getMapObjectShipingsDocs(), "Декларації");
      var History_returns = getHistoryItemComponent("GETSHIPINGS", "RETURNS", getMapObjectShipings(), "Повернення");
      //History_shiping.getHistoryFunc=getHistoryOfShippings;
      return React.createElement('div', { className: 'block' }, React.createElement(ComContext.Provider, { value: this }, React.createElement(History_header, null)), React.createElement('br', null), React.createElement(History_orders, { key: c++, itemCode: this.state.itemCode }), React.createElement('br', null), React.createElement(History_shiping, { key: c++, itemCode: this.state.itemCode }), React.createElement('br', null), React.createElement(History_shipingdocs, { key: c++, itemCode: this.state.itemCode }), React.createElement('br', null), React.createElement(History_returns, { key: c++, itemCode: this.state.itemCode }));
    }
  }]);

  return History;
}(_main_component.Extends);

var History_header = exports.History_header = function (_Extends3) {
  _inherits(History_header, _Extends3);

  function History_header(props) {
    _classCallCheck(this, History_header);

    var _this3 = _possibleConstructorReturn(this, (History_header.__proto__ || Object.getPrototypeOf(History_header)).call(this, props));

    _this3.state.itemCode = "";
    _this3.onchange = _this3.onchange.bind(_this3);
    _this3.onclick = _this3.onclick.bind(_this3);

    return _this3;
  }

  _createClass(History_header, [{
    key: 'onchange',
    value: function onchange(event) {
      this.setState({ itemCode: event.target.value });
    }
  }, {
    key: 'onclick',
    value: function onclick(e) {
      this.activateProgressBar();
      this.state.historyComp.setState({ itemCode: this.state.itemCode }, this.deActivateProgressBar);
    }
    //////////////////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(History_header.prototype.__proto__ || Object.getPrototypeOf(History_header.prototype), 'componentDidMount', this).call(this);
      this.deActivateProgressBar();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(ComContext.Consumer, null, function (historyComp) {
        this.state.historyComp = historyComp;
        return React.createElement('div', { className: 'row' }, React.createElement('div', { className: ' col-xs-12 col-md-4 col-md-offset-4' }, React.createElement('div', { className: 'input-group' }, React.createElement('input', { onChange: this.onchange, value: this.state.itemCode, type: 'text', id: 'example-input1-group2', name: 'example-input1-group2', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D\u0438" }), React.createElement('span', { className: 'input-group-btn' }, React.createElement('button', { onClick: this.onclick, type: 'button', className: 'btn btn-primary' }, React.createElement('i', { className: 'fa fa-search' }), " \u041F\u043E\u0448\u0443\u043A")))));
      }.bind(this));
    }
  }]);

  return History_header;
}(_main_component.Extends);
/*export class History_order extends Extends
{
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
         this.state.mapArray=[];
         
     } 
	 getHistoryOfOrders()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETORDERS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleOrderHistory=new handleData(responseText,getMapObjectOrders(),'ORDERS');
				this.setState({mapArray:handleOrderHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.getHistoryOfOrders();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.getHistoryOfOrders();
     }
     render()
     {
		
		
		 var tableHead=null;
         var  tableBody=null; 
		 try
		 {
			  var names=this.state.mapArray.map(function(tr) {
               
                             var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
                       })[0]
				 tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
					 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                if (tr[td].TD)
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
                    tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <tr key={i}>{item}</tr>)  
                                   }) 
			 
		 }catch(e)
		 {
			 return(<div> </div>)
		 }
		 
		return ( <div className="table-responsive">
		            <table className="table table-vcenter table-condensed table-bordered">
					       <thead>
                               {tableHead}
                            </thead> 
                            <tbody>
                                {tableBody}                     
                             </tbody>					     
					</table>
		 
		
		        </div>
		       ) 
		 
		 
	 }
	
}

export class History_shipings extends Extends
{
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
         this.state.mapArray=[];
         
     } 
	 getHistoryOfShippings()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETSHIPINGS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleShipingHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGS');
				handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
				handleReturnsHistory=new handleData(responseText,getMapObjectOrders(),'RETURNS');
				
				this.setState({mapArray:handleOrderHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.getHistoryOfShippings();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.getHistoryOfShippings();
     }
     render()
     {
		
		
		 var tableHead=null;
         var  tableBody=null; 
		 try
		 {
			  var names=this.state.mapArray.map(function(tr) {
               
                             var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
                       })[0]
				 tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
					 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                if (tr[td].TD)
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
                    tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <tr key={i}>{item}</tr>)  
                                   }) 
			 
		 }catch(e)
		 {
			 return(<div> </div>)
		 }
		 
		return ( <div className="table-responsive">
		            <table className="table table-vcenter table-condensed table-bordered">
					       <thead>
                               {tableHead}
                            </thead> 
                            <tbody>
                                {tableBody}                     
                             </tbody>					     
					</table>
		 
		
		        </div>
		       ) 
		 
		 
	 }
	
}

*/

var Orderid_td = exports.Orderid_td = function (_Extends4) {
  _inherits(Orderid_td, _Extends4);

  function Orderid_td(props) {
    _classCallCheck(this, Orderid_td);

    var _this4 = _possibleConstructorReturn(this, (Orderid_td.__proto__ || Object.getPrototypeOf(Orderid_td)).call(this, props));

    _this4.state = _this4.props;

    return _this4;
  }

  _createClass(Orderid_td, [{
    key: 'render',
    value: function render() {
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement(_reactRouterDom.Link, { to: "/order_detail/" + this.state.proto[this.state.NAME].fValue }, this.state.proto[this.state.NAME].fValue), React.createElement('br', null), this.state.proto.STATUS_ID.fValue);
    }
  }]);

  return Orderid_td;
}(_main_component.Extends);

var Shiping_td = exports.Shiping_td = function (_Extends5) {
  _inherits(Shiping_td, _Extends5);

  function Shiping_td(props) {
    _classCallCheck(this, Shiping_td);

    var _this5 = _possibleConstructorReturn(this, (Shiping_td.__proto__ || Object.getPrototypeOf(Shiping_td)).call(this, props));

    _this5.state = _this5.props;

    return _this5;
  }

  _createClass(Shiping_td, [{
    key: 'render',
    value: function render() {
      var status = "";
      try {
        status = this.state.proto.STATUS.fValue;
      } catch (e) {}
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement(_reactRouterDom.Link, { to: "/shiping_detail/" + this.state.proto.ID.fValue }, this.state.proto[this.state.NAME].fValue), React.createElement('br', null), this.state.proto.DATE.fValue);
    }
  }]);

  return Shiping_td;
}(_main_component.Extends);

var Price_td = exports.Price_td = function (_Extends6) {
  _inherits(Price_td, _Extends6);

  function Price_td(props) {
    _classCallCheck(this, Price_td);

    var _this6 = _possibleConstructorReturn(this, (Price_td.__proto__ || Object.getPrototypeOf(Price_td)).call(this, props));

    _this6.state = _this6.props;

    return _this6;
  }

  _createClass(Price_td, [{
    key: 'render',
    value: function render() {
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, this.state.proto.PRICE.fValue, React.createElement('br', null), "x ", React.createElement('strong', null, React.createElement('span', { 'class': 'badge' }, this.state.proto.QUANTITY.fValue)), React.createElement('br', null), "= ", React.createElement('br', null), this.state.proto.CURRENCY.fValue);
    }
  }]);

  return Price_td;
}(_main_component.Extends);

var Summ_td = exports.Summ_td = function (_Extends7) {
  _inherits(Summ_td, _Extends7);

  function Summ_td(props) {
    _classCallCheck(this, Summ_td);

    var _this7 = _possibleConstructorReturn(this, (Summ_td.__proto__ || Object.getPrototypeOf(Summ_td)).call(this, props));

    _this7.state = _this7.props;

    return _this7;
  }

  _createClass(Summ_td, [{
    key: 'render',
    value: function render() {
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement('br', null), "x ", React.createElement('strong', null, React.createElement('span', { 'class': 'badge' }, this.state.proto.QUANTITY.fValue)), React.createElement('br', null), "= ", this.state.proto.SUMM.fValue, React.createElement('br', null), this.state.proto.CURRENCY.fValue);
    }
  }]);

  return Summ_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends8) {
  _inherits(Common_th, _Extends8);

  function Common_th(props) {
    _classCallCheck(this, Common_th);

    var _this8 = _possibleConstructorReturn(this, (Common_th.__proto__ || Object.getPrototypeOf(Common_th)).call(this, props));

    _this8.state = _this8.props;

    return _this8;
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

var Common_td = exports.Common_td = function (_Extends9) {
  _inherits(Common_td, _Extends9);

  function Common_td(props) {
    _classCallCheck(this, Common_td);

    var _this9 = _possibleConstructorReturn(this, (Common_td.__proto__ || Object.getPrototypeOf(Common_td)).call(this, props));

    _this9.state = _this9.props;

    return _this9;
  }

  _createClass(Common_td, [{
    key: 'render',
    value: function render() {
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, ' ', this.state.proto[this.state.NAME].fValue);
    }
  }]);

  return Common_td;
}(_main_component.Extends);

/***/ })

}]);
//# sourceMappingURL=8.8.js.map