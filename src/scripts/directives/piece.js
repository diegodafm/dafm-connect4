(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('piece', function() {
            return {
                restrict: 'AE',
                replace: 'true',
                template: '<div class=\'piece\'></div>',
                scope: {
                    item: '@'
                },
                link: function(scope, el) {

                    /*
                                        scope.$observe('item', function(newVal) {
                                            console.log(newVal);
                                        });
                    */
                    var evalItem = scope.$eval(scope.item);

                    $(el).click(function() {
                        if (scope.$parent.checkAvailability(evalItem.line, evalItem.column)) {
                            $(this).addClass('selected');
                            $(this).css({
                                backgroundColor: '#66aaaa'
                            });
                        }
                    });
                }
            };
        });

})();
