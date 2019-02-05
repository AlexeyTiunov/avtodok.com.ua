(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/sidebar_userinfo.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/babel-loader/lib??ref--5!./app/sidebar_userinfo.js ***!
  \*****************************************************************************************************************/
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

/***/ })

}]);
//# sourceMappingURL=3.3.js.map