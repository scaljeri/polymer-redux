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
            }
        }, {
            key: 'transform',
            value: function transform(state, action, input) {
                var filter = undefined,
                    data = undefined;

                switch (action) {
                    case 'ADD_DATA_ITEM':
                        data = Object.assign([], state.data || []);

                        if (data.push(input.item) === state.filter.samples) {
                            data.shift();
                        }

                        return Object.assign({}, state, { data: data });
                    case 'FILTER_SYMBOL_CHANGE':
                        filter = Object.assign({}, state.filter, { symbol: input.symbol });

                        return Object.assign({}, state, { filter: filter }, { data: [] });
                    case 'FILTER_INTERVAL_CHANGE':
                        filter = Object.assign({}, state.filter, { interval: input.interval });

                        return Object.assign({}, state, { filter: filter });
                    case 'FILTER_SAMPLES_CHANGE':
                        var samples = Math.min(100, input.samples);
                        data = state.data;

                        if (data.length > samples) {
                            data = data.slice(length - samples);
                        }

                        //filter = Object.assign({}, state.filter, {samples});
                        filter.samples = samples;
                        return Object.assign({}, state, { filter: filter }, { data: data });
                    default:
                        return state;
                }
            }
        }]);

        return GraphReducer;
    })();

    Polymer(GraphReducer);
})();