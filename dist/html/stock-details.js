'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    var StockDetails = (function () {
        function StockDetails() {
            _classCallCheck(this, StockDetails);
        }

        // Register the element using Polymer's constructor.

        _createClass(StockDetails, [{
            key: 'beforeRegister',

            // Element setup goes in beforeRegister instead of createdCallback.
            value: function beforeRegister() {
                this.is = 'stock-details';

                // Define the properties object in beforeRegister.
                this.properties = {
                    quote: {
                        type: Object,
                        notify: true,
                        observer: '_updateQuote'
                    }
                };
            }
        }, {
            key: 'status',
            value: function status(change) {
                if (change) {
                    return parseFloat(change) >= 0 ? 'up' : 'down';
                }
                return '';
            }
        }]);

        return StockDetails;
    })();

    Polymer(StockDetails);
})();