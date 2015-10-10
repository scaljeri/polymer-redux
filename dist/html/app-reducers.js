'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    /* Define reducer function */
    function changeStock(state, name) {
        state.stock = name;
    }

    var AppReducer = (function () {
        function AppReducer() {
            _classCallCheck(this, AppReducer);
        }

        _createClass(AppReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-reducer';

                this.properties = {
                    reducers: {
                        type: Object,
                        notify: true,
                        readOnly: true,
                        value: STATE
                    }
                };
            }
        }, {
            key: '_updateReducers',
            value: function _updateReducers(a, b, c) {
                debugger;
            }
        }, {
            key: 'ready',
            value: function ready() {
                STATE.stock = 'google';
            }
        }, {
            key: 'dispatch',
            value: function dispatch(action) {
                REDUCERS.forEach(function (reducer) {
                    reducer.transform(STATE, action);
                });
            }
        }, {
            key: 'getState',
            value: function getState() {
                return STATE;
            }
        }, {
            key: 'handleClick',
            value: function handleClick() {
                console.log("update stock");
                this._setState({ stock: 'xyz' });
            }
        }]);

        return AppReducer;
    })();

    Polymer(AppStore);
})();