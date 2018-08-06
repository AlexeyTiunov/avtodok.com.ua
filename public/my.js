'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDOM = require('react-dom');
var React = require('react');
var Li = require("./sidebar_li.js");
debugger;

/*
    props.items;
*/
var items = exports.items = [{ name: "Головна", href: "#", className: "", inner: null }, { name: "Особистий кабіне", href: "#", className: "sidebar-nav-menu",
    inner: [{ name: "Замовлення", href: "cabinet_orders.html", className: "", inner: null }, { name: "Баланс", href: "cabinet_cash.html", className: "", inner: null }, { name: "Історія позицій", href: "cabinet_cash.html", className: "", inner: null }, { name: "Декларації", href: "cabinet_history.html", className: "", inner: null }, { name: "Повернення", href: "cabinet_np.html", className: "", inner: null }, { name: "Головна", href: "cabinet_return.html", className: "", inner: null }, { name: "Готовий до видачі", href: "cabinet_to_delivery.html", className: "", inner: null }]
}, { name: "Каталоги", href: "#", className: "", inner: null }, { name: "Каталог автозапчастин", href: "#", className: "", inner: null }, { name: "Каталог аксесуарів", href: "#", className: "", inner: null }, { name: "Корисне", href: null, className: "", inner: null }, { name: "Про нас", href: "", className: "", inner: null }];

var Sidebar_nav = exports.Sidebar_nav = function (_React$Component) {
    _inherits(Sidebar_nav, _React$Component);

    function Sidebar_nav(props) {
        _classCallCheck(this, Sidebar_nav);

        var _this = _possibleConstructorReturn(this, (Sidebar_nav.__proto__ || Object.getPrototypeOf(Sidebar_nav)).call(this, props));

        _this.state = { items: _this.props.items };

        return _this;
    }

    _createClass(Sidebar_nav, [{
        key: 'render',
        value: function render() {
            debugger;

            var b = this.state.items.map(function (item) {
                if (item.hasOwnProperty("href") && item.href != null) {
                    if (item.inner instanceof Array) {

                        var gg = item.inner.map(function (item_inner) {

                            return item_inner;
                        });

                        var c = React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: item.href, className: item.className },
                                React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }),
                                React.createElement(
                                    'font',
                                    null,
                                    React.createElement(
                                        'font',
                                        null,
                                        item.name
                                    )
                                )
                            ),
                            React.createElement('ul', null)
                        );
                        return c;
                    }
                } else {
                    var f = React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { className: item.className },
                            React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }),
                            React.createElement(
                                'font',
                                null,
                                React.createElement(
                                    'font',
                                    null,
                                    item.name
                                )
                            )
                        )
                    );
                    return f;
                }
            });

            var text =

            //for (var item in this.state.items)

            this.state.items.map(function (item) {
                if (item.hasOwnProperty("href") && item.href != null) {
                    var ff = false;
                    if (item.inner instanceof Array && ff == true) {
                        return React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: item.href, className: item.className },
                                React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }),
                                React.createElement(
                                    'font',
                                    null,
                                    React.createElement(
                                        'font',
                                        null,
                                        item.name
                                    )
                                )
                            ),
                            React.createElement(
                                'ul',
                                null,
                                item.inner.map(function (item_iner) {
                                    return React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'a',
                                            { href: item_iner.href, className: item_iner.className },
                                            React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }),
                                            React.createElement(
                                                'font',
                                                null,
                                                React.createElement(
                                                    'font',
                                                    null,
                                                    item_iner.name
                                                )
                                            )
                                        )
                                    );
                                })
                            )
                        );
                    } else {

                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { className: item.className },
                                React.createElement('i', { className: 'gi gi-home sidebar-nav-icon' }),
                                React.createElement(
                                    'font',
                                    null,
                                    React.createElement(
                                        'font',
                                        null,
                                        item.name
                                    )
                                )
                            )
                        );
                    }
                } else {}
            });
            return React.createElement(
                'ul',
                { className: 'sidebar-nav' },
                ' ',
                b,
                ' '
            );
        }
    }]);

    return Sidebar_nav;
}(React.Component);
//module.exports = Sidebar_nav;
