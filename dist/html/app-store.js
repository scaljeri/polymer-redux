'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var appActions = undefined,
        appReducer = undefined,
        appStore = undefined;

    var AppStore = (function () {
        function AppStore() {
            _classCallCheck(this, AppStore);
        }

        _createClass(AppStore, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-store';

                this.properties = {
                    state: {
                        type: Object,
                        notify: true,
                        readOnly: true,
                        value: { filter: { interval: 1000, points: 20 } }
                    },
                    reducer: {
                        type: Object,
                        notify: true,
                        readOnly: false,
                        observer: 'updateReducers'
                    }
                };
            }
        }, {
            key: 'updateReducers',
            value: function updateReducers(reducer) {
                if (reducer) {
                    appReducer = reducer;
                    // If anything changes, we only trigger at the top level
                    appStore = this;

                    appActions = appReducer.actions.reduce(function (actions, action) {
                        actions[action] = action;
                        return actions;
                    }, {});
                }
            }
        }, {
            key: 'dispatch',
            value: function dispatch(action, data) {
                if (action) {
                    appStore._setState(appReducer.transform(appStore.state, action, data));
                } else {
                    throw 'Cannot dispatch an undefined action';
                }
            }
        }, {
            key: 'actions',
            get: function get() {
                return appActions;
            }
        }, {
            key: 'state',
            get: function get() {
                return appStore.state;
            }
        }]);

        return AppStore;
    })();

    Polymer(AppStore);
})();