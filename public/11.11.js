(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./app/calendar_bar.js":
/*!*****************************!*\
  !*** ./app/calendar_bar.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInputCalendarComponent = exports.Calendar_set = undefined;

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

var Calendar_set = exports.Calendar_set = function (_Extends) {
	_inherits(Calendar_set, _Extends);

	function Calendar_set(props) {
		_classCallCheck(this, Calendar_set);

		var _this = _possibleConstructorReturn(this, (Calendar_set.__proto__ || Object.getPrototypeOf(Calendar_set)).call(this, props));

		_this.state.dateBegin;
		_this.onclick = _this.onclick.bind(_this);
		_this.Input_calendarBegin = getInputCalendarComponent("dateBegin", "", "Початок періоду");
		_this.Input_calendarEnd = getInputCalendarComponent("dateEnd", "", "Кінець періоду");
		return _this;
	}

	_createClass(Calendar_set, [{
		key: 'onclick',
		value: function onclick(e) {
			this.state.dateBegin = e.target.value;
		}

		////////////////////////////////////////<input onChange={this.onchange} onPaste={this.onchange} id="example-daterange1" name="example-daterange1" className="form-control text-center" placeholder="Початок періоду" type="text"/>

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(Calendar_set.prototype.__proto__ || Object.getPrototypeOf(Calendar_set.prototype), 'componentDidUpdate', this).call(this);
			try {
				$("." + thisElement.classList[1]).datepicker({ weekStart: 1,
					showOnFocus: false,
					beforeShow: function beforeShow() {
						$('input').blur();
					}, ignoreReadonly: true
				});
			} catch (e) {}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var thisElement = ReactDOM.findDOMNode(this);
			try {
				$("." + thisElement.classList[1]).datepicker({ weekStart: 1,
					showOnFocus: false,
					beforeShow: function beforeShow() {
						$('input').blur();
					}, ignoreReadonly: true
				});
			} catch (e) {}
		}
	}, {
		key: 'render',
		value: function render() {
			//Input_calendarBegin=getInputCalendarComponent("dateBegin","","Початок періоду");
			//Input_calendarEnd=getInputCalendarComponent("dateEnd","","Кінець періоду");
			return React.createElement('div', { onClick: this.onclick, className: 'input-group input-daterange date', 'data-date-format': 'mm/dd/yyyy' }, React.createElement(this.Input_calendarBegin, null), React.createElement('div', { className: 'input-group-addon' }, React.createElement('span', null, React.createElement('i', { className: 'fa fa-angle-right' }))), React.createElement(this.Input_calendarEnd, null), React.createElement('div', { className: 'input-group-addon' }, React.createElement('span', { className: 'fa fa-angle-right' })));
		}
	}]);

	return Calendar_set;
}(_main_component.Extends);

var getInputCalendarComponent = exports.getInputCalendarComponent = function getInputCalendarComponent(id, name, placeholder) {
	var Input_calendar = function (_Extends2) {
		_inherits(Input_calendar, _Extends2);

		function Input_calendar(props) {
			_classCallCheck(this, Input_calendar);

			var _this2 = _possibleConstructorReturn(this, (Input_calendar.__proto__ || Object.getPrototypeOf(Input_calendar)).call(this, props));

			_this2.onclick = _this2.onclick.bind(_this2);
			_this2.onfocus = _this2.onfocus.bind(_this2);
			_this2.state.placeholder = _this2.constructor.placeholder;
			_this2.state.id = _this2.constructor.id;
			_this2.state.name = _this2.constructor.name;

			return _this2;
		}

		_createClass(Input_calendar, [{
			key: 'onfocus',
			value: function onfocus(e) {
				e.preventDefault();
				var thisElement = ReactDOM.findDOMNode(this);
				this.startBlurEvent.call(thisElement);
			}
		}, {
			key: 'startBlurEvent',
			value: function startBlurEvent() {
				if (document.createEvent) {
					var event = document.createEvent("Event");
					event.initEvent("focusout", true, true);
					this.dispatchEvent(event);
				} else {
					var event = new Event("focusout", { bubbles: true, cancelable: false });
					this.dispatchEvent(event);
				}
			}
		}, {
			key: 'onclick',
			value: function onclick(e) {
				this.state.dateBegin = e.target.value;
			}
		}, {
			key: 'attached',
			value: function attached() {

				var thisElement = ReactDOM.findDOMNode(this);
				valuePropertyDescriptor = Object.getOwnPropertyDescriptor(thisElement, "value");
				function startEvent() {
					if (document.createEvent) {
						var event = document.createEvent("Event");
						event.initEvent("click", true, true);
						this.dispatchEvent(event);
					} else {
						var event = new Event("click", { bubbles: true, cancelable: false });
						this.dispatchEvent(event);
					}
				}
				startEvent = startEvent.bind(thisElement);
				if (valuePropertyDescriptor.set) {
					var combinedFunc = function combinedFunc(value) {
						this.set = valuePropertyDescriptor.set;
						this.set(value);
						startEvent();
					};
					combinedFunc = combinedFunc.bind(thisElement);
					var old_setf = valuePropertyDescriptor.set;
					var newDescriptorObject = { configurable: true, enumerable: true, get: valuePropertyDescriptor.get, set: combinedFunc };
					Object.defineProperty(thisElement, "value", newDescriptorObject);
				}
			}
			//////////////////////////////////////////

		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				_get(Input_calendar.prototype.__proto__ || Object.getPrototypeOf(Input_calendar.prototype), 'componentDidUpdate', this).call(this);
				_app.App.init();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_get(Input_calendar.prototype.__proto__ || Object.getPrototypeOf(Input_calendar.prototype), 'componentDidMount', this).call(this);
				this.attached();
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement('input', { onClick: this.onclick, onFocus: this.onfocus, id: this.state.id, name: this.state.name, className: 'form-control text-center', placeholder: this.state.placeholder, readonly: window.isMobile == true ? "true" : "false" });
			}
		}]);

		return Input_calendar;
	}(_main_component.Extends);

	Input_calendar.placeholder = placeholder;
	Input_calendar.id = id;
	Input_calendar.name = name;
	return Input_calendar;
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/shipingdocs.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/shipingdocs.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common_td = exports.Common_th = exports.Shiping_td = exports.Shiping_docs = undefined;

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

var _calendar_bar = __webpack_require__(/*! ./calendar_bar.js */ "./app/calendar_bar.js");

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

var i = 0;

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
function initDataTable() {
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

var Shiping_docs = exports.Shiping_docs = function (_Extends) {
  _inherits(Shiping_docs, _Extends);

  function Shiping_docs(props) {
    _classCallCheck(this, Shiping_docs);

    var _this = _possibleConstructorReturn(this, (Shiping_docs.__proto__ || Object.getPrototypeOf(Shiping_docs)).call(this, props));

    _this.state.dateBegin;
    _this.onchange = _this.onchange.bind(_this);
    _this.onclick = _this.onclick.bind(_this);
    _this.getList = _this.getList.bind(_this);

    return _this;
  }

  _createClass(Shiping_docs, [{
    key: 'onchange',
    value: function onchange(e) {
      this.state.dateBegin = e.target.value;
    }
  }, {
    key: 'onclick',
    value: function onclick(e) {
      this[e.target.id] = e.target.value;
    }
  }, {
    key: 'getList',
    value: function getList() {
      //window.objectReg['Doc_list'].setState({updated:true});
      this.setState({ update: true });
    }
    ////////////////////////////////////////<input onChange={this.onchange} onPaste={this.onchange} id="example-daterange1" name="example-daterange1" className="form-control text-center" placeholder="Початок періоду" type="text"/>

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Shiping_docs.prototype.__proto__ || Object.getPrototypeOf(Shiping_docs.prototype), 'componentDidMount', this).call(this);
      //this.deActivateProgressBar();
    }
  }, {
    key: 'render',
    value: function render() {
      Input_calendar = (0, _calendar_bar.getInputCalendarComponent)("", "", "Початок періоду");
      ShipingDocsListComp = getDocsListComponent();
      ShipingDocsListComp.dateBegin = this.dateBegin;
      ShipingDocsListComp.dateEnd = this.dateEnd;
      ShipingDocsListComp.getFunc = getShipingDocsList;
      ShipingDocsListComp.mapObject = getMapObjectShipingsDocs();
      ShipingDocsListComp.compDidUpdateFunc = [];
      ShipingDocsListComp.compDidUpdateFunc.push(initDataTable);

      return React.createElement('div', { onClick: this.onclick, className: 'block' }, React.createElement(_calendar_bar.Calendar_set, null), React.createElement('div', { className: 'col-xs-2' }), React.createElement('div', { className: 'col-xs-8 text-center' }, React.createElement('button', { onClick: this.getList, className: 'btn btn-danger', style: { "margin-left": "auto", "margin-top": "1em" } }, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0435\u043A\u043B\u0430\u0440\u0430\u0446\u0456\u0457")), React.createElement(ShipingDocsListComp, null));
    }
  }]);

  return Shiping_docs;
}(_main_component.Extends);

function getShipingDocsList() {
  var data = "";
  if ("dateBegin" in this.constructor && this.constructor.dateBegin != "") {
    try {
      data += "filter_date_from=" + this.constructor.dateBegin.replace(/\//g, ".");
    } catch (e) {}
  }
  if ("dateEnd" in this.constructor && this.constructor.dateEnd != "") {
    try {
      data += "&filter_date_to=" + this.constructor.dateEnd.replace(/\//g, ".");
    } catch (e) {}
  }

  var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/shipingdocs.php", data);
  var shipingDocsList = function (responseText) {
    docsList = new _data_convert.handleData(responseText, this.constructor.mapObject, "SHIPINGDOCS");
    this.setState({ mapArray: docsList.mapArray, shouldComponentUpdate: true }, this.deActivateProgressBar);
  }.bind(this);
  Prom.then(shipingDocsList);
}

function getDocsListComponent() {
  var Doc_list = function (_Extends2) {
    _inherits(Doc_list, _Extends2);

    function Doc_list(props) {
      _classCallCheck(this, Doc_list);

      var _this2 = _possibleConstructorReturn(this, (Doc_list.__proto__ || Object.getPrototypeOf(Doc_list)).call(this, props));

      _this2.state.itemCode = "" + _this2.props.itemCode;
      _this2.state.mapArray = [];
      _this2.getFunc = _this2.constructor.getFunc;
      _this2.compDidUpdateFunc = _this2.constructor.compDidUpdateFunc;
      /*this.urlGetParametr=this.constructor.urlGetParametr;
      this.subData=this.constructor.subData
      this.mapObject=this.constructor.mapObject;
      this.documentName=this.constructor.documentName;*/

      return _this2;
    }

    _createClass(Doc_list, [{
      key: 'callDidUpdateFuncs',
      value: function callDidUpdateFuncs() {
        try {
          for (var i = 0; i < this.compDidUpdateFunc.length; i++) {
            this.compDidUpdateFunc[i].call(this);
          }
        } catch (e) {}
      }
    }, {
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
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        _get(Doc_list.prototype.__proto__ || Object.getPrototypeOf(Doc_list.prototype), 'componentDidUpdate', this).call(this);
        this.callDidUpdateFuncs();
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

        return React.createElement('div', { className: 'table-responsive' }, React.createElement('div', { className: 'col-xs-12 text-center' }, React.createElement('table', { className: 'table table-vcenter table-condensed  table-striped' }, React.createElement('thead', null, React.createElement('th', { className: ' text-center' }, this.documentName)))), React.createElement('table', { className: 'table table-vcenter table-condensed table-bordered table-striped' }, React.createElement('thead', null, tableHead), React.createElement('tbody', null, tableBody)));
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

var Shiping_td = exports.Shiping_td = function (_Extends3) {
  _inherits(Shiping_td, _Extends3);

  function Shiping_td(props) {
    _classCallCheck(this, Shiping_td);

    var _this3 = _possibleConstructorReturn(this, (Shiping_td.__proto__ || Object.getPrototypeOf(Shiping_td)).call(this, props));

    _this3.state = _this3.props;

    return _this3;
  }

  _createClass(Shiping_td, [{
    key: 'render',
    value: function render() {
      var status = "";
      try {
        status = this.state.proto.STATUS.fValue;
      } catch (e) {}
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement(_reactRouterDom.Link, { to: "/shipingdoc_detail/" + this.state.proto.ID.fValue }, this.state.proto[this.state.NAME].fValue), React.createElement('br', null), this.state.proto.DATE.fValue);
    }
  }]);

  return Shiping_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends4) {
  _inherits(Common_th, _Extends4);

  function Common_th(props) {
    _classCallCheck(this, Common_th);

    var _this4 = _possibleConstructorReturn(this, (Common_th.__proto__ || Object.getPrototypeOf(Common_th)).call(this, props));

    _this4.state = _this4.props;

    return _this4;
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

var Common_td = exports.Common_td = function (_Extends5) {
  _inherits(Common_td, _Extends5);

  function Common_td(props) {
    _classCallCheck(this, Common_td);

    var _this5 = _possibleConstructorReturn(this, (Common_td.__proto__ || Object.getPrototypeOf(Common_td)).call(this, props));

    _this5.state = _this5.props;

    return _this5;
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
//# sourceMappingURL=11.11.js.map