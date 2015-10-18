'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    var AppHeader = (function () {
        function AppHeader() {
            _classCallCheck(this, AppHeader);
        }

        _createClass(AppHeader, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-header';

                this.properties = {
                    hits: {
                        type: Number,
                        notify: true
                    }
                };
            }
        }]);

        return AppHeader;
    })();

    Polymer(AppHeader);
})();