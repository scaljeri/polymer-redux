'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var GraphReducer = (function () {
        function GraphReducer() {
            _classCallCheck(this, GraphReducer);
        }

        _createClass(GraphReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'graph-reducer';

                this.properties = {
                    points: {
                        type: Number,
                        notify: true
                    }
                };
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                var filter = undefined;

                switch (action) {
                    case 'ADD_DATA_ITEM':
                        // TODO ??? NOTE that data array is still the same
                        var items = Object.assign([], state.data || []);
                        items.push(data.item);

                        if (items.length === state.filter.samples) {
                            items.shift();
                        }

                        return Object.assign({}, state, { data: items });
                    case 'FILTER_SYMBOL_CHANGE':
                        filter = Object.assign({}, state.filter, { symbol: data.symbol });
                        return Object.assign({}, state, { filter: filter }, { data: [] });
                    //return Object.assign({}, state, {quote: data});
                    case 'FILTER_INTERVAL_CHANGE':
                        filter = Object.assign({}, state.filter, { interval: data.interval });
                        return Object.assign({}, state, { filter: filter });
                    case 'FILTER_SAMPLES_CHANGE':
                        var length = state.data.length,
                            dataSamples = state.data;

                        if (length > data.samples) {
                            dataSamples = state.data.slice(length - data.samples);
                        }

                        filter = Object.assign({}, state.filter, { samples: Math.min(100, data.samples) });
                        return Object.assign({}, state, { filter: filter }, { data: dataSamples });
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['ADD_DATA_ITEM', 'FILTER_SYMBOL_CHANGE', 'FILTER_INTERVAL_CHANGE', 'FILTER_SAMPLES_CHANGE'];
            }
        }]);

        return GraphReducer;
    })();

    Polymer(GraphReducer);
})();