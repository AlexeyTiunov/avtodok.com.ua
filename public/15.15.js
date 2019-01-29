(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

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

/***/ })

}]);
//# sourceMappingURL=15.15.js.map