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
        }, {
            key: '_onChangeInput',
            value: function _onChangeInput(event) {
                this.interval = parseInt(event.target.value);

                if (!this.tickersymbol || this.tickersymbol === 'random') {
                    this.randomGen();
                }
            }
        }, {
            key: '_onChangeSlider',
            value: function _onChangeSlider(event) {
                this.maxPoints = parseInt(event.target.value);

                // recalculate graph
            }

            // Define other lifecycle methods as you need.
        }, {
            key: 'ready',
            value: function ready() {
                var self = this;
                this.dataCount = 0;
                this.interval = 1000;
                this.dataPoints = {};
                this.maxPoints = 20;

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                this.chart = $(this.$.highcharts).highcharts({
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg,
                        height: 300,
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

                    if (!this.data[this.tickersymbol]) {
                        data[this.tickersymbol] = [];
                    }
                    this.data[this.tickersymbol].push([x, y], true, this.dataCount > this.maxPoints);

                    this.stockName = this.quote.Name;
                    if (this.stockName) {
                        $(this.$.highcharts).highcharts().setTitle({ text: 'Live data from ' + this.stockName });
                        this.series.addPoint([x, y], true, ++this.dataCount > 20);
                    }
                }
            }
        }, {
            key: '_updateTickerSymbol',
            value: function _updateTickerSymbol() {
                this.series.setData([]);
                this.dataCount = 0;

                if (this.tickersymbol === 'random') {
                    $(this.$.highcharts).highcharts().setTitle({ text: 'Random data' });
                    this.$.ticker.stop();
                    this.randomGen();
                } else if (this.tickersymbol) {
                    clearInterval(this.timer);
                    this.$.ticker.start();
                }
            }
        }, {
            key: 'randomGen',
            value: function randomGen() {
                var _this = this;

                if (this.timer) {
                    clearInterval(this.timer);
                }

                this.timer = setInterval(function () {
                    var x = new Date().getTime(),
                        // current time
                    y = Math.random();

                    _this.series.addPoint([x, y], true, _this.dataCount++ > 20);
                }, this.interval);
            }
        }]);

        return StockView;
    })();

    Polymer(StockView);
})();