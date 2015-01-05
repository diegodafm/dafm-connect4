(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('countUp', function() {
            return {
                restrict: 'A',
                scope: {
                    value: '@',
                    prefix: '@',
                    suffix: '@'
                },
                link: function(scope, elem) {

                    var options = {  
                        useEasing: true,
                          useGrouping: true,
                          separator: '.',
                          decimal: ',',
                          prefix: scope.prefix || '',
                          suffix: scope.suffix || ''
                    };

                    scope.$watch('value', function(newVal) {
                        var count = new countUp(elem, 0, parseFloat(newVal), 2, 2, options);
                        count.start();
                    });
                }
            };
        });

})();
