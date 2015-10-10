'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var series = undefined;

    var StockView = (function () {
        function StockView() {
            _classCallCheck(this, StockView);
        }

        // Register the element using Polymer's constructor.

        _createClass(StockView, [{
            key: 'beforeRegister',

            // Element setup goes in beforeRegister instead of createdCallback.
            value: function beforeRegister() {
                this.is = 'stock-view';

                // Define the properties object in beforeRegister.
                this.properties = {
                    tickersymbol: {
                        type: String,
                        notify: true,
                        observer: '_updateTickerSymbol'
                    },
                    quote: {
                        type: Object,
                        notify: true,
                        observer: '_updateQuote'
                    }
                };
            }

            // Define other lifecycle methods as you need.
        }, {
            key: 'ready',
            value: function ready() {
                var self = this;
                this.dataCount = 0;

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                this.chart = $(this.$.container).highcharts({
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        backgroundColor: 'transparent',
                        events: {
                            load: function load() {

                                // set up the updating of the chart each second
                                self.series = this.series[0];
                            }
                        }
                    },
                    title: {
                        text: 'Live ' + this.tickersymbol + ' data'
                    },
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 150
                    },
                    yAxis: {
                        title: {
                            text: 'Value'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        formatter: function formatter() {
                            return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Quote data',
                        data: []
                    }]
                });
            }
        }, {
            key: '_updateQuote',
            value: function _updateQuote(a, b) {
                if (this.quote) {
                    var x = new Date().getTime(),
                        // current time
                    y = parseFloat(this.quote.LastTradePriceOnly);

                    this.stockName = this.quote.Name;
                    if (this.stockName) {
                        $(this.$.container).highcharts().setTitle({ text: 'Live data from ' + this.stockName });
                        this.series.addPoint([x, y], true, ++this.dataCount > 20);
                    }
                }
            }
        }, {
            key: '_updateTickerSymbol',
            value: function _updateTickerSymbol() {
                var _this = this;

                this.series.setData([]);
                this.dataCount = 0;

                if (this.tickersymbol === 'random') {
                    $(this.$.container).highcharts().setTitle({ text: 'Random data' });
                    this.$.ticker.stop();
                    this.timer = setInterval(function () {
                        var x = new Date().getTime(),
                            // current time
                        y = Math.random();

                        _this.series.addPoint([x, y], true, _this.dataCount++ > 20);
                    }, 1000);
                } else if (this.tickersymbol) {
                    clearInterval(this.timer);
                    this.$.ticker.start();
                }
            }
        }]);

        return StockView;
    })();

    Polymer(StockView);
})();