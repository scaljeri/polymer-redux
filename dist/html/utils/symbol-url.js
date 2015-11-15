'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var series = undefined;

    var SymbolUrl = (function () {
        function SymbolUrl() {
            _classCallCheck(this, SymbolUrl);
        }

        _createClass(SymbolUrl, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'symbol-url';
                this.isReady = false;

                this.properties = {
                    symbol: {
                        type: String,
                        notify: true,
                        observer: 'updateSymbol'
                    }
                };
            }
        }, {
            key: 'updateSymbol',
            value: function updateSymbol() {
                if (this.isActive && this.symbol) {
                    history.replaceState(null, this.symbol, '?q=' + this.symbol);
                }
            }
        }, {
            key: 'activate',
            value: function activate() {
                this.isActive = true;

                if (!this.symbol) {
                    var symbol = (location.search.match(/^\?q=(.*)$/) || [])[1];

                    if (symbol) {
                        this.$.store.dispatch('FILTER_SYMBOL_CHANGE', { symbol: symbol || 'polymer' });
                    }
                } else {
                    this.updateSymbol();
                }
            }
        }]);

        return SymbolUrl;
    })();

    Polymer(SymbolUrl);
})();