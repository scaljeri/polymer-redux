'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var actions = [],
    reducers = [];

(function () {
    var AppReducer = (function () {
        function AppReducer() {
            _classCallCheck(this, AppReducer);
        }

        _createClass(AppReducer, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'app-reducer';
            }
        }, {
            key: 'ready',
            value: function ready() {
                // Note that `this.children` is a NodeList (host object) not an Array
                for (var i = 0; i < this.children.length; i++) {
                    actions.push.apply(actions, _toConsumableArray(this.children[i].actions));
                    reducers.push(this.children[i]);
                };
            }
        }, {
            key: 'transform',
            value: function transform(state, action, data) {
                reducers.forEach(function (reducer) {
                    state = reducer.transform(state, action, data);
                });

                return state;
            }
        }, {
            key: 'actions',
            get: function get() {
                return actions;
            }
        }]);

        return AppReducer;
    })();

    Polymer(AppReducer);
})();