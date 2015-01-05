/**
 * Created by Diego Alisson on 12/14/14.
 */
(function() {
    angular.module('connect4')
        .config(['$httpProvider', function($httpProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]);
}());
