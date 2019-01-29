(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

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

/***/ })

}]);
//# sourceMappingURL=18.18.js.map