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
                    symbol: {
                        type: String,
                        notify: true,
                        observer: 'handleUpdateSymbol'
                    }
                };
            }
        }, {
            key: 'handleUpdateSymbol',
            value: function handleUpdateSymbol() {
                this.localSymbol = this.symbol;
            }
        }, {
            key: 'handleSymbolChange',
            value: function handleSymbolChange() {
                var store = this.$.store,
                    symbol = this.$['stock-name'].value;

                store.dispatch(store.actions.FILTER_SYMBOL_CHANGE, { symbol: symbol });
            }
        }]);

        return StockSearch;
    })();

    Polymer(StockSearch);
})();