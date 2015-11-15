'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var StockApp = (function () {
        function StockApp() {
            _classCallCheck(this, StockApp);
        }

        // Register the element using Polymer's constructor.

        _createClass(StockApp, [{
            key: 'beforeRegister',

            // Element setup goes in beforeRegister instead of createdCallback.
            value: function beforeRegister() {
                this.is = 'stock-app';

                // Define the properties object in beforeRegister.
                this.properties = {
                    reducer: {
                        notify: true,
                        readonly: true,
                        type: Object
                    },
                    state: {
                        notify: true,
                        readonly: true,
                        type: Object
                    }
                };
            }
        }, {
            key: 'saveState',
            value: function saveState() {
                this.$.storage.saveState();
            }
        }, {
            key: 'resetState',
            value: function resetState() {
                this.$.storage.resetState();
            }
        }, {
            key: 'handleReady',
            value: function handleReady() {
                this.$.urlSymbol.activate();
            }
        }, {
            key: 'ready',
            value: function ready() {
                this.set('state', this.$.store.state);
                this.set('reducer', this.$.reducer);
            }
        }]);

        return StockApp;
    })();

    Polymer(StockApp);
})();