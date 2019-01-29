(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./app/sidebar_nav.js":
/*!****************************!*\
  !*** ./app/sidebar_nav.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cbs = [], 
	data;
module.exports = function(cb) {
	if(cbs) cbs.push(cb);
	else cb(data);
}
Promise.resolve(/*! require.ensure */).then((function(require) {
	data = __webpack_require__(/*! !../node_modules/babel-loader/lib??ref--5!../node_modules/babel-loader/lib??ref--6!./sidebar_nav.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/sidebar_nav.js");
	var callbacks = cbs;
	cbs = null;
	for(var i = 0, l = callbacks.length; i < l; i++) {
		callbacks[i](data);
	}
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

/***/ })

}]);
//# sourceMappingURL=0.0.js.map