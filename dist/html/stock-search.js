'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var StockSearch = (function () {
        function StockSearch() {
            _classCallCheck(this, StockSearch);
        }

        _createClass(StockSearch, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-search';

                this.properties = {
                    tickersymbol: {
                        type: String,
                        notify: true

                    }
                };
            }
        }, {
            key: 'handleStockChange',
            value: function handleStockChange() {
                var store = this.$.store;

                store.dispatch(store.actions.TICKER_SYMBOL_CHANGE, { tickerSymbol: this.$['stock-name'].value });
            }
        }]);

        return StockSearch;
    })();

    Polymer(StockSearch);
})();