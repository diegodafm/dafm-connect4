/**
 * Created by Diego Alisson on 5/7/14.
 */
(function() {
    angular.module('connect4')
        .factory('SessionControll', function() {
            return {

                get: function(key) {
                    return window.sessionStorage.getItem(key);
                },

                set: function(key, val) {
                    return window.sessionStorage.setItem(key, val);
                },

                unset: function(key) {
                    return window.sessionStorage.removeItem(key);
                }
            };
        });
}());
