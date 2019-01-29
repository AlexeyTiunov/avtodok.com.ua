(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

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

/***/ })

}]);
//# sourceMappingURL=16.16.js.map