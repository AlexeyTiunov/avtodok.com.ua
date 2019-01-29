(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/bundle-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/page_content_v1.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/bundle-loader??ref--4!./node_modules/babel-loader/lib??ref--5!./node_modules/babel-loader/lib??ref--6!./app/page_content_v1.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cbs = [], 
	data;
module.exports = function(cb) {
	if(cbs) cbs.push(cb);
	else cb(data);
}
Promise.resolve(/*! require.ensure */).then((function(require) {
	data = __webpack_require__(/*! !../node_modules/babel-loader/lib??ref--5!../node_modules/babel-loader/lib??ref--6!./page_content_v1.js */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./app/page_content_v1.js");
	var callbacks = cbs;
	cbs = null;
	for(var i = 0, l = callbacks.length; i < l; i++) {
		callbacks[i](data);
	}
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

/***/ })

}]);
//# sourceMappingURL=1.1.js.map