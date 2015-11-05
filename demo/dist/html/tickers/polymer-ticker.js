'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var DATE_RE = /^(\w{3}.*?\s\d{4})\s/,
        TIME_RE = /(\d\d:\d\d:\d\d)/;

    var PolymerTicker = (function () {
        function PolymerTicker() {
            _classCallCheck(this, PolymerTicker);
        }

        _createClass(PolymerTicker, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'polymer-ticker';

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
                return this.quote && this.quote.Symbol === 'polymer' && this.quote.LastTradePriceOnly ? this.quote : {
                    LastTradePriceOnly: 10,
                    Change: 0,
                    Volume: 0,
                    DaysHigh: 10,
                    DaysLow: 10,
                    YearHigh: 20.01,
                    YearLow: 5.32
                };
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
                        var quote = _this.getQuote(),
                            incr = _this.generatePriceIncr(),
                            price = parseFloat(quote.LastTradePriceOnly) + incr;

                        _this.$.store.dispatch('QUOTE_CHANGE', { quote: {
                                LastTradePriceOnly: price.toFixed(2),
                                Change: (price >= 10 ? '+' : '') + (price - 10).toFixed(2),
                                DaysHigh: Math.max(quote.DaysHigh, price).toFixed(2),
                                DaysLow: Math.min(quote.DaysLow, price).toFixed(2),
                                LastTradeDate: new Date().toString().match(DATE_RE)[1],
                                LastTradeTime: new Date().toString().match(TIME_RE)[1],
                                PercentChange: Math.round((price / 10 - 1) * 10000) / 100 + '%',
                                Volume: quote.Volume + 1,
                                Ask: (price - incr).toFixed(2),
                                Bid: (price + incr).toFixed(2),
                                YearHigh: Math.max(price, quote.YearHigh).toFixed(2),
                                YearLow: Math.min(price, quote.YearLow).toFixed(2),
                                Currency: '€',
                                Name: 'Polymer',
                                Symbol: 'polymer'
                            } });

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

        return PolymerTicker;
    })();

    Polymer(PolymerTicker);
})();