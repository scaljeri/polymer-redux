'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var StockGraph = (function () {
        function StockGraph() {
            _classCallCheck(this, StockGraph);
        }

        _createClass(StockGraph, [{
            key: 'beforeRegister',

            // Element setup goes in beforeRegister instead of createdCallback.
            value: function beforeRegister() {
                this.is = 'stock-graph';

                // Define the properties object in beforeRegister.
                this.properties = {
                    quote: {
                        type: Object,
                        notify: true
                    },
                    data: {
                        type: Array,
                        notify: true,
                        observer: 'updateData'
                    },
                    samples: {
                        type: Number,
                        notify: true,
                        observer: 'updateSamples'
                    }
                };
            }
        }, {
            key: 'ready',
            value: function ready() {
                var self = this;
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
                        text: this.createGraphTitle()
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
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Quote data',
                        data: []
                    }]
                });
            }
        }, {
            key: 'updateSamples',
            value: function updateSamples() {
                if (this.series.data.length > this.samples) {
                    this.series.setData(this.data);
                }
            }
        }, {
            key: 'updateData',
            value: function updateData() {
                if (this.data && this.quote) {
                    if (this.symbol !== this.quote.Symbol) {
                        this.symbol = this.quote.Symbol;
                        return this.series.setData(this.data);
                    }

                    var numberOfItems = this.data.length,
                        lastItem = this.data[numberOfItems - 1];

                    this.createGraphTitle();
                    this.series.addPoint(lastItem, true, this.series.data.length >= this.samples);
                }
            }
        }, {
            key: 'createGraphTitle',
            value: function createGraphTitle() {
                var highcharts = $(this.$.highcharts).highcharts(),
                    title = 'No data available';

                if (this.quote) {
                    title = 'Live data from ' + this.quote.Name;
                }

                if (highcharts) {
                    highcharts.setTitle({ text: title });
                }

                return title;
            }
        }]);

        return StockGraph;
    })();

    Polymer(StockGraph);
})();