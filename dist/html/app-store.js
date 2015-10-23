'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var appStore = undefined;

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
                        notify: true,
                        readOnly: true,
                        type: Object,
                        value: { filter: { interval: 1000, samples: 2 }, page: {} }
                    },
                    reducer: {
                        notify: true,
                        observer: 'updateReducer',
                        readOnly: false,
                        type: Object
                    }
                };
            }
        }, {
            key: 'updateReducer',
            value: function updateReducer(reducer) {
                if (reducer) {
                    appStore = this; // Only use one store
                }
            }
        }, {
            key: 'dispatch',
            value: function dispatch(action, data) {
                var newState = appStore.reducer.transform(appStore.state, action, data);

                if (newState === appStore.state) {
                    throw 'Unknown action: ' + action;
                }

                newState.page.updated = new Date();
                appStore._setState(newState);
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