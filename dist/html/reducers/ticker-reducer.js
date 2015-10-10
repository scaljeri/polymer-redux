'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var TickerReducer = (function () {
        function TickerReducer() {
            _classCallCheck(this, TickerReducer);
        }

        _createClass(TickerReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'ticker-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                switch (action) {
                    case 'TICKER_SYMBOL_CHANGE':
                        // TODO: Check if not the whole object should be replaced
                        //state.tickerSymbol = data.tickerSymbol;
                        return Object.assign({}, state, { tickerSymbol: data.tickerSymbol });
                    //return Object.assign({}, state, {quote: data});
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['TICKER_SYMBOL_CHANGE'];
            }
        }]);

        return TickerReducer;
    })();

    Polymer(TickerReducer);
})();