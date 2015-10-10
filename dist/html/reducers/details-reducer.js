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
                this.is = 'stock-details-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                switch (action) {
                    case 'QUOTE_CHANGE':
                        state.stock.quote = data.quote;
                    //return Object.assign({}, state, {details: data});
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['QUOTE_CHANGE'];
            }
        }]);

        return StockNameReducer;
    })();

    Polymer(StockNameReducer);
})();