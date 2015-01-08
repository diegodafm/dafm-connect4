(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('winner', function() {
            return {
                restrict: 'AE',
                replace: 'true',
                templateUrl: '/src/views/partials/winner.html',

                link: function(scope) {
                    scope.$watch('winner', function(newValue, oldValue) {
                        console.log(newValue);
                        console.log(oldValue);
                    });
                }
            };
        });

})();
