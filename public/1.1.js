(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./app/auth.js":
/*!*********************!*\
  !*** ./app/auth.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register_need = exports.Auth_need = exports.Auth_done = exports.Auth = undefined;

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

var Auth = exports.Auth = function (_Extends) {
  _inherits(Auth, _Extends);

  function Auth(props) {
    _classCallCheck(this, Auth);

    var _this = _possibleConstructorReturn(this, (Auth.__proto__ || Object.getPrototypeOf(Auth)).call(this, props));

    _this.state.renderIn = "";
    _this.state.isAuthed = false;

    return _this;
  }

  _createClass(Auth, [{
    key: 'auth',
    value: function auth(request) {

      var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/auth.php", request);

      /* var authRequest_old=function(responseText){              
                   if (Number(responseText)>0)               {
                       authComp=<Auth_done />; 
                       isAuthed=true;
                   }                                       
                   else 
                   {
      		    var UserLoginCookie=this.getUserLoginCookie();
      			
      			if (UserLoginCookie=="" || UserLoginCookie==undefined)
      		    authComp=<Register_need />;		
                        else
      			authComp=<Auth_need />;
      		
                        isAuthed=false;
                   }
      	   var updateAll=this.updateAll.bind(this);
                   this.setState({renderIn:React.createElement(authComp.type),
                                          isAuthed:isAuthed
                                         },updateAll);
                 
             }.bind(this)*/
      var authRequest = function (responseText) {
        if (Number(responseText) > 0) {
          this.auth_done();
        } else {
          var UserLoginCookie = this.getUserLoginCookie();
          if (UserLoginCookie == "" || UserLoginCookie == undefined) this.auth_registerNeed();else this.auth_authNeed();
        }
        this.updateRegions();
      }.bind(this);
      Prom.then(authRequest);
    }
  }, {
    key: 'auth_authNeed',
    value: function auth_authNeed() {
      var authComp = React.createElement(Auth_need, null);
      isAuthed = false;
      var updateAll = this.updateAll.bind(this);
      this.setState({ renderIn: React.createElement(authComp.type),
        isAuthed: isAuthed
      }, updateAll);
    }
  }, {
    key: 'auth_registerNeed',
    value: function auth_registerNeed() {
      var authComp = React.createElement(Register_need, null);
      isAuthed = false;
      var updateAll = this.updateAll.bind(this);
      this.setState({ renderIn: React.createElement(authComp.type),
        isAuthed: isAuthed
      }, updateAll);
    }
  }, {
    key: 'auth_done',
    value: function auth_done() {
      authComp = React.createElement(Auth_done, null);
      isAuthed = true;
      var updateAll = this.updateAll.bind(this);
      this.setState({ renderIn: React.createElement(authComp.type),
        isAuthed: isAuthed
      }, updateAll);
    }
  }, {
    key: 'autoAuth',
    value: function autoAuth() {
      this.auth("AUTO_AUTH=Y&CHECK_AUTH=Y");
    }
  }, {
    key: 'isAuthed',
    value: function isAuthed() {

      this.auth("CHECK_AUTH=Y");
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      this.auth("LOG_OUT=Y");
    }

    /////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Auth.prototype.__proto__ || Object.getPrototypeOf(Auth.prototype), 'componentDidMount', this).call(this);
      this.autoAuth();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { id: 'modal-user-auth', className: 'modal fade', role: 'dialog' }, this.state.renderIn);
    }
  }]);

  return Auth;
}(_main_component.Extends);

var Auth_done = exports.Auth_done = function (_Extends2) {
  _inherits(Auth_done, _Extends2);

  function Auth_done(props) {
    _classCallCheck(this, Auth_done);

    var _this2 = _possibleConstructorReturn(this, (Auth_done.__proto__ || Object.getPrototypeOf(Auth_done)).call(this, props));

    _this2.logOut = _this2.logOut.bind(_this2);

    return _this2;
  }

  _createClass(Auth_done, [{
    key: 'logOut',
    value: function logOut() {
      Uobject = window.objectReg["Auth"];
      Uobject.auth("LOG_OUT=Y");
    }

    ///////////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.updateAll();
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, " \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F")))), React.createElement('div', { className: 'modal-body' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043E \u0443\u0441\u043F\u0456\u0448\u043D\u043E!")))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u0440\u043E\u0431\u043E\u0442\u0443"))), React.createElement('button', { type: 'button', onClick: this.logOut, className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0438\u0439\u0442\u0438 \u0437 \u0430\u043A\u0430\u0443\u043D\u0442\u0443")))))), React.createElement('div', { className: 'modal-footer' })));
    }
  }]);

  return Auth_done;
}(_main_component.Extends);

var Auth_need = exports.Auth_need = function (_Extends3) {
  _inherits(Auth_need, _Extends3);

  function Auth_need(props) {
    _classCallCheck(this, Auth_need);

    var _this3 = _possibleConstructorReturn(this, (Auth_need.__proto__ || Object.getPrototypeOf(Auth_need)).call(this, props));

    _this3.onInputChange = _this3.onInputChange.bind(_this3);
    _this3.state.USER_LOGIN = "";
    _this3.state.USER_PASSWORD = "";
    _this3.state.regStatus = "Авторизація";

    _this3.auth = _this3.auth.bind(_this3);
    _this3.onInputChange = _this3.onInputChange.bind(_this3);
    return _this3;
  }

  _createClass(Auth_need, [{
    key: 'auth',
    value: function auth() {
      Uobject = window.objectReg["Auth"];
      Uobject.auth("USER_LOGIN=" + this.state.USER_LOGIN + "&USER_PASSWORD=" + this.state.USER_PASSWORD + "&CHECK_AUTH=Y");
    }
  }, {
    key: 'registerNeed',
    value: function registerNeed() {
      Uobject = window.objectReg["Auth"];
      Uobject.auth_registerNeed();
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(e) {
      var input = e.target.name;
      var id = e.target.id;
      var inputValue = e.target.value;
      this.state[input] = inputValue;
      this.state[id] = inputValue;

      if (this.state[input] == "") {
        delete this.state[input];
      }
      var str = '' + id;
      this.setState({ str: inputValue });
    }
    /////////////////////////////////////////

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      //this.updateAll();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.updateAll();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, " \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F")))), React.createElement('div', { className: 'modal-body' }, React.createElement('form', { action: 'index.html', method: 'post', enctype: 'multipart/form-data', className: 'form-horizontal form-bordered', onsubmit: 'return false;' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6' }, React.createElement('p', { align: 'center' }, React.createElement('font', null, this.state.regStatus))), React.createElement('div', { className: 'col-xs-6' }, React.createElement('p', { align: 'center' }, React.createElement('font', null, React.createElement('a', { onClick: this.registerNeed }, "\u0412 \u043C\u0435\u043D\u0435 \u043D\u0435\u043C\u0430\u0454 \u043B\u043E\u0433\u0456\u043D\u0430.")))))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041B\u043E\u0433\u0438\u043D"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'text', onChange: this.onInputChange, id: 'user-settings-login', name: 'USER_LOGIN', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', onChange: this.onInputChange, id: 'user-settings-password', name: 'USER_PASSWORD', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C..." })))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"))), React.createElement('button', { type: 'button', onClick: this.auth, className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F")))))))));
    }
  }]);

  return Auth_need;
}(_main_component.Extends);

var Register_need = exports.Register_need = function (_Extends4) {
  _inherits(Register_need, _Extends4);

  function Register_need(props) {
    _classCallCheck(this, Register_need);

    var _this4 = _possibleConstructorReturn(this, (Register_need.__proto__ || Object.getPrototypeOf(Register_need)).call(this, props));

    _this4.onInputChange = _this4.onInputChange.bind(_this4);
    _this4.state.capture_sid = "";
    _this4.state.regStatus = "Регістрація";
    _this4.getRegister = _this4.getRegister.bind(_this4);
    _this4.authNeed = _this4.authNeed.bind(_this4);
    _this4.regStatusInfo = {
      IncorrectPassword: ["", ""],
      IncorrectLogin: ["", ""],
      Success: [""],
      UserID: [""]
    };
    return _this4;
  }

  _createClass(Register_need, [{
    key: 'checkAuth',
    value: function checkAuth() {
      Uobject = window.objectReg["Auth"];
      Uobject.isAuthed();
    }
  }, {
    key: 'authNeed',
    value: function authNeed() {

      Uobject = window.objectReg["Auth"];
      Uobject.auth_authNeed();
    }
  }, {
    key: 'getRegister',
    value: function getRegister() {
      var Prom = this.makeRequestToRecieveData("POST", "/ws/register.php", false, this.makePostDataFromState());

      var register = function register(responseText) {
        handleAnswer = new _data_convert.handleData(responseText);
        var IncorrectPassword = handleAnswer.mapArray.IncorrectPassword;
        var IncorrectLogin = handleAnswer.mapArray.IncorrectLogin;
        var UserID = handleAnswer.mapArray.UserID;
        if (Number(UserID) > 0) {
          this.checkAuth();
        } else {
          this.getCaptureSid();
        }
      };
      register = register.bind(this);
      Prom.then(register);
    }
  }, {
    key: 'getCaptureSid',
    value: function getCaptureSid() {
      var Prom = this.makeRequestToRecieveData("POST", "/ws/register.php", false, "getCaptchaSid=Y");

      var capture_sid = function capture_sid(sid) {
        this.setState({ capture_sid: sid });
      };
      capture_sid = capture_sid.bind(this);
      Prom.then(capture_sid);
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(e) {
      if (e.target.name == "LOGIN") this.checkInput(e);
      var input = e.target.name;
      var id = e.target.id;
      var inputValue = e.target.value;
      this.state[input] = inputValue;
      this.state[id] = inputValue;
      if (this.state[input] == "") {
        delete this.state[input];
      }
      var str = '' + id;
      this.setState({ str: inputValue });
    }
  }, {
    key: 'checkInput',
    value: function checkInput(e) {
      var phoneNumber = e.target.value;
      if (phoneNumber != "") {
        if (phoneNumber.match(/^.*[\+\-\D]+/)) {
          phoneMod = phoneNumber.replace(/[\+\-\D]/g, '');
          e.target.value = phoneMod;
          return;
        }
        if (!phoneNumber.match(/^(38)([0-9]*)/g) && !phoneNumber.match(/^(3)([0-9]*)/g)) {
          phoneMod = "38" + phoneNumber;

          phoneMod = phoneMod.replace(/[\+\-\D]+/g, '');
          e.target.value = phoneMod;
        }
      }
      if (phoneNumber.match(/^(39)([0-9]*)/g) || phoneNumber.match(/^(37)([0-9]*)/g) || phoneNumber.match(/^(34)([0-9]*)/g) || phoneNumber.match(/^(35)([0-9]*)/g) || phoneNumber.match(/^(36)([0-9]*)/g)) {
        shortFoneNumber = phoneNumber.replace(/^(38|39|36|35|34|37)([0-9]*)/g, '38$2');
        shortFoneNumber = shortFoneNumber.replace(/[\+\-\D]+/g, '');
        e.target.value = shortFoneNumber;
        // alert(shortFoneNumber);  
      }
    }

    ///////////////////////////////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Register_need.prototype.__proto__ || Object.getPrototypeOf(Register_need.prototype), 'componentDidMount', this).call(this);
      this.getCaptureSid();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, " \u0420\u0435\u0433\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044F")))), React.createElement('div', { className: 'modal-body' }, React.createElement('form', { action: 'index.html', method: 'post', enctype: 'multipart/form-data', className: 'form-horizontal form-bordered', onsubmit: 'return false;' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6' }, React.createElement('p', { align: 'center' }, React.createElement('font', null, this.state.regStatus))), React.createElement('div', { className: 'col-xs-6' }, React.createElement('p', { align: 'center' }, React.createElement('font', null, React.createElement('a', { onClick: this.authNeed }, "\u0412 \u043C\u0435\u043D\u0435 \u0432\u0436\u0435 \u0454 \u043B\u043E\u0433\u0456\u043D.")))))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041B\u043E\u0433\u0456\u043D(\u043C\u043E\u0431. \u043D\u043E\u043C\u0435\u0440)"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'text', onChange: this.onInputChange, id: 'login', name: 'LOGIN', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', onChange: this.onInputChange, id: 'password', name: 'PASSWORD', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044E"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', onChange: this.onInputChange, id: 'password_confirm', name: 'PASSWORD_CONFIRM', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-2 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u043B\u043E\u0432\u043E"))), React.createElement('div', { className: 'col-md-4' }, React.createElement('input', { type: 'text', onChange: this.onInputChange, id: 'captcha_word', name: 'CAPTCHA_WORD', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u043B\u043E\u0432\u043E..." })), React.createElement('div', { className: 'col-md-4 control-label' }, React.createElement('img', { src: "/bitrix/tools/captcha.php?captcha_sid=" + this.state.capture_sid })))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"))), React.createElement('button', { type: 'button', onClick: this.getRegister, className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0420\u0435\u0433\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044F")))))))));
    }
  }]);

  return Register_need;
}(_main_component.Extends);

/***/ }),

/***/ "./app/balance.js":
/*!************************!*\
  !*** ./app/balance.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pay_notification = exports.Balance = exports.Widget = exports.Widget_orderworksumm = exports.Widget_orderallsumm = exports.Widget_curentdebt = exports.Widget_caption = exports.Notify_about = undefined;

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

function getMapObject() {

    dataConvert = new _data_convert.handleData(null, null);
    var formatNumber = dataConvert.formatNumber;
    var addSuffix = dataConvert.addSuffix;
    var defineColumnName = dataConvert.defineColumnName;
    var defineColumnClass = dataConvert.defineColumnClass;
    var defineTd = dataConvert.defineTd;
    var defineTh = dataConvert.defineTh;
    var defineComponent = dataConvert.defineComponent;
    var parceDate = dataConvert.parceDate;

    var mapObject = {
        BalanceOnDate: { functions: {}, params: [] },
        Begin: { functions: {}, params: [] },
        CurrencyCode: { functions: {}, params: [] },
        Caption: { functions: { defineComponent: defineComponent }, params: [React.createElement(Widget_caption, null)] },
        CurrentDebt: { functions: { defineComponent: defineComponent }, params: [React.createElement(Widget_curentdebt, null)] },
        OrdersAllSumm: { functions: { defineComponent: defineComponent }, params: [React.createElement(Widget_orderallsumm, null)] },
        OrdersWorkSumm: { functions: { defineComponent: defineComponent }, params: [React.createElement(Widget_orderworksumm, null)] },
        CurrentDelayDebt: { functions: {}, params: []
            // NotifyAboutPayment:{functions:{defineComponent},params:[<Notify_about/>],addNew:true,},
        } };
    return mapObject;
}

var Notify_about = exports.Notify_about = function (_Extends) {
    _inherits(Notify_about, _Extends);

    function Notify_about(props) {
        _classCallCheck(this, Notify_about);

        var _this = _possibleConstructorReturn(this, (Notify_about.__proto__ || Object.getPrototypeOf(Notify_about)).call(this, props));

        _this.state = _this.props;
        return _this;
    }

    _createClass(Notify_about, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background enable-tooltip', 'data-toggle': 'modal', 'data-placement': 'bottom' }, React.createElement('i', { className: 'fa fa-bell' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: '#pay_me', 'data-toggle': 'modal', 'data-placement': 'bottom' }, ' ', React.createElement('strong', null, "\u0421\u043F\u043E\u0432\u0456\u0441\u0442\u0438\u0442\u0438 \u043F\u0440\u043E \u043E\u043F\u043B\u0430\u0442\u0443")))));
        }
    }]);

    return Notify_about;
}(_main_component.Extends);

var Widget_caption = exports.Widget_caption = function (_Extends2) {
    _inherits(Widget_caption, _Extends2);

    function Widget_caption(props) {
        _classCallCheck(this, Widget_caption);

        var _this2 = _possibleConstructorReturn(this, (Widget_caption.__proto__ || Object.getPrototypeOf(Widget_caption)).call(this, props));

        _this2.state = _this2.props;

        return _this2;
    }

    _createClass(Widget_caption, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'fa fa-money' })), React.createElement('h4', { className: 'widget-content text-center animation-hatch' }, React.createElement('small', null, React.createElement('em', null)), React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, this.state.proto[this.state.NAME].fValue), ' '), React.createElement('br', null), React.createElement('a', { href: 'javascript:void(0)' }, '  ', this.state.proto.CurrencyCode.fValue))));
        }
    }]);

    return Widget_caption;
}(_main_component.Extends);

var Widget_curentdebt = exports.Widget_curentdebt = function (_Extends3) {
    _inherits(Widget_curentdebt, _Extends3);

    function Widget_curentdebt(props) {
        _classCallCheck(this, Widget_curentdebt);

        var _this3 = _possibleConstructorReturn(this, (Widget_curentdebt.__proto__ || Object.getPrototypeOf(Widget_curentdebt)).call(this, props));

        _this3.state = _this3.props;

        return _this3;
    }

    _createClass(Widget_curentdebt, [{
        key: 'defineBalanceName',
        value: function defineBalanceName() {

            var curentDebt = Number(this.state.proto[this.state.NAME].fValue);
            if (curentDebt <= 0) return "Ваш поточний баланс";else return "Ваш борг";
        }
    }, {
        key: 'render',
        value: function render() {
            //this.state.proto[this.state.NAME]
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'fa fa-money' })), React.createElement('h4', { className: 'widget-content text-center animation-hatch' }, React.createElement('small', null, React.createElement('em', null, this.defineBalanceName())), React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, this.state.proto[this.state.NAME].fValue), ' ', this.state.proto.CurrencyCode.fValue))));
        }
    }]);

    return Widget_curentdebt;
}(_main_component.Extends);

var Widget_orderallsumm = exports.Widget_orderallsumm = function (_Extends4) {
    _inherits(Widget_orderallsumm, _Extends4);

    function Widget_orderallsumm(props) {
        _classCallCheck(this, Widget_orderallsumm);

        var _this4 = _possibleConstructorReturn(this, (Widget_orderallsumm.__proto__ || Object.getPrototypeOf(Widget_orderallsumm)).call(this, props));

        _this4.state = _this4.props;

        return _this4;
    }

    _createClass(Widget_orderallsumm, [{
        key: 'render',
        value: function render() {
            //this.state.proto[this.state.NAME]
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'fa  fa-pencil' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, this.state.proto[this.state.NAME].fValue), ' ', this.state.proto.CurrencyCode.fValue), React.createElement('small', null, React.createElement('em', null, "\u0417\u0430\u043A\u0430\u0437\u0456\u0432 \u043D\u0430 \u0441\u0443\u043C\u0443")))));
        }
    }]);

    return Widget_orderallsumm;
}(_main_component.Extends);

var Widget_orderworksumm = exports.Widget_orderworksumm = function (_Extends5) {
    _inherits(Widget_orderworksumm, _Extends5);

    function Widget_orderworksumm(props) {
        _classCallCheck(this, Widget_orderworksumm);

        var _this5 = _possibleConstructorReturn(this, (Widget_orderworksumm.__proto__ || Object.getPrototypeOf(Widget_orderworksumm)).call(this, props));

        _this5.state = _this5.props;

        return _this5;
    }

    _createClass(Widget_orderworksumm, [{
        key: 'render',
        value: function render() {
            //this.state.proto[this.state.NAME]
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: ' fa fa-exclamation' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, this.state.proto[this.state.NAME].fValue), ' ', this.state.proto.CurrencyCode.fValue), React.createElement('small', null, React.createElement('em', null, "\u0417\u0430\u043A\u0430\u0437\u0456\u0432 \u0432 \u0440\u043E\u0431\u043E\u0442\u0456")))));
        }
    }]);

    return Widget_orderworksumm;
}(_main_component.Extends);

var Widget = exports.Widget = function (_Extends6) {
    _inherits(Widget, _Extends6);

    function Widget(props) {
        _classCallCheck(this, Widget);

        var _this6 = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, props));

        _this6.state = _this6.props;

        return _this6;
    }

    _createClass(Widget, [{
        key: 'render',
        value: function render() {
            //this.state.proto[this.state.NAME]
            return React.createElement('div', { className: 'widget' }, React.createElement('div', { className: 'widget-simple' }, React.createElement('a', { href: 'javascript:void(0)', className: 'widget-icon pull-left animation-fadeIn themed-background' }, React.createElement('i', { className: 'fa fa-money' })), React.createElement('h4', { className: 'widget-content text-right animation-hatch' }, React.createElement('a', { href: 'javascript:void(0)' }, ' ', React.createElement('strong', null, '-786.36'), ' $'), React.createElement('small', null, React.createElement('em', null, "\u0412\u0430\u0448 \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441")))));
        }
    }]);

    return Widget;
}(_main_component.Extends);

var Balance = exports.Balance = function (_Extends7) {
    _inherits(Balance, _Extends7);

    function Balance(props) {
        _classCallCheck(this, Balance);

        var _this7 = _possibleConstructorReturn(this, (Balance.__proto__ || Object.getPrototypeOf(Balance)).call(this, props));

        _this7.state.mapArray = [];

        return _this7;
    }

    _createClass(Balance, [{
        key: 'getBalanceInfo',
        value: function getBalanceInfo() {
            var getInfo = function getInfo(responseText) {
                handleBL = new _data_convert.handleData(responseText, getMapObject());
                this.setState({ mapArray: handleBL.mapArray, shouldComponentUpdate: true });
            };

            getInfo = getInfo.bind(this);
            var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/balance.php", "");
            Prom.then(getInfo);
        }

        //////////////////////////////////////////////////////

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            if (!nextState.shouldComponentUpdate) {
                this.getBalanceInfo();
            }

            return nextState.shouldComponentUpdate;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // here the main_component function (componentDidUpdate) is overrided
            // so this.state.shouldComponentUpdate is stay unchanged;
            this.deActivateProgressBar();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getBalanceInfo();
        }
    }, {
        key: 'render',
        value: function render() {
            var widgets = null;
            try {
                widgets = this.state.mapArray.map(function (agrInfo) {

                    var mas = [];
                    for (item in agrInfo) {
                        if ("CM" in agrInfo[item])
                            // mas.push(agrInfo[item].CM)
                            mas.push(React.createElement('div', { className: 'col-xs-12 col-md-3' }, agrInfo[item].CM));
                    }
                    return mas;
                });
            } catch (e) {}
            widgetsLine = widgets.map(function (line) {

                return React.createElement('div', { className: 'row' }, line);
            });

            return React.createElement('div', null, widgetsLine, React.createElement('div', { className: 'col-xs-12 col-md-3' }, React.createElement(Notify_about, null), ' '));
        }
    }]);

    return Balance;
}(_main_component.Extends);

var Pay_notification = exports.Pay_notification = function (_Extends8) {
    _inherits(Pay_notification, _Extends8);

    function Pay_notification(props) {
        _classCallCheck(this, Pay_notification);

        return _possibleConstructorReturn(this, (Pay_notification.__proto__ || Object.getPrototypeOf(Pay_notification)).call(this, props));
    }

    _createClass(Pay_notification, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { id: 'pay_me', className: 'modal fade', tabindex: '-1', role: 'dialog', 'aria-hidden': 'true' }, React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-money' }), React.createElement('font', null, React.createElement('font', null, " \u0421\u043F\u043E\u0432\u0456\u0441\u0442\u0438\u0442\u0438 \u043F\u0440\u043E \u043E\u043F\u043B\u0430\u0442\u0443")))), React.createElement('div', { className: 'modal-body' }, React.createElement('form', { action: 'index.html', method: 'post', enctype: 'multipart/form-data', 'class': 'form-horizontal form-bordered', onsubmit: 'return false;' }, React.createElement('fieldset', null, React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label' }, React.createElement('font', null, React.createElement('font', null, "\u0414\u0430\u0442\u0430 \u043E\u043F\u043B\u0430\u0442\u0438"))), React.createElement('div', { 'class': 'col-md-4' }, React.createElement('input', { id: 'example-datepicker2', name: 'example-datepicker2', className: 'form-control input-datepicker', 'data-date-format': 'dd/mm/yy', placeholder: "\u0434\u0434/\u043C\u043C/\u0440\u0440", type: 'text' }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-email' }, React.createElement('font', null, React.createElement('font', null, "\u0421\u0443\u043C\u0430 \u043E\u043F\u043B\u0430\u0442\u0438 (\u0433\u0440\u043D.)"))), React.createElement('div', { className: 'col-md-6' }, React.createElement('input', { type: 'email', id: 'user-settings-email', name: 'user-settings-email', className: 'form-control' }))), React.createElement('div', { 'class': 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'example-select' }, "\u041A\u0430\u0440\u0442\u043A\u0430"), React.createElement('div', { className: 'col-md-6' }, React.createElement('select', { id: 'example-select', name: 'example-select', className: 'form-control', size: '1' }, React.createElement('option', { value: '0' }, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0440\u0442\u0443"), React.createElement('option', { value: '1' }, "5168 7456 0201 4604  \u0410\u0442\u0430\u043C\u0430\u043D\u0435\u043D\u043A\u043E \u041E\u043A\u0441\u0430\u043D\u0430 \u0410\u0440\u043A\u0430\u0434\u0456\u0457\u0432\u043D\u0430")))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label' }, "\u0412\u0438\u0434 \u043E\u043F\u043B\u0430\u0442\u0438"), React.createElement('div', { className: 'col-md-8' }, React.createElement('label', { className: 'radio-inline', 'for': 'example-inline-radio1' }, React.createElement('input', { id: 'example-inline-radio1', name: 'example-inline-radios', value: 'option1', type: 'radio' }), " \u041D\u0430 \u043A\u0430\u0440\u0442\u043A\u0443"), React.createElement('label', { className: 'radio-inline', 'for': 'example-inline-radio2' }, React.createElement('input', { id: 'example-inline-radio2', name: 'example-inline-radios', value: 'option2', type: 'radio' }), " \u041D\u0430 \u0440\u0430\u0445\u0443\u043D\u043E\u043A")))), React.createElement('fieldset', null, React.createElement('div', { 'class': 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'val_bio' }, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 ", React.createElement('span', { className: 'text-danger' }, '*')), React.createElement('div', { className: 'col-md-8' }, React.createElement('textarea', { id: 'val_bio', name: 'val_bio', rows: '6', className: 'form-control', placeholder: "\u0422\u0443\u0442 \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u0432\u0435\u0441\u0442\u0438 \u0441\u0432\u0456\u0439 \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440", style: { "width": "316px", "height": "90px" } })))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { 'class': 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"))), React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0421\u0435\u0440\u0432\u0456\u0441 \u043F\u043E\u043A\u0438 \u043D\u0435 \u043F\u0440\u0430\u0446\u044E\u0454"))))))))));
        }
    }]);

    return Pay_notification;
}(_main_component.Extends);

/***/ }),

/***/ "./app/brands_info.js":
/*!****************************!*\
  !*** ./app/brands_info.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Brands = undefined;

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

var _sidebar = __webpack_require__(/*! ./sidebar.js */ "./app/sidebar.js");

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

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

var Brands = exports.Brands = function (_Extends) {
	_inherits(Brands, _Extends);

	function Brands(props) {
		_classCallCheck(this, Brands);

		var _this = _possibleConstructorReturn(this, (Brands.__proto__ || Object.getPrototypeOf(Brands)).call(this, props));

		_this.brandsId = {};
		_this.brandsShortName = {};
		_this.brandsFullName = {};

		return _this;
	}

	_createClass(Brands, [{
		key: 'getBrandsInfo',
		value: function getBrandsInfo() {
			var Prom = this.makeRequestToRecieveData("POST", "/ws/getBrands.php", false, "");
			var brandInfo = function brandInfo(responseText) {
				var handleId = new _data_convert.handleData(responseText, undefined, "id");
				this.brandsId = handleId.mapArray;
				var handleShortName = new _data_convert.handleData(responseText, undefined, "ShortName");
				this.brandsShortName = handleShortName.mapArray;
				var handleFullName = new _data_convert.handleData(responseText, undefined, "FullName");
				this.brandsFullName = handleFullName.mapArray;
				//this.updateItemInfoComponent();
			};
			brandInfo = brandInfo.bind(this);
			Prom.then(brandInfo);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Brands.prototype.__proto__ || Object.getPrototypeOf(Brands.prototype), 'componentDidMount', this).call(this);
			this.getBrandsInfo();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', null);
		}
	}]);

	return Brands;
}(_main_component.Extends);

/***/ }),

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

/***/ "./app/carousel.js":
/*!*************************!*\
  !*** ./app/carousel.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Carousel = exports.Carousel_item = undefined;

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

//import jQuery from './js/vendor/jquery-1.11.1.min.js';
//var $=jQuery;

//require ('bootstrap/dist/js/bootstrap.js');
//require ('bootstrap/dist/css/bootstrap.min.css');
//import Popper from 'popper.js';
var Carousel_item = exports.Carousel_item = function (_Extends) {
    _inherits(Carousel_item, _Extends);

    function Carousel_item(props) {
        _classCallCheck(this, Carousel_item);

        return _possibleConstructorReturn(this, (Carousel_item.__proto__ || Object.getPrototypeOf(Carousel_item)).call(this, props));
    }

    _createClass(Carousel_item, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: "item " + this.props.active }, React.createElement('a', { href: "/search/" + this.props.searchCode }, React.createElement('img', { src: this.props.src, alt: 'image' })), React.createElement('div', { className: 'carousel-caption' }, this.props.caption));
        }
    }]);

    return Carousel_item;
}(_main_component.Extends);

var Carousel = exports.Carousel = function (_Extends2) {
    _inherits(Carousel, _Extends2);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this2 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this2.state.route = props.route;
        _this2.state.fileNamesArray = [];
        _this2.state.isActiveSet = false;

        return _this2;
    }

    _createClass(Carousel, [{
        key: 'getImagesRoutes',
        value: function getImagesRoutes() {
            if (this.state.route == undefined || this.state.route == null) return;
            data = "dir=" + this.state.route;
            var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/carousel_images.php", data);
            var dataConvert = function dataConvert(responseText) {
                handleBR = new _data_convert.handleData(responseText);
                this.setState({ fileNamesArray: handleBR.mapArray, shouldComponentUpdate: true });
            };
            var dataConvert = dataConvert.bind(this);

            Prom.then(dataConvert);
        }

        //////////////////////////////////////////////////////////////////////////////////////

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (!nextState.shouldComponentUpdate) {
                this.getImagesRoutes();
            }

            return nextState.shouldComponentUpdate;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // here the main_component function (componentDidUpdate) is overrided
            // so this.state.shouldComponentUpdate is stay unchanged;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getImagesRoutes();
        }
    }, {
        key: 'render',
        value: function render() {
            var carouselItems = [];
            var carouselIndicators = [];
            var carouselItemsFunc = function carouselItemsFunc(item) {
                activeSetClass = "";
                if (!this.state.isActiveSet) {
                    activeSetClass = "active";
                    this.state.isActiveSet = true;
                }
                searchCode = item.replace(/^(.*?)(\.{1})(png|jpg|jpeg)$/, "$1");
                return React.createElement(Carousel_item, { src: this.state.route + "/" + item, searchCode: searchCode, caption: "", active: activeSetClass }, null);
            };
            var carouselItemsFunc = carouselItemsFunc.bind(this);
            try {
                carouselItems = this.state.fileNamesArray.map(function (item) {

                    return carouselItemsFunc(item);
                });
                this.state.isActiveSet = false;
            } catch (e) {

                console.log(e);
            }
            var carouselIndicatorsActiveClass = "active";
            try {
                for (var i = 0; i < carouselItems.length; i++) {
                    carouselIndicators.push(React.createElement('li', { 'data-target': "#" + this.props.id, 'data-slide-to': i, className: carouselIndicatorsActiveClass }));
                    carouselIndicatorsActiveClass = "";
                }
            } catch (e) {
                console.log(e);
            }

            return React.createElement('div', { id: this.props.id, className: 'carousel slide', 'data-ride': 'carousel' }, React.createElement('ol', { className: 'carousel-indicators' }, carouselIndicators), React.createElement('div', { className: 'carousel-inner' }, carouselItems), React.createElement('a', { className: 'left carousel-control', href: "#" + this.props.id, 'data-slide': 'prev' }, React.createElement('span', null, React.createElement('i', { className: 'fa fa-chevron-left' }))), React.createElement('a', { className: 'right carousel-control', href: "#" + this.props.id, 'data-slide': 'next' }, React.createElement('span', null, React.createElement('i', { className: 'fa fa-chevron-right' }))));
        }
    }]);

    return Carousel;
}(_main_component.Extends);

/***/ }),

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

/***/ "./app/check.js":
/*!**********************!*\
  !*** ./app/check.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Check = undefined;

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

var Check = exports.Check = function (_Extends) {
	_inherits(Check, _Extends);

	function Check(props) {
		_classCallCheck(this, Check);

		var _this = _possibleConstructorReturn(this, (Check.__proto__ || Object.getPrototypeOf(Check)).call(this, props));

		_this.state.update = false;
		return _this;
	}
	////////////////////////////////////////


	_createClass(Check, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.deActivateProgressBar();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.deActivateProgressBar();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', null);
		}
	}]);

	return Check;
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

/***/ "./app/info_message.js":
/*!*****************************!*\
  !*** ./app/info_message.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Info_message = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

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

var Info_message = exports.Info_message = function (_Extends) {
  _inherits(Info_message, _Extends);

  function Info_message(props) {
    _classCallCheck(this, Info_message);

    var _this = _possibleConstructorReturn(this, (Info_message.__proto__ || Object.getPrototypeOf(Info_message)).call(this, props));

    _this.state.header = "";
    _this.state.body = "";
    _this.state.footer = "";
    _this.state.isOn = false;
    _this.offMassage = _this.offMassage.bind(_this);
    return _this;
  }

  _createClass(Info_message, [{
    key: 'offMassage',
    value: function offMassage(e) {
      if (this.state.isOn) this.setState({ isOn: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { onClick: this.offMassage, id: 'info_message', className: 'modal fade', role: 'dialog' }, React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header' }, this.state.header), React.createElement('div', { className: 'modal-body' }, this.state.body), React.createElement('div', { className: 'modal-footer' }, this.state.footer))));
    }
  }]);

  return Info_message;
}(_main_component.Extends);

/***/ }),

/***/ "./app/item_info.js":
/*!**************************!*\
  !*** ./app/item_info.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddToBasketReturnMassage = exports.ItemDuplicateMassage = exports.Common_th = exports.CrossItem_td = exports.CrossBrand_td = exports.Item_info_crosses = exports.Select_quantity = exports.Action_td = exports.Price_order = exports.Item_info_header = exports.Item_info = undefined;

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

var meta = document.createElement("meta");
meta.setAttribute("name", "description");
meta.setAttribute("content", "w");
document.head.appendChild(meta);
function getMapObject() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var defineTh = dataConvert.defineTh;
	var parceDate = dataConvert.parceDate;
	var convertCurrencyToUah = dataConvert.convertCurrencyToUah;

	function gProperty(name) {

		function b() {
			return this[name].fValue;
		}

		return b;
	}

	var mapObject = {
		// Action:{functions:{defineColumnName,defineTd,defineTh},params:["Действие",<Action_td/>,[<Common_th/>," "]],addNew:true},
		//Info:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Info_td />,[<Common_th/>,"Инфо"]],addNew:true},
		Pic64Base: { functions: {}, params: [] },
		BrandCode: { functions: {}, params: [] },
		// BrandName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Brandname_td />,[<Common_th/>," "]]}, 
		ItemCode: { functions: {}, params: [] },
		Caption: { functions: {}, params: [] },
		DeliveryDays: { functions: { formatNumber: formatNumber }, params: [[".", "0"]] },
		Quantity: { functions: {}, params: [] },
		//RegionFullName:{functions:{},params:[]}, 
		//RegionShortName:{functions:{},params:[]},
		RegionCode: { functions: {}, params: [] },
		// RegionCorrectName:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:[" ","",<Region_td/>,[<Common_th/>,"Термін"]],addNew:true},  
		PercentSupp: { functions: {}, params: [] },
		Weight: { functions: {}, params: [] },
		Currency: { functions: {}, params: [] },
		ReturnableParts: { functions: {}, params: [] },
		Price: { functions: { formatNumber: formatNumber }, params: [[".", "2"]] },
		PriceUAH: { functions: { convertCurrencyToUah: convertCurrencyToUah, formatNumber: formatNumber }, params: [[gProperty("Price"), gProperty("Currency")], [".", "2"]], addNew: true }

	};

	return mapObject;
}

function getMapObjectCrosses() {

	dataConvert = new _data_convert.handleData(null, null);
	var formatNumber = dataConvert.formatNumber;
	var addSuffix = dataConvert.addSuffix;
	var defineColumnName = dataConvert.defineColumnName;
	var defineColumnClass = dataConvert.defineColumnClass;
	var defineTd = dataConvert.defineTd;
	var defineTh = dataConvert.defineTh;
	var parceDate = dataConvert.parceDate;
	var convertCurrencyToUah = dataConvert.convertCurrencyToUah;

	function gProperty(name) {

		function b() {
			return this[name].fValue;
		}

		return b;
	}

	var mapObject = {
		id: { functions: {}, params: [] },
		B1Code: { functions: {}, params: [] },
		I1Code: { functions: {}, params: [] },
		B2Code: { functions: {}, params: [] },
		BRANDNAME: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Бренд", React.createElement(CrossBrand_td, null), [React.createElement(Common_th, null), "Бренд "]] },
		I2Code: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["Артикул", React.createElement(CrossItem_td, null), [React.createElement(Common_th, null), "Артикул"]] }

	};
	return mapObject;
}

var Item_info = exports.Item_info = function (_Extends) {
	_inherits(Item_info, _Extends);

	function Item_info(props) {
		_classCallCheck(this, Item_info);

		var _this = _possibleConstructorReturn(this, (Item_info.__proto__ || Object.getPrototypeOf(Item_info)).call(this, props));

		try {
			if ("itemanalogcode" in _this.props.match.params) {
				if (_this.props.match.params.itemanalogcode != undefined) {
					if (_this.props.match.params.itemanalogcode != _this.props.match.params.itemcode) {
						_this.itemAnalogCode = _this.props.match.params.itemanalogcode;
						_this.itemCode = _this.props.match.params.itemcode;
					} else {
						_this.itemAnalogCode = undefined;
						_this.itemCode = _this.props.match.params.itemcode;
					}
				} else {
					_this.itemAnalogCode = undefined;
					_this.itemCode = _this.props.match.params.itemcode;
				}
			} else {
				_this.itemCode = _this.props.match.params.itemcode;
			}
		} catch (e) {
			_this.itemCode = "";
		}
		try {
			//this.brandCode=this.getBrandIdByFullName(this.props.match.params.brandcode);
			_this.brandName = _this.props.match.params.brandname;
			_this.brandCode = _this.getBrandIdByFullName(_this.props.match.params.brandcode);
		} catch (e) {
			_this.brandCode = "";
		}

		return _this;
	}

	_createClass(Item_info, [{
		key: 'updateWithNoItemAnalogCode',
		value: function updateWithNoItemAnalogCode() {
			this.itemAnalogCode = undefined;
			this.setState({ justUpdate: null });
		}
		/////////////////////////////

	}, {
		key: 'render',
		value: function render() {
			var HeaderComponent = getItemInfoHeaderComponent(this.itemCode, this.itemAnalogCode, this.brandName, getItemInfoHeader);
			var PriceOrderComponent = getPriceOrderComponent(this.itemCode, this.brandName);
			var ItemInfoCrosses = getItemInfoCrossesComponent(this.itemCode, this.itemAnalogCode, this.brandName, this);
			return React.createElement('div', { 'class': 'block' }, React.createElement('div', { 'class': 'block full' }, React.createElement(HeaderComponent, null), React.createElement('br', null), React.createElement(PriceOrderComponent, null)), React.createElement(ItemInfoCrosses, null));
		}
	}]);

	return Item_info;
}(_main_component.Extends);

function getItemInfoHeaderComponent(itemCode, itemAnalogCode, brandName, itemInfoHeaderFunc) {
	Item_info_header.itemCode = itemCode;
	Item_info_header.brandName = brandName;
	Item_info_header.itemInfoHeaderFunc = itemInfoHeaderFunc;
	Item_info_header.itemAnalogCode = itemAnalogCode;
	return Item_info_header;
}

var Item_info_header = exports.Item_info_header = function (_Extends2) {
	_inherits(Item_info_header, _Extends2);

	function Item_info_header(props) {
		_classCallCheck(this, Item_info_header);

		var _this2 = _possibleConstructorReturn(this, (Item_info_header.__proto__ || Object.getPrototypeOf(Item_info_header)).call(this, props));

		_this2.itemInfoHeaderFunc = _this2.constructor.itemInfoHeaderFunc;
		_this2.itemCode = _this2.constructor.itemCode;
		_this2.itemAnalogCode = _this2.constructor.itemAnalogCode;
		_this2.brandName = _this2.constructor.brandName;
		return _this2;
	}
	/////////////////////////////


	_createClass(Item_info_header, [{
		key: 'getItemInfo',
		value: function getItemInfo() {
			if (this.itemInfoHeaderFunc == null || this.itemInfoHeaderFunc == undefined) return;
			this.itemInfoHeaderFunc.call(this);
		}
	}, {
		key: 'getLangNamesObjectFromMapArray',
		value: function getLangNamesObjectFromMapArray(lang) {
			if (lang == "" || lang == undefined) {
				return {};
			}

			var langNames = {};
			//var pattern=new RegExp("^("+lang+")(.*)$");
			try {

				for (var item in this.state.mapArray["NAMES_LANG"][lang]) {
					// if ( pattern.test(item))
					// {
					//  var name=item.replace(pattern,$2);
					langNames[item] = this.state.mapArray["NAMES_LANG"][lang][item];

					// }			 
				}
			} catch (e) {}
			return langNames;
		}
	}, {
		key: 'updateWithNoItemAnalogCode',
		value: function updateWithNoItemAnalogCode() {
			this.itemAnalogCode = undefined;
			this.setState({ justUpdate: null });
		}
		////////////////////////////////////////

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Item_info_header.prototype.__proto__ || Object.getPrototypeOf(Item_info_header.prototype), 'componentDidMount', this).call(this);
			this.getItemInfo();
		}
	}, {
		key: 'render',
		value: function render() {
			var langNames = this.getLangNamesObjectFromMapArray("UKR");
			var infoArray = [];

			try {
				if (this.itemAnalogCode != undefined) {
					var pointList = React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-3 ' }, React.createElement('h2', null, "OE Артикул")), React.createElement('div', { className: 'col-md-6' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h2', null, this.itemAnalogCode))));
					infoArray.push(pointList);
				}
				for (var item in langNames) {
					if (item in this.state.mapArray) {
						var pointList = React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-3 ' }, React.createElement('h2', null, langNames[item])), React.createElement('div', { className: 'col-md-6' }, React.createElement('p', { className: 'form-control-label' }, React.createElement('h2', null, this.state.mapArray[item]))));
						infoArray.push(pointList);
					}
				}
			} catch (e) {}
			var imgSrc = "";
			var imgAlt = this.itemAnalogCode != undefined && this.itemAnalogCode != "" ? this.itemAnalogCode : this.itemCode;
			try {
				imgSrc = this.state.mapArray["IMGSRC"];
			} catch (e) {}

			return React.createElement('div', { 'class': 'block-title' }, React.createElement('div', { className: 'col-md-6' }, React.createElement('form', { method: 'post', className: 'form-horizontal form-bordered' }, React.createElement('div', { 'class': 'form-group' }, React.createElement('h2', { 'class': 'sub-header' }, "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u0442\u043E\u0432\u0430\u0440")), infoArray)), React.createElement('div', { className: 'col-sm-6 block-section text-center' }, React.createElement('a', { href: imgSrc, 'data-toggle': 'lightbox-image' }, React.createElement('img', { src: imgSrc, alt: imgAlt }))));
		}
	}]);

	return Item_info_header;
}(_main_component.Extends);

function getItemInfoHeader() {
	var data = "ItemCode=" + this.itemCode + "&HEADER=";
	var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/catalog/" + this.brandName + "/", data);
	var itemInfoHeader = function itemInfoHeader(responseText) {
		handleHeader = new _data_convert.handleData(responseText);
		this.setState({ mapArray: handleHeader.mapArray });
	};
	itemInfoHeader = itemInfoHeader.bind(this);
	Prom.then(itemInfoHeader);
}

function getPriceOrderComponent(itemCode, brandName) {
	Price_order.itemCode = itemCode;
	Price_order.brandName = brandName;
	return Price_order;
}

var Price_order = exports.Price_order = function (_Extends3) {
	_inherits(Price_order, _Extends3);

	function Price_order(props) {
		_classCallCheck(this, Price_order);

		var _this3 = _possibleConstructorReturn(this, (Price_order.__proto__ || Object.getPrototypeOf(Price_order)).call(this, props));

		_this3.priceUSD = 0;
		_this3.priceUAH = 0;
		_this3.itemCode = _this3.constructor.itemCode;
		_this3.brandName = _this3.constructor.brandName;
		_this3.inOurStock = false;
		_this3.itemInfo = null;
		_this3.updateIsCorrect = false;
		return _this3;
	}

	_createClass(Price_order, [{
		key: 'getData',
		value: function getData() {
			var Prom = this.getBrandCode(this.BrandName);
			var getSearchData = this.getSearchData.bind(this);
			Prom.then(getSearchData);
		}
	}, {
		key: 'getBrandCode',
		value: function getBrandCode(BrandName) {
			var brandCodeGet = function brandCodeGet(resolve, reject) {
				if (this.getBrandIdByFullName(this.brandName) != undefined) {
					clearInterval(this.interval);
					resolve(this.getBrandIdByFullName(this.brandName));
				}
			};
			brandCodeGet = brandCodeGet.bind(this);
			sInterval = function sInterval(resolve, reject) {
				this.interval = setInterval(function () {
					brandCodeGet(resolve, reject);
				}, 200);
			};
			sInterval = sInterval.bind(this);
			var Prom = new Promise(sInterval);

			return Prom;
		}
	}, {
		key: 'getSearchData',
		value: function getSearchData(brandCode) {
			if (this.itemCode == "" || this.itemCode == undefined) {
				return;
			}
			var data = "ItemCode=" + this.itemCode + "";
			if (this.brandCode == undefined || this.brandCode == null) {
				//this.noAnalogsFinded=true;
			} else {

				data += "&BrandCode=" + brandCode;
			}
			var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/searchItems.php", data);

			var searchData = function searchData(responseText) {
				handleBR = new _data_convert.handleData(responseText, undefined, "BRANDS");
				handleDT = new _data_convert.handleData(responseText, getMapObject(), "ITEMS");

				var regionRangeObjectValue = {
					"1-1": [],
					"2-3": [],
					"4-4": [],
					"980-999": [],
					"default": []

				};
				var data = handleDT.mapArray;

				for (var i = 0; i < data.length; i++) {
					this.getRangeObjectValue(regionRangeObjectValue, data[i].RegionCode.fValue).push(data[i]);
				}

				if (regionRangeObjectValue["1-1"].length == 1) {
					this.inOurStock = true;
					this.priceUAH = regionRangeObjectValue["1-1"][0].PriceUAH.fValue;
					this.itemInfo = regionRangeObjectValue["1-1"][0];
					this.updateIsCorrect = true;
					this.setState({ justUpdate: null });
				} else {

					this.inOurStock = false;
				}
			};
			searchData = searchData.bind(this);
			Prom.then(searchData);
		}
		///////////////////////////////////////////

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getData();
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.inOurStock) {

				return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'input-group col-md-12' }, React.createElement('button', { type: 'button', className: 'btn btn-alt btn-lg btn-danger' }, this.priceUAH + " грн.")), React.createElement('div', { className: 'input-group col-md-12' }, React.createElement(Action_td, { proto: this.itemInfo })));
			} else {
				return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'input-group col-md-3' }, React.createElement('div', { 'class': 'btn-group pull-left' }, React.createElement('a', { 'class': 'btn btn-primary', href: "/search/" + this.itemCode }, React.createElement('i', { 'class': 'fa fa-angle-right' }), " \u0417\u0430\u043C\u043E\u0432\u0438\u0442\u0438"))));
			}
		}
	}]);

	return Price_order;
}(_main_component.Extends);

var Action_td = exports.Action_td = function (_Extends4) {
	_inherits(Action_td, _Extends4);

	function Action_td(props) {
		_classCallCheck(this, Action_td);

		var _this4 = _possibleConstructorReturn(this, (Action_td.__proto__ || Object.getPrototypeOf(Action_td)).call(this, props));

		_this4.state = _this4.props;
		_this4.addToBasket = _this4.addToBasket.bind(_this4);
		_this4.state.inputs = props.inputs;
		_this4.state.Quantity = 1;
		_this4.updateQuantity = _this4.updateQuantity.bind(_this4);
		_this4.itemBasketQuantityCheck = _this4.itemBasketQuantityCheck.bind(_this4);

		return _this4;
	}

	_createClass(Action_td, [{
		key: 'addToBasket',
		value: function addToBasket(notify) {
			var mas = [];
			for (input in this.state.proto) {
				if (input == "Pic64Base") continue;
				if (this.state.proto[input].fValue) mas.push(input + "=" + this.state.proto[input].fValue);
			}

			var Pro = this.makeRequestToRecieveData("POST", "/ws/AddToBusket.php", false, mas.join('&') + "&Quantity=" + this.state.Quantity);
			var parseData = function (data) {
				var requestInfo = new _data_convert.handleData(data, undefined, "REQUEST");
				var statusInfo = new _data_convert.handleData(data, undefined, "STATUS");
				var actionInfo = new _data_convert.handleData(data, undefined, "ACTION");

				return React.createElement(AddToBasketReturnMassage, { statusInfo: statusInfo.mapArray, actionInfo: actionInfo.mapArray });
			}.bind(this);
			var updateBasketIcon = function updateBasketIcon(data) {
				//alert(data) ; 
				obj = window.objectReg["Basket_icon"];
				obj.setState({ getBasketPartsQuantity: true });
				if (notify) this.showInforMassage("ADD", parseData(data));
				return parseData(data);
			};
			updateBasketIcon = updateBasketIcon.bind(this);
			return Pro.then(updateBasketIcon);
		}
	}, {
		key: 'itemBasketQuantityCheck',
		value: function itemBasketQuantityCheck() {
			var mas = [];
			for (input in this.state.proto) {
				if (this.state.proto[input].fValue) mas.push(input + "=" + this.state.proto[input].fValue);
			}

			var Pro = this.makeRequestToRecieveData("POST", "/ws/AddToBusket.php", false, mas.join('&') + "&Quantity=" + this.state.Quantity + "&item_duplicate_check=Y");
			var updateBasketIcon = function updateBasketIcon(data) {
				var firstQuantity = Number(data);
				var secondQuantity = this.state.Quantity == undefined ? 1 : this.state.Quantity;
				if (firstQuantity > 0) {
					var info = { itemCode: this.state.proto.ItemCode.fValue,
						caption: this.state.proto.Caption.fValue,
						firstQuantity: firstQuantity,
						secondQuantity: secondQuantity,
						actionCom: this
					};
					var infoMassage = React.createElement(ItemDuplicateMassage, { info: info, proto: this.state.proto });
					this.showInforMassage("ADD", infoMassage);
				} else {
					this.addToBasket(true);
				}
			};
			updateBasketIcon = updateBasketIcon.bind(this);
			Pro.then(updateBasketIcon);
		}
	}, {
		key: 'updateQuantity',
		value: function updateQuantity(event) {
			if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
			// Разрешаем выделение: Ctrl+A
			event.keyCode == 65 && event.ctrlKey === true ||
			// Разрешаем клавиши навигации: home, end, left, right
			event.keyCode >= 35 && event.keyCode <= 39 || event.keyCode == 190) {

				var quantity = event.target.value;
				this.setState({ Quantity: quantity });
			} else {
				if ((event.keyCode < 48 || event.keyCode > 90) && (event.keyCode < 96 || event.keyCode > 105)) {
					event.preventDefault();
				} else {
					var quantity = event.target.value;
					this.setState({ Quantity: quantity });
				}
			}
		}
		/////

	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', { className: 'btn-group btn-group-xs' }, React.createElement('input', { type: 'number', name: 'number', onChange: this.updateQuantity, 'data-toggle': 'tooltip', className: 'btn btn-default visible-lg-block', value: "Quantity" in this.state == false ? 1 : this.state.Quantity, style: { width: "3em" } }), React.createElement(Select_quantity, { typeOfSelectNumber: "int", parentComponent: this }), React.createElement('a', { onClick: this.itemBasketQuantityCheck, 'data-toggle': 'tooltip', title: 'Edit', className: 'btn btn-default' }, React.createElement('i', { className: 'gi gi-shopping_cart' })));
		}
	}]);

	return Action_td;
}(_main_component.Extends);

var Select_quantity = exports.Select_quantity = function (_Extends5) {
	_inherits(Select_quantity, _Extends5);

	function Select_quantity(props) {
		_classCallCheck(this, Select_quantity);

		var _this5 = _possibleConstructorReturn(this, (Select_quantity.__proto__ || Object.getPrototypeOf(Select_quantity)).call(this, props));

		if (_this5.props.typeOfSelectNumber) _this5.state.typeOfSelectNumber = _this5.props.typeOfSelectNumber;else _this5.state.typeOfSelectNumber = "int";

		if (_this5.props.maxNumber) _this5.state.maxNumber = _this5.props.maxNumber;else _this5.state.maxNumber = 25;

		if (_this5.props.parentComponent) {
			_this5.state.parentComponent = _this5.props.parentComponent;
			_this5.updateQuantity = _this5.updateQuantity.bind(_this5.state.parentComponent);
		} else {
			_this5.state.parentComponent = _this5;
		}

		return _this5;
	}

	_createClass(Select_quantity, [{
		key: 'updateQuantity',
		value: function updateQuantity(event) {
			try {
				this.updateQuantity(event);
			} catch (e) {}
		}
	}, {
		key: 'makeOptions',
		value: function makeOptions() {
			if (this.state.typeOfSelectNumber == "int") {
				var mas = [];
				for (var i = 1; i <= this.state.maxNumber; i++) {
					mas.push(React.createElement('option', { key: i, value: i }, i));
				}

				this.state.optionsMas = mas;
			} else if (this.state.typeOfSelectNumber == "float") {
				var mas = [];
				for (var i = 0.5; i <= this.state.maxNumber;) {
					mas.push(React.createElement('option', { key: i, value: i }, i));
					i += 0.5;
				}

				this.state.optionsMas = mas;
			} else {
				var mas = [];
				for (var i = 1; i <= this.state.maxNumber; i++) {
					mas.push(React.createElement('option', { key: i, value: i }, i));
				}

				this.state.optionsMas = mas;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.makeOptions();
			return React.createElement('select', { className: 'visible-xs-block visible-sm-block visible-md-block', onChange: this.updateQuantity }, this.state.optionsMas.map(function (item) {

				return item;
			}));
		}
	}]);

	return Select_quantity;
}(_main_component.Extends);
//////////////////////////////////////////////////////////////////

function getItemInfoCrossesComponent(itemCode, captionStringItemAnalogCode, brandName, item_Info_Component) {
	Item_info_crosses.itemCode = itemCode;
	Item_info_crosses.brandName = brandName;
	Item_info_crosses.captionStringItemAnalogCode = captionStringItemAnalogCode;
	Item_info_crosses.itemInfoCrossFunc = getItemInfoCrosses;
	Item_info_crosses.item_Info_Component = item_Info_Component;
	return Item_info_crosses;
}

function getItemInfoCrosses() {
	var data = "ItemCode=" + this.itemCode + "&CROSSES=";
	var Prom = this.makeRequestToRecieveDataAsync("POST", "/ws/catalog/" + this.brandName + "/", data);
	var itemInfoCrosses = function itemInfoCrosses(responseText) {
		handleCrosses = new _data_convert.handleData(responseText, getMapObjectCrosses());
		this.setState({ mapArray: handleCrosses.mapArray });
	};
	itemInfoCrosses = itemInfoCrosses.bind(this);
	Prom.then(itemInfoCrosses);
}

var Item_info_crosses = exports.Item_info_crosses = function (_Extends6) {
	_inherits(Item_info_crosses, _Extends6);

	function Item_info_crosses(props) {
		_classCallCheck(this, Item_info_crosses);

		var _this6 = _possibleConstructorReturn(this, (Item_info_crosses.__proto__ || Object.getPrototypeOf(Item_info_crosses)).call(this, props));

		_this6.itemInfoCrossFunc = _this6.constructor.itemInfoCrossFunc;
		_this6.itemCode = _this6.constructor.itemCode;
		_this6.brandName = _this6.constructor.brandName;
		_this6.captionStringItemAnalogCode = _this6.constructor.captionStringItemAnalogCode;
		_this6.item_Info_Component = _this6.constructor.item_Info_Component;
		_this6.state.mapArray = [];
		return _this6;
	}

	_createClass(Item_info_crosses, [{
		key: 'getItemInfo',
		value: function getItemInfo() {
			if (this.itemInfoCrossFunc == null || this.itemInfoCrossFunc == undefined) return;
			this.itemInfoCrossFunc.call(this);
		}
	}, {
		key: 'checkForAnalog',
		value: function checkForAnalog(itemAnalogCode) {
			if (itemAnalogCode == undefined || this.state.mapArray.length == 0) return true;
			var check = false;
			for (var item in this.state.mapArray) {
				if (this.state.mapArray[item].I2Code.fValue == itemAnalogCode) {
					check = true;
					return check;
				}
			}
			return check;
		}
		////////////////////////////

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getItemInfo();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			_get(Item_info_crosses.prototype.__proto__ || Object.getPrototypeOf(Item_info_crosses.prototype), 'componentDidUpdate', this).call(this);
			// if (this.state.mapArray.length>0)
			//{
			//if (!this.checkForAnalog(this.captionStringItemAnalogCode))
			//{
			//this.item_Info_Component.updateWithNoItemAnalogCode();
			//}
			//}
			if (!this.checkForAnalog(this.captionStringItemAnalogCode)) {
				window.objectReg['Item_info_header'].updateWithNoItemAnalogCode();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var tablePrepared = this.makeTableFromMapArray(this.state.mapArray);
			return React.createElement('div', { className: 'block' }, React.createElement('div', { 'class': 'block-title' }, React.createElement('h2', null, React.createElement('strong', null, "\u0410\u043D\u0430\u043B\u043E\u0433\u0438"))), tablePrepared);
		}
	}]);

	return Item_info_crosses;
}(_main_component.Extends);

var CrossBrand_td = exports.CrossBrand_td = function (_Extends7) {
	_inherits(CrossBrand_td, _Extends7);

	function CrossBrand_td(props) {
		_classCallCheck(this, CrossBrand_td);

		var _this7 = _possibleConstructorReturn(this, (CrossBrand_td.__proto__ || Object.getPrototypeOf(CrossBrand_td)).call(this, props));

		_this7.state = _this7.props;

		return _this7;
	}

	_createClass(CrossBrand_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, ' ', React.createElement('h4', null, this.state.proto[this.state.NAME].fValue));
		}
	}]);

	return CrossBrand_td;
}(_main_component.Extends);

var CrossItem_td = exports.CrossItem_td = function (_Extends8) {
	_inherits(CrossItem_td, _Extends8);

	function CrossItem_td(props) {
		_classCallCheck(this, CrossItem_td);

		var _this8 = _possibleConstructorReturn(this, (CrossItem_td.__proto__ || Object.getPrototypeOf(CrossItem_td)).call(this, props));

		_this8.state = _this8.props;

		return _this8;
	}

	_createClass(CrossItem_td, [{
		key: 'render',
		value: function render() {
			return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement('h4', null, this.state.proto[this.state.NAME].fValue));
		}
	}]);

	return CrossItem_td;
}(_main_component.Extends);

var Common_th = exports.Common_th = function (_Extends9) {
	_inherits(Common_th, _Extends9);

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

var ItemDuplicateMassage = exports.ItemDuplicateMassage = function (_Extends10) {
	_inherits(ItemDuplicateMassage, _Extends10);

	function ItemDuplicateMassage(props) {
		_classCallCheck(this, ItemDuplicateMassage);

		var _this10 = _possibleConstructorReturn(this, (ItemDuplicateMassage.__proto__ || Object.getPrototypeOf(ItemDuplicateMassage)).call(this, props));

		_this10.state = _this10.props;

		_this10.addToBasket = _this10.addToBasket.bind(_this10);
		return _this10;
	}
	////////////////////////////////


	_createClass(ItemDuplicateMassage, [{
		key: 'addToBasket',
		value: function addToBasket(e) {
			var updateMassage = function updateMassage(data) {
				this.fullInfoMassage("", data);
			};
			updateMassage = updateMassage.bind(this);
			var aToBusket = function aToBusket() {
				// var actionComAddToBasket= this.state.info.actionCom.addToBasket.bind(this);
				var actionComAddToBasket = Action_td.prototype.addToBasket.bind(this);
				actionComAddToBasket(false).then(updateMassage);
				//this.showInforMassage();
			};
			aToBusket = aToBusket.bind(this);
			this.setState({ Quantity: e.target.getAttribute("count") }, aToBusket);
		}
	}, {
		key: 'render',
		value: function render() {

			var a = React.createElement('div', null, React.createElement('p', { align: 'center' }, "\u0423\u0432. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C."), React.createElement('p', { align: 'center' }, "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u0443\u0436\u0435 \u0438\u043C\u0435\u0435\u0442\u0441\u044F \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0439 \u0442\u043E\u0432\u0430\u0440."), React.createElement('p', { align: 'center' }, this.props.info.itemCode, ' -', this.props.info.caption, "  \u0432 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0435 ", this.props.info.firstQuantity, " \u0448\u0442. "), React.createElement('button', { type: 'button', onClick: this.addToBasket, className: 'btn btn-primary', count: Number(this.props.info.firstQuantity) + Number(this.props.info.secondQuantity) }, React.createElement('i', { className: 'fa fa-search' }), " \u0417\u0430\u043C\u043E\u0432\u0438\u0442\u0438 ", Number(this.props.info.firstQuantity) + Number(this.props.info.secondQuantity)), React.createElement('button', { type: 'button', onClick: this.addToBasket, className: 'btn btn-primary', count: this.props.info.firstQuantity, 'data-dismiss': 'modal' }, React.createElement('i', { className: 'fa fa-search' }), " \u0417\u0430\u043B\u0438\u0448\u0438\u0442\u0438 ", this.props.info.firstQuantity));
			return a;
		}
	}]);

	return ItemDuplicateMassage;
}(_main_component.Extends);

var AddToBasketReturnMassage = exports.AddToBasketReturnMassage = function (_Extends11) {
	_inherits(AddToBasketReturnMassage, _Extends11);

	function AddToBasketReturnMassage(props) {
		_classCallCheck(this, AddToBasketReturnMassage);

		var _this11 = _possibleConstructorReturn(this, (AddToBasketReturnMassage.__proto__ || Object.getPrototypeOf(AddToBasketReturnMassage)).call(this, props));

		_this11.statusInfo = { "0": "не виконано.", "1": "виконано" };
		_this11.actionInfo = { "0": "Оновлення", "1": "Додавання" };

		return _this11;
	}

	_createClass(AddToBasketReturnMassage, [{
		key: 'render',
		value: function render() {

			var a = React.createElement('div', null, React.createElement('p', { align: 'center' }, "\u0428\u0430\u043D\u043E\u0432\u043D\u0438\u0439  \u041A\u043B\u0456\u0454\u043D\u0442."), React.createElement('p', { align: 'center' }, this.actionInfo[this.props.actionInfo], ' ', this.statusInfo[this.props.statusInfo], '! '), React.createElement('p', { align: 'center' }, ' '), React.createElement('button', { align: 'center', type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal' }, " \u041E\u041A "));

			return a;
		}
	}]);

	return AddToBasketReturnMassage;
}(_main_component.Extends);

/////////////////////////////////////////////////////////////////////////

/***/ }),

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

/***/ }),

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

/***/ "./app/order_basket.js":
/*!*****************************!*\
  !*** ./app/order_basket.js ***!
  \*****************************/
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

var _order_detail = __webpack_require__(/*! ./order_detail.js */ "./app/order_detail.js");

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

/***/ "./app/order_detail.js":
/*!*****************************!*\
  !*** ./app/order_detail.js ***!
  \*****************************/
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

/***/ }),

/***/ "./app/order_list.js":
/*!***************************!*\
  !*** ./app/order_list.js ***!
  \***************************/
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
		key: 'onclick',
		value: function onclick() {
			this.activateProgressBar();
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

/***/ }),

/***/ "./app/page_content.js":
/*!*****************************!*\
  !*** ./app/page_content.js ***!
  \*****************************/
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

var _order_basket = __webpack_require__(/*! ./order_basket.js */ "./app/order_basket.js");

var _order_list = __webpack_require__(/*! ./order_list.js */ "./app/order_list.js");

var _order_detail = __webpack_require__(/*! ./order_detail.js */ "./app/order_detail.js");

var _sidebar_userinfo = __webpack_require__(/*! ./sidebar_userinfo.js */ "./app/sidebar_userinfo.js");

var _search_content_v = __webpack_require__(/*! ./search_content_v2.js */ "./app/search_content_v2.js");

var _start_page = __webpack_require__(/*! ./start_page.js */ "./app/start_page.js");

var _balance = __webpack_require__(/*! ./balance.js */ "./app/balance.js");

var _shipment_readydellivery = __webpack_require__(/*! ./shipment_readydellivery.js */ "./app/shipment_readydellivery.js");

var _itemcodes_history = __webpack_require__(/*! ./itemcodes_history.js */ "./app/itemcodes_history.js");

var _shipingdocs = __webpack_require__(/*! ./shipingdocs.js */ "./app/shipingdocs.js");

var _shiping_detail = __webpack_require__(/*! ./shiping_detail.js */ "./app/shiping_detail.js");

var _shipingdoc_detail = __webpack_require__(/*! ./shipingdoc_detail.js */ "./app/shipingdoc_detail.js");

var _contacts = __webpack_require__(/*! ./contacts.js */ "./app/contacts.js");

var _catalogs_auto = __webpack_require__(/*! ./catalogs_auto.js */ "./app/catalogs_auto.js");

var _return_docs = __webpack_require__(/*! ./return_docs.js */ "./app/return_docs.js");

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

/***/ "./app/regions_info.js":
/*!*****************************!*\
  !*** ./app/regions_info.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Regions = undefined;

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

var _sidebar = __webpack_require__(/*! ./sidebar.js */ "./app/sidebar.js");

var _data_convert = __webpack_require__(/*! ./data_convert.js */ "./app/data_convert.js");

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

/*export function Regions()
{  
   this.regions={};
	
	var getRegionsInfo =function()
    {
	 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/getRegions.php","REGIONS=Y");
	 var RegionsInfo=function(responseText)
	 {
		 var handleDT= new handleData(responseText);
		 this.Regions=handleDT.mapArray;
		 
	 }
	 RegionsInfo=RegionsInfo.bind(this);
	 Prom.then(RegionsInfo);
    }.bind(this)
	getRegionInfoById = function(id)
    {
	  
    }
	
}*/

var Regions = exports.Regions = function (_Extends) {
	_inherits(Regions, _Extends);

	function Regions(props) {
		_classCallCheck(this, Regions);

		var _this = _possibleConstructorReturn(this, (Regions.__proto__ || Object.getPrototypeOf(Regions)).call(this, props));

		_this.regions = {};
		return _this;
	}

	_createClass(Regions, [{
		key: 'getRegionsInfo',
		value: function getRegionsInfo() {
			var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/getRegions.php", "REGIONS=Y");
			var RegionsInfo = function RegionsInfo(responseText) {
				var handleDT = new _data_convert.handleData(responseText);
				this.regions = handleDT.mapArray;
			};
			RegionsInfo = RegionsInfo.bind(this);
			Prom.then(RegionsInfo);
		}

		///////////////////////////////////////

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Regions.prototype.__proto__ || Object.getPrototypeOf(Regions.prototype), 'componentDidMount', this).call(this);
			this.getRegionsInfo();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			//this.getRegionsInfo();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', null);
		}
	}]);

	return Regions;
}(_main_component.Extends);

/***/ }),

/***/ "./app/return_docs.js":
/*!****************************!*\
  !*** ./app/return_docs.js ***!
  \****************************/
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

/***/ }),

/***/ "./app/shiping_detail.js":
/*!*******************************!*\
  !*** ./app/shiping_detail.js ***!
  \*******************************/
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

/***/ }),

/***/ "./app/shipingdoc_detail.js":
/*!**********************************!*\
  !*** ./app/shipingdoc_detail.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common_th = exports.Summ_td = exports.Shiping_td = exports.Shipingdoc_detail = undefined;

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
    ID: { functions: { defineTitle: defineTitle, makeTitle: makeTitle }, params: ["", ""] },
    NUMBER: { functions: { makeAlias: makeAlias }, params: ["Номер"] },
    DELIVER: { functions: { makeAlias: makeAlias }, params: ["Перевізник"] },
    NUMBERBASE: { functions: { makeAlias: makeAlias }, params: ["Номер по базі"] },
    DATE: { functions: {}, params: [] },
    PLACES: { functions: { makeAlias: makeAlias }, params: ["Кількість місць"] },
    COMMENTS: { functions: { makeAlias: makeAlias }, params: ["Коментарі"] },
    USERNAME: { functions: {}, params: [] }
  };
  return mapObject;
}
function defineTitle() {

  this.fValue = "Декларація відгрузки від " + this.DATE.fValue;
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
    DATE: { functions: { parceDate: parceDate }, params: [""] },
    NUMBER: { functions: { defineColumnName: defineColumnName, defineTd: defineTd, defineTh: defineTh }, params: ["", React.createElement(Shiping_td, null), [React.createElement(Common_th, null), "Номер"]] },
    ID: { functions: {}, params: [] }

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

  var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/shipingdoc_detail.php", data);
  var shipingDetail = function (responseText) {
    //details=new handleData(responseText,this.constructor.mapObject,"SHIPMENTS");				
    rows = new _data_convert.handleData(responseText, this.constructor.mapObject, "SHIPMENTS");
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

  var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/shipingdoc_detail.php", data);
  var shipingDetail = function (responseText) {
    details = new _data_convert.handleData(responseText, this.constructor.mapObject, "DECDETAIL");
    //rows=new handleData(responseText,this.constructor.mapObject,"ROWS")
    this.setState({ mapArray: details.mapArray, shouldComponentUpdate: true });
  }.bind(this);
  Prom.then(shipingDetail);
}

//////////////////////////////////////////////////////////////


var Shipingdoc_detail = exports.Shipingdoc_detail = function (_Extends) {
  _inherits(Shipingdoc_detail, _Extends);

  function Shipingdoc_detail(props) {
    _classCallCheck(this, Shipingdoc_detail);

    var _this = _possibleConstructorReturn(this, (Shipingdoc_detail.__proto__ || Object.getPrototypeOf(Shipingdoc_detail)).call(this, props));

    _this.id = _this.props.match.params.id;
    _this.DocsListComponent = getDocsListComponent();
    _this.HeaderComponent = getHeaderComponent();
    return _this;
  }

  _createClass(Shipingdoc_detail, [{
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

  return Shipingdoc_detail;
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

var Shiping_td = exports.Shiping_td = function (_Extends4) {
  _inherits(Shiping_td, _Extends4);

  function Shiping_td(props) {
    _classCallCheck(this, Shiping_td);

    var _this4 = _possibleConstructorReturn(this, (Shiping_td.__proto__ || Object.getPrototypeOf(Shiping_td)).call(this, props));

    _this4.state = _this4.props;

    return _this4;
  }

  _createClass(Shiping_td, [{
    key: 'render',
    value: function render() {
      var status = "";
      try {
        status = this.state.proto.STATUS.fValue;
      } catch (e) {}
      return React.createElement('td', { className: this.state.proto[this.state.NAME].className + " text-center" }, React.createElement(_reactRouterDom.Link, { to: "/shiping_detail/" + this.state.proto.ID.fValue }, this.state.proto[this.state.NAME].fValue), React.createElement('br', null), this.state.proto.NUMBER.fValue, React.createElement('br', null), this.state.proto.DATE.fValue);
    }
  }]);

  return Shiping_td;
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

/***/ }),

/***/ "./app/shipingdocs.js":
/*!****************************!*\
  !*** ./app/shipingdocs.js ***!
  \****************************/
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

/***/ }),

/***/ "./app/shipment_readydellivery.js":
/*!****************************************!*\
  !*** ./app/shipment_readydellivery.js ***!
  \****************************************/
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

/***/ }),

/***/ "./app/sidebar.js":
/*!************************!*\
  !*** ./app/sidebar.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = undefined;

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

var _jquery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var _jquery2 = _interopRequireDefault(_jquery);

var _sidebar_header = __webpack_require__(/*! ./sidebar_header.js */ "./app/sidebar_header.js");

var _page_content = __webpack_require__(/*! ./page_content.js */ "./app/page_content.js");

var _sidebar_userinfo = __webpack_require__(/*! ./sidebar_userinfo.js */ "./app/sidebar_userinfo.js");

var _sidebar_brand = __webpack_require__(/*! ./sidebar_brand.js */ "./app/sidebar_brand.js");

var _main_component = __webpack_require__(/*! ./main_component.js */ "./app/main_component.js");

var _search_content = __webpack_require__(/*! ./search_content.js */ "./app/search_content.js");

var _search_content_v = __webpack_require__(/*! ./search_content_v2.js */ "./app/search_content_v2.js");

var _basket_items = __webpack_require__(/*! ./basket_items.js */ "./app/basket_items.js");

var _order_basket = __webpack_require__(/*! ./order_basket.js */ "./app/order_basket.js");

var _order_list = __webpack_require__(/*! ./order_list.js */ "./app/order_list.js");

var _info_message = __webpack_require__(/*! ./info_message.js */ "./app/info_message.js");

var _auth = __webpack_require__(/*! ./auth.js */ "./app/auth.js");

var _balance = __webpack_require__(/*! ./balance.js */ "./app/balance.js");

var _progress_bar = __webpack_require__(/*! ./progress_bar.js */ "./app/progress_bar.js");

var _check = __webpack_require__(/*! ./check.js */ "./app/check.js");

var _regions_info = __webpack_require__(/*! ./regions_info.js */ "./app/regions_info.js");

var _brands_info = __webpack_require__(/*! ./brands_info.js */ "./app/brands_info.js");

__webpack_require__(/*! ./css/plugins.css */ "./app/css/plugins.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

//var $=require('jquery'); 
//var jQuery=require('jquery'); 
window.jQuery = _jquery2.default;
window.$ = _jquery2.default;
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
window.moment = moment;

var Li = __webpack_require__(/*! ./sidebar_li.js */ "./app/sidebar_li.js");
//var Sidebar_nav =require('./sidebar_nav.js');
//import {Sidebar_nav} from './sidebar_nav.js';
var Sidebar_nav = window.Sidebar_nav;
var ITEMS = window.ITEMS;
//import {items as ITEMS }from './sidebar_nav.js';

//import {Basket} from './basket_items.js'

/*var Sidebar_header=require.ensure(['./sidebar_header.js'],function(){
	 Sidebar_header=require('./sidebar_header.js');
	
})*/

//require ('bootstrap/dist/js/bootstrap.js');
//require ('bootstrap/dist/css/bootstrap.min.css');
var App = __webpack_require__(/*! ./js/app.js */ "./app/js/app.js");

__webpack_require__(/*! ./js/app.js */ "./app/js/app.js");

//require('style-loader!css-loader!./css/plugins.css');         


//alert(Sidebar_nav);
//debugger   

/*class Extends extends React.Component
{
    constructor(props)
    {
        super(props);
         this.state={parentMod:this};
        
    }
    
}  */

function afterRender() {
  (0, _jquery2.default)('[data-toggle="tooltip"]').tooltip();
}

var Sidebar = exports.Sidebar = function (_Extends) {
  _inherits(Sidebar, _Extends);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.touchMove = _this.touchMove.bind(_this);
    _this.touchMoveXCoords = [];
    _this.touchMoveYCoords = [];
    _this.isSideBarOpened = false;

    return _this;
  }

  _createClass(Sidebar, [{
    key: 'getWindowWidth',
    value: function getWindowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }, {
    key: 'sideBarToogle',
    value: function sideBarToogle() {
      this.isSideBarOpened = !this.isSideBarOpened;
      App.App.sidebar('toggle-sidebar');
      (0, _jquery2.default)("body").css("width", "100%");
      /*if (this.isSideBarOpened==true)
      {
      var sidebar_brand=window.objectReg["Sidebar_brand"];
      sidebar_brand.startMouseEnterEvent();
      }*/
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      /* if (e.target.id=="sidebar") 
      {
      e.preventDefault();
      return;
      }*/

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      this.touchMoveXCoords.push(Number(x));
      this.touchMoveYCoords.push(Number(y));
      var ln = 3;
      var lnY = 30;
      if (this.touchMoveXCoords.length == ln) {

        if (Number(this.touchMoveXCoords[0]) > Number(this.touchMoveXCoords[ln - 1]) && Math.abs(Number(this.touchMoveYCoords[0]) - Number(this.touchMoveYCoords[ln - 1])) < lnY && this.isSideBarOpened == true) {
          /*   this.isSideBarOpened=false;
            //alert(this.touchMoveXCoords[1])
             App.App.sidebar('toggle-sidebar');
                   $("body").css("width","100%");*/
          this.sideBarToogle();
        } else if (Number(this.touchMoveXCoords[0]) < Number(this.touchMoveXCoords[ln - 1]) && Math.abs(Number(this.touchMoveYCoords[0]) - Number(this.touchMoveYCoords[ln - 1])) < lnY && this.isSideBarOpened == false) {
          /* this.isSideBarOpened=true;
            App.App.sidebar('toggle-sidebar');
                   $("body").css("width","100%");*/
          //this.sideBarToogle();
        }
        this.touchMoveXCoords = [];
        this.touchMoveYCoords = [];
      } else {}
    }
  }, {
    key: 'touchDenyMove',
    value: function touchDenyMove(e) {
      e.stopPropagation();
      return;
    }
    /////////////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Sidebar.prototype.__proto__ || Object.getPrototypeOf(Sidebar.prototype), 'componentDidMount', this).call(this);
      this.isSideBarOpened = this.getWindowWidth() > 991;
      this.deActivateProgressBar();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      _get(Sidebar.prototype.__proto__ || Object.getPrototypeOf(Sidebar.prototype), 'componentDidUpdate', this).call(this);
    }
  }, {
    key: 'childUpdate',
    value: function childUpdate(obj) {
      try {
        obj.setState({ renderIN: React.createElement('h1', null, 'success') });
        obj.render();
      } catch (e) {}
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(_reactRouterDom.BrowserRouter, null, React.createElement('div', { id: 'page-container', onTouchMove: this.touchMove, className: 'header-fixed-top sidebar-partial sidebar-visible-lg sidebar-visible-lg sidebar-no-animations' }, React.createElement(_progress_bar.Progress_bar, null), React.createElement('div', { id: 'sidebar', onTouchMove: this.touchDenyMove, className: '' }, React.createElement('div', { className: 'sidebar-scroll' }, React.createElement('div', { id: 'sidebar-content', className: 'sidebar-content' }, React.createElement(_sidebar_brand.Sidebar_brand, null), React.createElement(_sidebar_userinfo.Sidebar_userinfo, { isMobile: true }), React.createElement(Sidebar_nav, { items: ITEMS })))), React.createElement('div', { id: 'main-container' }, React.createElement('div', { id: 'link' }), React.createElement(_sidebar_header.Sidebar_header, { parentMod: this }), React.createElement(_page_content.Page_content, { parentMod: this })), React.createElement(_basket_items.Basket_items_forModal, null), React.createElement(_info_message.Info_message, null), React.createElement(_auth.Auth, null), React.createElement(_balance.Pay_notification, null), React.createElement(_regions_info.Regions, null), React.createElement(_brands_info.Brands, null)));
    }
  }]);

  return Sidebar;
}(_main_component.Extends);
//debugger


var body = document.getElementsByTagName("body");
ReactDOM.render(React.createElement(Sidebar, null), document.getElementById("app"), afterRender);
function loadSidebar() {
  ReactDOM.render(React.createElement(_brands_info.Brands, null), document.getElementById("service"), loadSidebar);
}

ReactDOM.render(React.createElement('a', null), document.getElementById("link"));

window.getWorkPage = function () {
  return window.objectReg['Page_content'];
};

/*var aCollection=document.getElementsByTagName("a")
for (var a in aCollection)
{
	aCollection[a].removeEventListener('mouseenter mouseleave');
}*/

//debugger
//require ('./js/app.js');

/***/ }),

/***/ "./app/sidebar_brand.js":
/*!******************************!*\
  !*** ./app/sidebar_brand.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar_brand = undefined;

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

var Sidebar_brand = exports.Sidebar_brand = function (_Extends) {
  _inherits(Sidebar_brand, _Extends);

  function Sidebar_brand(props) {
    _classCallCheck(this, Sidebar_brand);

    var _this = _possibleConstructorReturn(this, (Sidebar_brand.__proto__ || Object.getPrototypeOf(Sidebar_brand)).call(this, props));

    _this.onclick = _this.onclick.bind(_this);

    return _this;
  }

  _createClass(Sidebar_brand, [{
    key: 'onclick',
    value: function onclick() {
      if (window.isMobile) this.sideBarToogle();

      //this.deActivateProgressBar();
      this.scrollToTop();
      getWorkPage().setState({ renderIN: "", defineRoutes: true });
    }
  }, {
    key: 'startMouseEnterEvent',
    value: function startMouseEnterEvent() {
      var thisElement = ReactDOM.findDOMNode(this);

      function startEvent() {
        if (document.createEvent) {
          var event = document.createEvent("Event");
          event.target = thisElement;
          event.initEvent("mouseenter", false, true);
          this.dispatchEvent(event);
        } else {
          var event = new Event("click", { bubbles: true, cancelable: false });
          this.dispatchEvent(event);
        }
      }
      startEvent = startEvent.bind(thisElement);
      startEvent();
    }
  }, {
    key: 'render',
    value: function render() {
      /* return (  <a href="/" class="sidebar-brand">
                        <i class="gi gi-car"></i><strong><font><font>AVTODOK</font></font></strong>
                 </a>
       
       
       
                ) */
      return React.createElement(_reactRouterDom.Link, { onClick: this.onclick, to: "/", className: 'sidebar-brand', style: { "fontSize": "13px" } }, React.createElement('i', { className: 'gi gi-car' }), React.createElement('strong', null, React.createElement('font', null, React.createElement('font', null, "\u0410\u0432\u0442\u043E\u0434\u043E\u043A-\u041F\u0430\u0440\u0442\u0441-K\u0438\u0457\u0432"))));
    }
  }]);

  return Sidebar_brand;
}(_main_component.Extends);

/***/ }),

/***/ "./app/sidebar_userinfo.js":
/*!*********************************!*\
  !*** ./app/sidebar_userinfo.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sidebar_usersettings_modal = exports.Sidebar_usersettings = exports.Sidebar_userinfo = exports.Sidebar_userinfo_modal = undefined;

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

var _main_component = __webpack_require__(/*! ./main_component.js */ "./app/main_component.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

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

function getMapObject() {

    dataConvert = new _data_convert.handleData(null, null);
    var formatNumber = dataConvert.formatNumber;
    var addSuffix = dataConvert.addSuffix;
    var defineColumnName = dataConvert.defineColumnName;
    var defineColumnClass = dataConvert.defineColumnClass;
    var defineTd = dataConvert.defineTd;
    var parceDate = dataConvert.parceDate;

    var mapObject = {
        ID: { functions: {}, params: [] },
        LOGIN: { functions: {}, params: [] },
        NAME: { functions: {}, params: [] },
        EMAIL: { functions: {}, params: [] },
        PASSWORD_REQUIREMENTS: { functions: {}, params: [] },
        ERRORS: { functions: {}, params: [] },
        BX_SESSION_CHECK: { functions: {}, params: [] }

    };

    return mapObject;
}

var Sidebar_userinfo_modal = exports.Sidebar_userinfo_modal = function (_Extends) {
    _inherits(Sidebar_userinfo_modal, _Extends);

    function Sidebar_userinfo_modal(props) {
        _classCallCheck(this, Sidebar_userinfo_modal);

        return _possibleConstructorReturn(this, (Sidebar_userinfo_modal.__proto__ || Object.getPrototypeOf(Sidebar_userinfo_modal)).call(this, props));
    }

    _createClass(Sidebar_userinfo_modal, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'sidebar-section sidebar-user clearfix' }, React.createElement('div', { className: 'sidebar-user-avatar' }, React.createElement('a', { href: '#' }, React.createElement('img', { src: '/app/img/placeholders/avatars/avatar2.jpg', alt: "\u0430\u0432\u0430\u0442\u0430\u0440" }))), React.createElement('div', { className: 'sidebar-user-name' }, React.createElement('font', null, React.createElement('font', null, 'USER 1'))), React.createElement('div', { className: 'sidebar-user-links' }, React.createElement('a', { href: 'cabinet_profile.html', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u041F\u0440\u043E\u0444\u0456\u043B\u044C" }, React.createElement('i', { className: 'gi gi-user' })), React.createElement('a', { href: '#modal-user-settings', 'data-toggle': 'modal', 'class': 'enable-tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438" }, React.createElement('i', { className: 'gi gi-cogwheel' })), React.createElement('a', { href: 'login.html', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u0412\u0438\u0439\u0442\u0438" }, React.createElement('i', { className: 'gi gi-exit' }))));
        }
    }]);

    return Sidebar_userinfo_modal;
}(_main_component.Extends);

var Sidebar_userinfo = exports.Sidebar_userinfo = function (_Extends2) {
    _inherits(Sidebar_userinfo, _Extends2);

    function Sidebar_userinfo(props) {
        _classCallCheck(this, Sidebar_userinfo);

        var _this2 = _possibleConstructorReturn(this, (Sidebar_userinfo.__proto__ || Object.getPrototypeOf(Sidebar_userinfo)).call(this, props));

        _this2.state.inOutIconClass = "gi gi-log_in";
        _this2.state.ID = 0;
        _this2.onclick = _this2.onclick.bind(_this2);

        return _this2;
    }

    _createClass(Sidebar_userinfo, [{
        key: 'onclick',
        value: function onclick(e) {
            getWorkPage().setState({ renderIN: "", defineRoutes: true });
        }
        ///////////////////////////////////////

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(Sidebar_userinfo.prototype.__proto__ || Object.getPrototypeOf(Sidebar_userinfo.prototype), 'componentDidMount', this).call(this);
            //  var elA=document.getElementById("user-settings");
            //  window.addEventListener("load",function(){elA.click();})
        }
    }, {
        key: 'getUserData',
        value: function getUserData() {
            var findMySelf = this.findMySelf(this.constructor.name);
            var Prom = this.makeRequestToRecieveDataAsyncNewObject("POST", "/ws/personal_profile.php", "");

            Prom.then(function (responseText) {
                var state = null;
                if (responseText == "") {
                    state = {
                        NAME: "",
                        ID: 0,
                        shouldComponentUpdate: true
                    };
                } else {

                    handleDT = new _data_convert.handleData(responseText, getMapObject());
                    state = {
                        NAME: handleDT.mapArray[0].NAME.fValue,
                        ID: handleDT.mapArray[0].ID.fValue,
                        shouldComponentUpdate: true
                    };
                }
                findMySelf().setState(state);
            });
        }
        //////////////////////

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            if (!nextState.shouldComponentUpdate) {
                this.getUserData();
            }
            return nextState.shouldComponentUpdate;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _get(Sidebar_userinfo.prototype.__proto__ || Object.getPrototypeOf(Sidebar_userinfo.prototype), 'componentDidUpdate', this).call(this);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(Sidebar_userinfo.prototype.__proto__ || Object.getPrototypeOf(Sidebar_userinfo.prototype), 'componentDidMount', this).call(this);
            this.getUserData();
        }
    }, {
        key: 'render',
        value: function render() {
            try {
                if (Number(this.state.ID) > 0) {
                    this.state.inOutIconClass = "gi gi-log_out";
                    this.state.inOutIconTitle = "Вийти";
                } else {
                    this.state.inOutIconClass = "gi gi-log_in";
                    this.state.inOutIconTitle = "Авторизація";
                }
            } catch (e) {
                this.state.inOutIconClass = "gi gi-log_in";
                this.state.inOutIconTitle = "Авторизація";
            }

            if (this.props.isMobile) {

                return React.createElement('div', { className: 'sidebar-section sidebar-user clearfix', style: { "paddingLeft": "20px" } }, React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-3 col-sm-3' }, ' '), React.createElement('div', { className: 'sidebar-user-avatar col-xs-6 col-sm-6', style: { "marginLeft": "0px" } }, React.createElement('a', { href: '#' }, React.createElement('img', { src: '/app/img/placeholders/avatars/avatar2.jpg', alt: "\u0430\u0432\u0430\u0442\u0430\u0440" })))), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'sidebar-user-name col-xs-12 col-sm-12' }, React.createElement('p', { align: 'center' }, React.createElement('font', null, this.state.NAME)))), React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'sidebar-user-links col-xs-12 col-sm-12' }, React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-xs-6 col-sm-6' }, React.createElement('a', { href: 'cabinet_profile.html', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u041F\u0440\u043E\u0444\u0456\u043B\u044C" }, React.createElement('i', { className: 'gi gi-user', style: { "fontSize": "40px", "height": "1em" } }))), React.createElement('div', { className: 'col-xs-6 col-sm-6' }, React.createElement(_reactRouterDom.Link, { onClick: this.onclick, to: '/user_info', 'data-toggle': 'tooltip', 'data-original-title': "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438" }, React.createElement('i', { className: 'gi gi-cogwheel', style: { "fontSize": "40px", "height": "1em" } }))), React.createElement('div', { className: 'col-xs-6 col-sm-6' }, React.createElement('a', { href: '#', id: 'user-settings', 'data-toggle': 'modal', 'data-target': '#modal-user-auth', 'data-original-title': this.state.inOutIconTitle }, React.createElement('i', { className: this.state.inOutIconClass, style: { "fontSize": "40px", "height": "1em" } })))))));
            } else {

                return React.createElement('div', { className: 'sidebar-section sidebar-user clearfix' }, React.createElement('div', { className: 'sidebar-user-avatar' }, React.createElement('a', { href: '#' }, React.createElement('img', { src: '/app/img/placeholders/avatars/avatar2.jpg', alt: "\u0430\u0432\u0430\u0442\u0430\u0440" }))), React.createElement('div', { className: 'sidebar-user-name' }, React.createElement('font', null, React.createElement('font', null, 'USER 1'))), React.createElement('div', { className: 'sidebar-user-links' }, React.createElement('a', { href: 'cabinet_profile.html', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u041F\u0440\u043E\u0444\u0456\u043B\u044C" }, React.createElement('i', { className: 'gi gi-user' })), React.createElement(_reactRouterDom.Link, { to: '/user_info' }, React.createElement('i', { className: 'gi gi-cogwheel' })), React.createElement('a', { id: 'user-settings', 'data-toggle': 'modal', 'data-target': '#modal-user-auth' }, React.createElement('i', { className: 'gi gi-cogwheel' })), React.createElement('a', { href: 'login.html', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: '', 'data-original-title': "\u0412\u0438\u0439\u0442\u0438" }, React.createElement('i', { className: 'gi gi-exit' }))));
            }
        }
    }]);

    return Sidebar_userinfo;
}(_main_component.Extends);

var Sidebar_usersettings = exports.Sidebar_usersettings = function (_Extends3) {
    _inherits(Sidebar_usersettings, _Extends3);

    function Sidebar_usersettings(props) {
        _classCallCheck(this, Sidebar_usersettings);

        var _this3 = _possibleConstructorReturn(this, (Sidebar_usersettings.__proto__ || Object.getPrototypeOf(Sidebar_usersettings)).call(this, props));

        _this3.state.mapArray = [];
        _this3.state.email = "";
        _this3.state.EMAIL = "";
        _this3.onInputChange = _this3.onInputChange.bind(_this3);
        _this3.saveUserData = _this3.saveUserData.bind(_this3);
        return _this3;
    }

    _createClass(Sidebar_usersettings, [{
        key: 'getUserData',
        value: function getUserData() {
            var findMySelf = this.findMySelf(this.constructor.name);
            var Prom = this.makeRequestToRecieveData("POST", "/ws/personal_profile.php", false, this.makePostDataFromState());

            Prom.then(function (responseText) {

                handleDT = new _data_convert.handleData(responseText, getMapObject());
                var state = { mapArray: handleDT.mapArray,
                    sessid: handleDT.mapArray[0].BX_SESSION_CHECK.fValue,
                    email: handleDT.mapArray[0].EMAIL.fValue,
                    EMAIL: handleDT.mapArray[0].EMAIL.fValue,
                    LOGIN: handleDT.mapArray[0].LOGIN.fValue
                    // findMySelf().setState({mapArray:handleDT.mapArray});
                    // findMySelf().setState({sessid:handleDT.mapArray[0].BX_SESSION_CHECK.fValue});
                    // findMySelf().setState({email:handleDT.mapArray[0].EMAIL.fValue});
                    // findMySelf().setState({EMAIL:handleDT.mapArray[0].EMAIL.fValue});                                                           
                };findMySelf().setState(state);
            });
        }
    }, {
        key: 'saveUserData',
        value: function saveUserData() {
            var findMySelf = this.findMySelf(this.constructor.name);
            var Prom = this.makeRequestToRecieveData("POST", "/ws/personal_profile.php", false, this.makePostDataFromState() + "&save=1");

            Prom.then(function (responseText) {

                handleDT = new _data_convert.handleData(responseText, getMapObject());
                if (handleDT.mapArray[0].ERRORS.fValue != "") {
                    findMySelf().showInforMassage("ПОМИЛКА", handleDT.mapArray[0].ERRORS.fValue);
                } else {
                    findMySelf().showInforMassage("SUCCESS", "SUCCESS");
                    findMySelf().setState({ mapArray: handleDT.mapArray });
                }
            });
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(e) {
            var input = e.target.name;
            var id = e.target.id;
            var inputValue = e.target.value;
            this.state[input] = inputValue;
            this.state[id] = inputValue;
            if (this.state[input] == "") {
                delete this.state[input];
            }
            var str = '' + id;
            this.setState({ str: inputValue });
        }
        //////////////////////

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(Sidebar_usersettings.prototype.__proto__ || Object.getPrototypeOf(Sidebar_usersettings.prototype), 'componentDidMount', this).call(this);
            this.getUserData();
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.mapArray.lenght = 0) return React.createElement('div', null);else ;
            return React.createElement('div', { id: 'modal-user-sett', className: '', tabindex: '-1', role: 'dialog', 'aria-hidden': 'true' }, React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, " \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438")))), React.createElement('div', { className: 'modal-body' }, React.createElement('form', { action: 'index.html', method: 'post', enctype: 'multipart/form-data', className: 'form-horizontal form-bordered', onsubmit: 'return false;' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label' }, React.createElement('font', null, React.createElement('font', null, "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('p', { className: 'form-control-static' }, React.createElement('font', null, React.createElement('font', null, this.state.mapArray[0] ? this.state.mapArray[0].NAME.fValue : ""))))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-email' }, React.createElement('font', null, React.createElement('font', null, "\u0415\u043B. \u0430\u0434\u0440\u0435\u0441\u0430"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'email', onChange: this.onInputChange, id: 'email', name: 'EMAIL', className: 'form-control', value: this.state.email }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-notifications' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043D\u0430 \u0435\u043B\u0435\u043A\u0442\u043E\u0440\u043D\u043D\u0443 \u043F\u043E\u0448\u0442\u0443"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('label', { className: 'switch switch-primary' }, React.createElement('input', { type: 'checkbox', id: 'user-settings-notifications', name: 'user-settings-notifications' }), React.createElement('span', null))))), React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, "\u0417\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044E"))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', onChange: this.onInputChange, id: 'user-settings-password', name: 'NEW_PASSWORD', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-repassword' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', onChange: this.onInputChange, id: 'user-settings-repassword', name: 'NEW_PASSWORD_CONFIRM', className: 'form-control', placeholder: "...\u043F\u043E\u0432\u0442\u043E\u0440\u0456\u0442\u044C \u0440\u0430\u0437\u043E\u0447\u043E\u043A!" })))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"))), React.createElement('button', { type: 'button', onClick: this.saveUserData, className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043C\u0456\u043D\u0438"))))))))));
        }
    }]);

    return Sidebar_usersettings;
}(_main_component.Extends);

var Sidebar_usersettings_modal = exports.Sidebar_usersettings_modal = function (_Extends4) {
    _inherits(Sidebar_usersettings_modal, _Extends4);

    function Sidebar_usersettings_modal(props) {
        _classCallCheck(this, Sidebar_usersettings_modal);

        return _possibleConstructorReturn(this, (Sidebar_usersettings_modal.__proto__ || Object.getPrototypeOf(Sidebar_usersettings_modal)).call(this, props));
    }
    /*   render()
      {
        return ( <div id="Basket_items" className="modal fade" role="dialog">
                    <div className="modal-dialog">                     
                      <div className="modal-content">
                         <div className="modal-header">
                         </div>
                         <div className="modal-body">
                         </div>
                         <div className="modal-footer">
                         </div>
                     
                      </div>
                    </div>
                    
                    
                   </div> 
           
            
             
               )  
          
          
          
      }    */

    _createClass(Sidebar_usersettings_modal, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { id: 'modal-user-settings', className: 'modal fade', role: 'dialog' }, React.createElement('div', { className: 'modal-dialog' }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-header text-center' }, React.createElement('h2', { className: 'modal-title' }, React.createElement('i', { className: 'fa fa-pencil' }), React.createElement('font', null, React.createElement('font', null, " \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438")))), React.createElement('div', { className: 'modal-body' }, React.createElement('form', { action: 'index.html', method: 'post', enctype: 'multipart/form-data', className: 'form-horizontal form-bordered', onsubmit: 'return false;' }, React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label' }, React.createElement('font', null, React.createElement('font', null, "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('p', { className: 'form-control-static' }, React.createElement('font', null, React.createElement('font', null, '??????????'))))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-email' }, React.createElement('font', null, React.createElement('font', null, "\u0415\u043B. \u0430\u0434\u0440\u0435\u0441\u0430"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'email', id: 'user-settings-email', name: 'user-settings-email', className: 'form-control', value: 'admin@example.com' }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-notifications' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043D\u0430 \u0435\u043B\u0435\u043A\u0442\u043E\u0440\u043D\u043D\u0443 \u043F\u043E\u0448\u0442\u0443"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('label', { className: 'switch switch-primary' }, React.createElement('input', { type: 'checkbox', id: 'user-settings-notifications', name: 'user-settings-notifications', value: '1', checked: '' }), React.createElement('span', null))))), React.createElement('fieldset', null, React.createElement('legend', null, React.createElement('font', null, React.createElement('font', null, "\u0417\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044E"))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-password' }, React.createElement('font', null, React.createElement('font', null, "\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', id: 'user-settings-password', name: 'user-settings-password', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0412\u0430\u0448 \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C..." }))), React.createElement('div', { className: 'form-group' }, React.createElement('label', { className: 'col-md-4 control-label', 'for': 'user-settings-repassword' }, React.createElement('font', null, React.createElement('font', null, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"))), React.createElement('div', { className: 'col-md-8' }, React.createElement('input', { type: 'password', id: 'user-settings-repassword', name: 'user-settings-repassword', className: 'form-control', placeholder: "...\u043F\u043E\u0432\u0442\u043E\u0440\u0456\u0442\u044C \u0440\u0430\u0437\u043E\u0447\u043E\u043A!" })))), React.createElement('div', { className: 'form-group form-actions' }, React.createElement('div', { className: 'col-xs-12 text-right' }, React.createElement('button', { type: 'button', className: 'btn btn-sm btn-default', 'data-dismiss': 'modal' }, React.createElement('font', null, React.createElement('font', null, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"))), React.createElement('button', { type: 'submit', className: 'btn btn-sm btn-primary' }, React.createElement('font', null, React.createElement('font', null, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043C\u0456\u043D\u0438"))))))))));
        }
    }]);

    return Sidebar_usersettings_modal;
}(_main_component.Extends);

/***/ }),

/***/ "./app/start_page.js":
/*!***************************!*\
  !*** ./app/start_page.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Search_content_startpage = exports.Start_page = undefined;

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

var _carousel = __webpack_require__(/*! ./carousel.js */ "./app/carousel.js");

var _search_content_header = __webpack_require__(/*! ./search_content_header.js */ "./app/search_content_header.js");

var _search_content_v = __webpack_require__(/*! ./search_content_v2.js */ "./app/search_content_v2.js");

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

//import jQuery from './js/vendor/jquery-1.11.1.min.js';
//import jQuery from 'jquery';
//var $=require('jquery'); 
//var jQuery=require('jquery');
//window.jQuery=jQuery;
//window.$=jQuery;  

var unickKey = 1;

var $ = jQuery;

__webpack_require__(/*! bootstrap/dist/js/bootstrap.js */ "./node_modules/bootstrap/dist/js/bootstrap.js");
__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");

var Start_page = exports.Start_page = function (_Extends) {
    _inherits(Start_page, _Extends);

    function Start_page(props) {
        _classCallCheck(this, Start_page);

        return _possibleConstructorReturn(this, (Start_page.__proto__ || Object.getPrototypeOf(Start_page)).call(this, props));
    }

    _createClass(Start_page, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(Start_page.prototype.__proto__ || Object.getPrototypeOf(Start_page.prototype), 'componentDidMount', this).call(this);
            this.deActivateProgressBar();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _get(Start_page.prototype.__proto__ || Object.getPrototypeOf(Start_page.prototype), 'componentDidUpdate', this).call(this);
            this.deActivateProgressBar();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'row' }, React.createElement('div', { className: 'col-sm-7' }, React.createElement('div', { className: 'block' }, React.createElement(Search_content_startpage, null)), React.createElement('div', { className: 'block' }, React.createElement(_carousel.Carousel, { id: "carousel" + unickKey++, route: "/ws/carousel/banners" }))), React.createElement('div', { className: 'col-sm-5 hidden-xs' }, React.createElement('div', { className: 'block' }), React.createElement('div', { className: 'block' }, React.createElement('div', { className: 'block-title' }, React.createElement('h2', null, React.createElement('strong', null, "\u0412\u0438\u0433\u0456\u0434\u043D\u0456"), " \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u0457")), React.createElement(_carousel.Carousel, { id: "carousel" + unickKey++, route: "/ws/carousel/img" }))));
        }
    }]);

    return Start_page;
}(_main_component.Extends);

var Search_content_startpage = exports.Search_content_startpage = function (_Search_content_heade) {
    _inherits(Search_content_startpage, _Search_content_heade);

    function Search_content_startpage(props) {
        _classCallCheck(this, Search_content_startpage);

        return _possibleConstructorReturn(this, (Search_content_startpage.__proto__ || Object.getPrototypeOf(Search_content_startpage)).call(this, props));
    }

    _createClass(Search_content_startpage, [{
        key: 'onclick',
        value: function onclick(e) {
            var getWorkSearch = function getWorkSearch() {
                this.state.searchTableComponent = window.objectReg['Search_table_v2'];
                this.onclick(e);
            };
            var getWorkSearch = getWorkSearch.bind(this);
            if (!window.objectReg['Search_table_v2']) {
                getWorkPage().setState({ renderIN: React.createElement(_search_content_v.Search_table_v2), defineRoutes: false }, getWorkSearch);
            } else {
                this.state.searchTableComponent = window.objectReg['Search_table_v2'];
                _get(Search_content_startpage.prototype.__proto__ || Object.getPrototypeOf(Search_content_startpage.prototype), 'onclick', this).call(this, e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            //this.state.searchTableComponent=window.getWorkPage();
            return React.createElement('div', { className: 'block' }, React.createElement('h2', { className: 'text-center' }, React.createElement('strong', null, "\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0456 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D\u0438?")), React.createElement('hr', null), React.createElement('h4', { className: 'text-center' }, "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E\u0457 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D\u0438!"), React.createElement('div', { className: 'input-group text-center', style: { width: "50%", marginLeft: "25%" } }, React.createElement('input', { id: 'example-input1-group2', onChange: this.onchange, value: this.state.itemCode == undefined ? "" : this.state.itemCode, name: 'example-input1-group2', className: 'form-control', placeholder: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D\u0438", type: 'text' }), React.createElement('span', { className: 'input-group-btn' }, React.createElement('a', { href: '#' }, React.createElement('button', { type: 'button', onClick: this.onclick, className: 'btn btn-primary' }, React.createElement('i', { className: 'fa fa-search' }), " \u041F\u043E\u0448\u0443\u043A")))), React.createElement('hr', null), React.createElement('h4', { className: 'text-center' }, "\u0410\u0431\u043E \u043F\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044C \u0443 \u043A\u0430\u0442\u0430\u043B\u043E\u0433!"), React.createElement('div', { className: 'input-group text-center', style: { width: "50%", marginLeft: "25%", marginBottom: "1em" } }, React.createElement('span', { className: 'input-group-btn' }, React.createElement(_reactRouterDom.Link, { to: "/catalogs" }, React.createElement('button', { type: 'button', className: 'btn btn-primary' }, " \u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0430\u0432\u0442\u043E\u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D ")))));
        }
    }]);

    return Search_content_startpage;
}(_search_content_header.Search_content_header);

/***/ })

}]);
//# sourceMappingURL=1.1.js.map