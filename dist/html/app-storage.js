'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + (s4() + s4() + s4());
    }

    var AppStorage = (function () {
        function AppStorage() {
            _classCallCheck(this, AppStorage);
        }

        _createClass(AppStorage, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-storage';

                this.properties = {
                    state: {
                        notify: true,
                        type: Object
                    },
                    fbState: {
                        notify: true,
                        observer: 'updatedState',
                        type: Object
                    },
                    fbPage: {
                        notify: true,
                        observer: 'updatedPage',
                        type: Object
                    },
                    ls: {
                        notify: true,
                        observer: 'handleLs',
                        type: Object
                    },
                    symbols: {
                        notify: true,
                        type: Array
                    }
                };
            }
        }, {
            key: 'handleLs',
            value: function handleLs() {
                if (this.ls) {
                    this.set('location', 'https://polymer-redux.firebaseio.com/' + this.ls.guid);
                }
            }
        }, {
            key: 'initializeLocalStorage',
            value: function initializeLocalStorage() {
                this.set('ls', { guid: guid() });
            }
        }, {
            key: 'updatedPage',
            value: function updatedPage() {
                var _this = this;

                if (!this.pageHit) {
                    this.pageHit = this.fbPage.hits + 1;

                    setTimeout(function () {
                        _this.set('fbPage.hits', _this.pageHit);
                    }, 0);
                } else {
                    this.pageHit = this.fbPage.hits;
                }

                this.$.store.dispatch('UPDATE_PAGEHITS', { hit: this.pageHit });
            }
        }, {
            key: 'updatedState',
            value: function updatedState() {
                if (this.fbState && !this.state.quote) {
                    this.$.store.dispatch('INITIALIZE_STATE', { state: this.fbState });
                }
            }
        }, {
            key: 'saveState',
            value: function saveState() {
                this.set('fbState', this.state);
            }
        }, {
            key: 'resetState',
            value: function resetState() {
                this.set('fbState', { filter: {}, data: [], quote: {}, page: {} });
            }
        }]);

        return AppStorage;
    })();

    Polymer(AppStorage);
})();