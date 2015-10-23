'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var StockGraphFilter = (function () {
        function StockGraphFilter() {
            _classCallCheck(this, StockGraphFilter);
        }

        _createClass(StockGraphFilter, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-graph-filter';

                this.properties = {
                    filter: {
                        type: Object,
                        notify: true
                    }
                };
            }
        }, {
            key: '_onChangeInput',
            value: function _onChangeInput(event) {
                this.$.store.dispatch('FILTER_INTERVAL_CHANGE', { interval: parseInt(event.target.value) });
            }
        }, {
            key: '_onChangeSlider',
            value: function _onChangeSlider(event) {
                this.$.store.dispatch('FILTER_SAMPLES_CHANGE', { samples: parseInt(event.target.value) });
            }
        }]);

        return StockGraphFilter;
    })();

    Polymer(StockGraphFilter);
})();