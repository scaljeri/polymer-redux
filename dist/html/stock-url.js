'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var series = undefined;

    var StockUrl = (function () {
        function StockUrl() {
            _classCallCheck(this, StockUrl);
        }

        _createClass(StockUrl, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-url';

                this.properties = {
                    symbol: {
                        type: String,
                        notify: true,
                        observer: 'updateSymbol'
                    }
                };
            }
        }, {
            key: 'updateSymbol',
            value: function updateSymbol() {
                history.replaceState(null, this.symbol, '?q=' + this.symbol);
            }
        }, {
            key: 'ready',
            value: function ready() {
                var symbol = (location.search.match(/^\?q=(.*)$/) || [])[1];

                if (symbol) {
                    this.$.store.dispatch(this.$.store.actions.TICKER_SYMBOL_CHANGE, { symbol: symbol });
                }
            }
        }]);

        return StockUrl;
    })();

    Polymer(StockUrl);
})();