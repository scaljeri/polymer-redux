'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var StateReducer = (function () {
        function StateReducer() {
            _classCallCheck(this, StateReducer);
        }

        _createClass(StateReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'state-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, input) {
                var page = undefined;

                switch (action) {
                    case 'INITIALIZE_STATE':
                        if (input.state.filter && !input.state.filter.queryString) {
                            state.filter.queryString = input.state.filter.symbol;
                        }

                        return Object.assign({}, state, {
                            data: Object.assign([], input.state.data),
                            filter: Object.assign({}, state.filter, input.state.filter),
                            symbols: Object.assign([], state.symbols),
                            quote: Object.assign({}, input.state.quote)
                        });
                    case 'UPDATE_PAGEHITS':
                        page = Object.assign({}, state.page, { hit: input.hit });

                        return Object.assign({}, state, { page: page });
                    case 'UPDATE_SYMBOLS':
                        var symbols = input.symbols.map(function (symbol) {
                            return symbol.code + ' - ' + symbol.name;
                        });

                        return Object.assign({}, state, { symbols: symbols });
                    default:
                        return state;
                }
            }
        }]);

        return StateReducer;
    })();

    Polymer(StateReducer);
})();