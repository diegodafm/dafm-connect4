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
                    model: '@'
                },
                link: function(scope, el) {

                    function createAnimatedPiece() {
                        var evalModel = scope.$eval(scope.model);

                        var div = window.document.createElement('div');
                        $(div).addClass('piece animated');
                        $(div).css({
                            top: ($(el).offset().top * -1),
                            opacity: 0,
                            backgroundColor: evalModel.move.player.color
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
                        var evalModel = scope.$eval(scope.model);
                        if (!evalModel.available) {
                            $(el).addClass('selected');
                            $(el).css({
                                backgroundColor: evalModel.move.player.color
                            });
                        }

                        $('.piece.animated').remove();
                    }

                    function removePiece() {

                        var div = window.document.createElement('div');
                        $(div).addClass('piece animated');
                        $(div).css({
                            backgroundColor: $(el).css('backgroundColor')
                        });

                        $(el).append(div);

                        $(el).removeClass('selected');
                        $(el).css({
                            backgroundColor: 'transparent'
                        });
                        $(div).animate({
                            top: ($(el).offset().top * -1),
                            opacity: 0
                        }, 500, function() {
                            $(el).children().each(function() {
                                $(this).remove();
                            });
                        });
                    }

                    function renderWinnerMove() {
                        var evalModel = scope.$eval(scope.model);
                        var div = window.document.createElement('div');

                        $(div).addClass('piece winnerMove');
                        $(el).append(div);

                        $(el).addClass('selected');
                        $(el).css({
                            backgroundColor: evalModel.move.player.color
                        });

                    }

                    scope.$watch('model', function(newValue, oldValue) {
                        if (newValue !== oldValue) {
                            var evalModel = scope.$eval(scope.model);
                            if (evalModel.move === null) {
                                removePiece();
                            } else if (evalModel.move && evalModel.move.winnerMove) {
                                renderWinnerMove();
                            } else {
                                createAnimatedPiece();
                            }

                        }
                    });
                }
            };
        });

})();
