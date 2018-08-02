var ReactDOM = require('react-dom');
var React = require('react');

 import 'bootstrap/dist/js/bootstrap.bundle.js'
  import 'bootstrap/dist/css/bootstrap.css';

 
const propsValues = {
    title: "Список смартфонов",
    items: [
        "HTC U Ultra", 
        "iPhone 7", 
        "Google Pixel", 
        "Huawei P9", 
        "Meizu Pro 6", 
        "Asus Zenfone 3"
    ]
};
 
ReactDOM.render(
    <ItemsList data={propsValues} />,
    document.getElementById("app")
)