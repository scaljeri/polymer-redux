'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var series = undefined;

    var AppTicker = (function () {
        function AppTicker() {
            _classCallCheck(this, AppTicker);
        }

        _createClass(AppTicker, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-ticker';

                this.properties = {
                    filter: {
                        notify: true,
                        observer: 'updateFilter',
                        type: Object
                    },
                    quote: {
                        notify: true,
                        type: Object
                    }
                };
            }
        }, {
            key: 'updateFilter',
            value: function updateFilter() {
                if (this.filter.symbol && this.filter.interval) {
                    if (this.current) {
                        this.current.stop();
                    }

                    this.current = this.filter.symbol === 'polymer' ? this.$.polymer : this.$.yahoo;
                    this.current.start();
                }
            }
        }]);

        return AppTicker;
    })();

    Polymer(AppTicker);
})();