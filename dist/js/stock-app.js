'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _reducers = require('reducers');

var reducers = _interopRequireWildcard(_reducers);

var StockAppX = (function () {
    function StockAppX() {
        _classCallCheck(this, StockAppX);
    }

    // Register the element using Polymer's constructor.

    _createClass(StockAppX, [{
        key: 'beforeRegister',

        // Element setup goes in beforeRegister instead of createdCallback.
        value: function beforeRegister() {
            this.is = 'stock-appX';

            // Define other lifecycle methods as you need.
        }
    }, {
        key: 'ready',
        value: function ready() {
            console.dir(reducers);
        }
    }, {
        key: 'attached',
        value: function attached() {}
    }, {
        key: 'detached',
        value: function detached() {}
    }, {
        key: 'attributeChanged',
        value: function attributeChanged() {}
    }, {
        key: '_updateQuotes',
        value: function _updateQuotes() {
            // Same as the vanilla component.
        }
    }]);

    return StockAppX;
})();

Polymer(StockAppX);
//# sourceMappingURL=stock-app.js.map
