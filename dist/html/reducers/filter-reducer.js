'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var FilterReducer = (function () {
        function FilterReducer() {
            _classCallCheck(this, FilterReducer);
        }

        _createClass(FilterReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'filter-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                var filter = undefined;

                switch (action) {
                    case 'FILTER_SYMBOL_CHANGE':
                        filter = Object.assign({}, state.filter, { symbol: data.symbol });
                        return Object.assign({}, state, { filter: filter });
                    //return Object.assign({}, state, {quote: data});
                    case 'FILTER_INTERVAL_CHANGE':
                        filter = Object.assign({}, state.filter, { interval: data.interval });
                        return Object.assign({}, state, { filter: filter });
                    case 'FILTER_POINTS_CHANGE':
                        filter = Object.assign({}, state.filter, { points: data.points });
                        return Object.assign({}, state, { filter: filter });
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['FILTER_SYMBOL_CHANGE', 'FILTER_INTERVAL_CHANGE', 'FILTER_POINTS_CHANGE'];
            }
        }]);

        return FilterReducer;
    })();

    Polymer(FilterReducer);
})();