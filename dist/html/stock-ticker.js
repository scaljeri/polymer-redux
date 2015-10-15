'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var StockTicker = (function () {
        function StockTicker() {
            _classCallCheck(this, StockTicker);
        }

        // Register the element using Polymer's constructor.

        _createClass(StockTicker, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-ticker';

                this.properties = {
                    tickersymbol: {
                        type: String,
                        notify: true

                    },
                    interval: {
                        type: Number,
                        notify: true
                    }
                };
            }
        }, {
            key: 'getQuote',
            value: function getQuote() {
                var url, data, requestUrl, response;
                return regeneratorRuntime.async(function getQuote$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            url = 'http://query.yahooapis.com/v1/public/yql';
                            data = encodeURIComponent('select * from yahoo.finance.quotes where symbol in (\'' + this.tickersymbol + '\')');
                            requestUrl = url + '?q=' + data + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';
                            context$3$0.next = 5;
                            return regeneratorRuntime.awrap(fetch(requestUrl));

                        case 5:
                            response = context$3$0.sent;
                            return context$3$0.abrupt('return', response.text());

                        case 7:
                        case 'end':
                            return context$3$0.stop();
                    }
                }, null, this);
            }
        }, {
            key: '_runner',
            value: function _runner() {
                var _this = this;

                if (this.isRunning) {
                    console.log(this.interval);
                    this.timeoutId = setTimeout(function () {
                        if (_this.tickersymbol) {
                            _this.getQuote().then(function (response) {
                                var json = JSON.parse(response);
                                if (_this.isRunning) {
                                    _this.$.store.dispatch(_this.$.store.actions.QUOTE_CHANGE, { quote: json.query.results.quote });
                                }
                            });
                        }

                        if (_this.isRunning) {
                            _this._runner();
                        }
                    }, Math.max(1000, this.interval));
                }
            }
        }, {
            key: 'start',
            value: function start() {
                if (!this.isRunning) {
                    this.isRunning = true;
                    this._runner();
                }
            }
        }, {
            key: 'stop',
            value: function stop() {
                clearTimeout(this.timeoutId);
                this.isRunning = false;
            }
        }]);

        return StockTicker;
    })();

    Polymer(StockTicker);
})();