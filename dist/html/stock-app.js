'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var StockApp = (function () {
        function StockApp() {
            _classCallCheck(this, StockApp);
        }

        // Register the element using Polymer's constructor.

        _createClass(StockApp, [{
            key: 'beforeRegister',

            // Element setup goes in beforeRegister instead of createdCallback.
            value: function beforeRegister() {
                this.is = 'stock-app';

                // Define the properties object in beforeRegister.
                this.properties = {
                    state: {
                        type: Object,
                        notify: true
                    },
                    reducer: {
                        type: Object,
                        notify: true
                    },
                    stats: {
                        type: Object,
                        observer: '_handleFirebase',
                        notify: true
                    }
                };
            }
        }, {
            key: '_handleFirebase',
            value: function _handleFirebase(stats) {
                var _this = this;

                if (this.count === undefined && this.stats) {
                    this.count = this.stats.count + 1;

                    setTimeout(function () {
                        _this.stats = { count: _this.count };
                    }, 500);
                }
            }
        }, {
            key: 'ready',
            value: function ready() {
                this.state = this.$.store.state;
                this.reducer = this.$.reducer;

                //this.$.store.dispatch(this.$.store.actions.TICKER_SYMBOL_CHANGE, {tickerSymbol: 'goog'});
            }
        }]);

        return StockApp;
    })();

    Polymer(StockApp);
})();