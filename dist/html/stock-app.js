'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

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
                    fbState: {
                        type: Object,
                        notify: true,
                        observer: 'updatedFbState'
                    },
                    fbStats: {
                        type: Object,
                        notify: true,
                        observer: 'updatedFbStats'
                    },
                    ls: {
                        type: Object,
                        notify: true,
                        observer: 'handleLs'
                    },
                    reducer: {
                        type: Object,
                        notify: true
                    },
                    state: {
                        type: Object,
                        notify: true
                    }
                };
            }
        }, {
            key: 'handleLs',
            value: function handleLs() {
                if (this.ls) {
                    this.fbLocation = 'https://polymer-redux.firebaseio.com/' + this.ls.guid;
                }
            }
        }, {
            key: 'initializeLocalStorage',
            value: function initializeLocalStorage() {
                this.ls = { guid: guid() };
            }
        }, {
            key: 'saveState',
            value: function saveState() {
                this.fbState = Object.assign({}, {
                    filter: this.state.filter,
                    quote: this.state.quote,
                    data: this.state.data
                });
            }
        }, {
            key: 'updatedFbStats',
            value: function updatedFbStats() {
                var _this = this;

                if (this.pageHits !== this.fbStats.hits) {
                    if (this.pageHits) {
                        this.pageHits = this.fbStats.hits;
                    } else {
                        this.pageHits = this.fbStats.hits + 1;

                        setTimeout(function () {
                            _this.fbStats = Object.assign({}, _this.fbStats, { hits: _this.pageHits });
                        }, 0);
                    }
                }
            }
        }, {
            key: 'updatedFbState',
            value: function updatedFbState() {
                this.$.store.dispatch(this.$.store.actions.INITIALIZE_STATE, {
                    filter: (this.fbState || {}).filter || this.state.filter,
                    quote: (this.fbState || {}).quote,
                    data: (this.fbState || {}).data });
            }
        }, {
            key: 'ready',
            value: function ready() {
                this.state = this.$.store.state;
                this.reducer = this.$.reducer;
            }
        }]);

        return StockApp;
    })();

    Polymer(StockApp);
})();