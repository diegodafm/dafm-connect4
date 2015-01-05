(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('pageTitle', function($rootScope, $timeout) {
            return {
                link: function(scope, element) {
                    /*jshint unused:false */
                    var listener = function(event, toState, toParams, fromState, fromParams) {
                        // Default title - load on Dashboard 1
                        var title = 'connect4 | ';
                        // Create your own title pattern
                        if (toState.data && toState.data.pageTitle) {
                            title = 'connect4 | ' + toState.data.pageTitle;
                        }

                        $timeout(function() {
                            element.text(title);
                        });
                    };
                    $rootScope.$on('$stateChangeStart', listener);
                }
            };
        });

})();
