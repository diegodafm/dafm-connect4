(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('animationPiece', function() {
            return {
                restrict: 'AE',
                replace: 'true',
                template: '<div class=\'piece\' ng-class=\'\'></div>',
                scope: {
                    item: '@'
                },
                link: function(scope, el) {

                    function render() {

                        var evalItem = scope.$eval(scope.item);

                        if (!evalItem.available) {
                            $(el).addClass('selected');
                            $(el).css({
                                backgroundColor: evalItem.player.color
                            });
                        }

                    }

                    //key point here to watch for changes of the type property
                    scope.$watch('item', function(newValue, oldValue) {
                        console.log(newValue);
                        console.log(oldValue);
                        render();
                    });
                }
            };
        });

})();
