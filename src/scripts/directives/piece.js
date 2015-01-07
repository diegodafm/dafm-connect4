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
                template: '<div class=\'piece\' ng-class=\'\'></div>',
                scope: {
                    item: '@'
                },
                link: function(scope, el) {

                    function createAnimatedPiece() {
                        var evalItem = scope.$eval(scope.item);

                        var div = window.document.createElement('div');
                        $(div).addClass('piece animated');
                        $(div).css({
                            top: ($(el).offset().top * -1),
                            opacity: 0,
                            backgroundColor: evalItem.player.color
                        });


                        $(el).append(div);

                        $(div).animate({
                            top: 0,
                            opacity: 1


                        }, 500, function() {
                            render();
                        });
                    }

                    function render() {
                        var evalItem = scope.$eval(scope.item);
                        if (!evalItem.available) {
                            $(el).addClass('selected');
                            $(el).css({
                                backgroundColor: evalItem.player.color
                            });
                        }

                        $('.piece.animated').remove();
                    }

                    //key point here to watch for changes of the type property
                    scope.$watch('item', function(newValue, oldValue) {
                        console.log('newValue');
                        console.log(newValue);
                        console.log('oldValue');
                        console.log(oldValue);
                        if (newValue !== oldValue) {
                            createAnimatedPiece();
                        }
                    });
                }
            };
        });

})();
