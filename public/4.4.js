(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/auth.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/babel-loader/lib??ref--6!./app/auth.js ***!
  \*****************************************************************************************************/
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

/***/ })

}]);
//# sourceMappingURL=4.4.js.map