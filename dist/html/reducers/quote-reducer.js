'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var QuoteReducer = (function () {
        function QuoteReducer() {
            _classCallCheck(this, QuoteReducer);
        }

        _createClass(QuoteReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'quote-reducer';
            }
        }, {
            key: 'transform',
            value: function transform(state, action, input) {
                switch (action) {
                    case 'QUOTE_CHANGE':
                        return Object.assign({}, state, { quote: input.quote });
                    default:
                        return state;
                }
            }
        }]);

        return QuoteReducer;
    })();

    Polymer(QuoteReducer);
})();