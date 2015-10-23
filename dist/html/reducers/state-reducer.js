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
                switch (action) {
                    case 'INITIALIZE_STATE':
                        return Object.assign({}, state, input.state);
                    case 'UPDATE_PAGEHITS':
                        var page = Object.assign({}, state.page, { hits: input.hits });

                        return Object.assign({}, state, { page: page });
                    default:
                        return state;
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return ['INITIALIZE_STATE'];
            }
        }]);

        return StateReducer;
    })();

    Polymer(StateReducer);
})();