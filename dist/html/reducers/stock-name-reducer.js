'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var StockNameReducer = (function () {
        function StockNameReducer() {
            _classCallCheck(this, StockNameReducer);
        }

        _createClass(StockNameReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-name-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                switch (action) {
                    case 'STOCK_NAME_CHANGE':
                        return Object.assign({}, state, { stockName: data });
                    case 'STOCK_NAME_UPPER':
                        return Object.assign({}, state, { stockName: state.stockName.toUpperCase() });
                    case 'STOCK_NAME_LOWER':
                        return Object.assign({}, state, { stockName: state.stockName.toLowerCase() });
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['STOCK_NAME_CHANGE', 'STOCK_NAME_UPPER', 'STOCK_NAME_LOWER'];
            }
        }]);

        return StockNameReducer;
    })();

    Polymer(StockNameReducer);
})();