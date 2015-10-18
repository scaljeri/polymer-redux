'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var DATE_RE = /^(\w{3}.*?\s\d{4})\s/,
        TIME_RE = /(\d\d:\d\d:\d\d)/;

    var RandomTicker = (function () {
        function RandomTicker() {
            _classCallCheck(this, RandomTicker);
        }

        _createClass(RandomTicker, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'random-ticker';

                this.properties = {
                    filter: {
                        notify: true,
                        observer: 'updateFilter',
                        type: Object
                    },
                    quote: {
                        notify: true,
                        type: Object
                    }
                };
            }
        }, {
            key: 'getQuote',
            value: function getQuote() {
                // Create new Quote object
                return Object.assign({
                    LastTradePriceOnly: 10,
                    Change: 0,
                    Volume: 0,
                    DaysHigh: 10,
                    DaysLow: 10
                }, this.quote || {});
            }
        }, {
            key: 'generatePriceIncr',
            value: function generatePriceIncr() {
                return Math.random() * 2 - .9; // Note that our random stock increases over time :)
            }
        }, {
            key: 'updateFilter',
            value: function updateFilter(newFilter, oldFilter) {
                this.changeInterval = true;
            }
        }, {
            key: 'start',
            value: function start() {
                var _this = this;

                if (!this.timer) {
                    this.timer = setInterval(function () {
                        var quote = _this.getQuote();

                        quote.LastTradePriceOnly = (parseFloat(quote.LastTradePriceOnly) + _this.generatePriceIncr()).toFixed(2);
                        quote.Change = (quote.LastTradePriceOnly >= 10 ? '+' : '') + (quote.LastTradePriceOnly - 10).toFixed(2);
                        quote.DaysHigh = Math.max(quote.DaysHigh, quote.LastTradePriceOnly);
                        quote.DaysLow = Math.min(quote.DaysLow, quote.LastTradePriceOnly);
                        quote.LastTradeDate = new Date().toString().match(DATE_RE)[1];
                        quote.LastTradeTime = new Date().toString().match(TIME_RE)[1];
                        quote.PercentChange = Math.round((quote.LastTradePriceOnly / 10 - 1) * 10000) / 100 + '%', quote.Volume++;

                        _this.$.store.dispatch(_this.$.store.actions.QUOTE_CHANGE, { quote: quote });

                        if (_this.changeInterval) {
                            _this.changeInterval = false;
                            _this.restart();
                        }
                    }, this.filter.interval);
                }
            }
        }, {
            key: 'stop',
            value: function stop() {
                clearTimeout(this.timer);
                this.timer = null;

                return this;
            }
        }, {
            key: 'restart',
            value: function restart() {
                this.stop().start();
            }
        }]);

        return RandomTicker;
    })();

    Polymer(RandomTicker);
})();