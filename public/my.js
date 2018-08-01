'use strict';

require('bootstrap/dist/js/bootstrap.bundle.js');

require('bootstrap/dist/css/bootstrap.css');

var ReactDOM = require('react-dom');
var React = require('react');

var propsValues = {
    title: "Список смартфонов",
    items: ["HTC U Ultra", "iPhone 7", "Google Pixel", "Huawei P9", "Meizu Pro 6", "Asus Zenfone 3"]
};

ReactDOM.rende(React.createElement(ItemsList, { data: propsValues }), document.getElementById("app"));
