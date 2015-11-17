'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var QuoteTransform = (function () {
        function QuoteTransform() {
            _classCallCheck(this, QuoteTransform);
        }

        _createClass(QuoteTransform, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'quote-transform';

                this.properties = {
                    quote: {
                        notify: true,
                        observer: 'updateQuote',
                        type: Object
                    }
                };
            }
        }, {
            key: 'updateQuote',
            value: function updateQuote() {
                if (this.quote && this.quote.LastTradePriceOnly !== undefined) {
                    var x = new Date(),
                        // current time
                    y = parseFloat(this.quote.LastTradePriceOnly);

                    // Yahoo quotes are delayed by 15 minutes
                    x.setSeconds(x.getSeconds() - 900);

                    this.$.store.dispatch('ADD_DATA_ITEM', { item: [x.getTime(), y] });
                }
            }
        }]);

        return QuoteTransform;
    })();

    Polymer(QuoteTransform);
})();