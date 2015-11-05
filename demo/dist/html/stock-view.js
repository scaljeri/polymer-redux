'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var series = undefined;

    var StockView = (function () {
        function StockView() {
            _classCallCheck(this, StockView);
        }

        _createClass(StockView, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'stock-view';

                this.properties = {
                    filter: {
                        type: Object,
                        notify: true
                    },
                    quote: {
                        type: Object,
                        notify: true
                    }
                };
            }
        }]);

        return StockView;
    })();

    Polymer(StockView);
})();