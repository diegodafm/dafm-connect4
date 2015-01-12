/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('ReplayGameController', function($scope, $location, GameRulesService, PlayerFactory, MoveFactory) {

        $scope.players = PlayerFactory.players;

        $scope.moves = MoveFactory.getMoves();

        $scope.matrix = [];

        $scope.speed = 2000;

        $scope.currentPlayer = null;

        for (var i = 5; i >= 0; i--) {
            $scope.matrix[i] = [];
            for (var j = 6; j >= 0; j--) {
                $scope.matrix[i][j] = {
                    available: true,
                    line: i,
                    column: j
                };
            }
        }

        $scope.play = function() {
            $scope.playing = true;
            var move = null;

            (function next(counter, maxLoops, speed) {
                // break if maxLoops has been reached
                if (counter++ >= maxLoops) {
                    $scope.playing = false;
                    $scope.$apply();
                    return;
                }

                window.setTimeout(function() {
                    move = $scope.moves[counter];
                    $scope.matrix[move.position.line][move.position.column].move = move;
                    $scope.$apply();
                    next(counter, maxLoops, speed);
                }, speed);
            })(-1, $scope.moves.length - 1, $scope.speed);
        };

        $scope.showWinnerMove = function(moves) {
            for (var i = 0; i < moves.length; i++) {
                var move = moves[i];
                move.winnerMove = true;
                $scope.matrix[move.position.line][move.position.column].move = move;
            }
        };

        $scope.deletePiece = function(move) {
            if (move !== null) {
                $scope.matrix[move.position.line][move.position.column].available = true;
                $scope.matrix[move.position.line][move.position.column].move = null;
            }
        };

        $scope.replay = function() {
            clearMoves();
            $scope.play();
        };

        function clearMoves() {
            for (var i = $scope.matrix.length - 1; i >= 0; i--) {
                for (var j = $scope.matrix[i].length - 1; j >= 0; j--) {
                    delete $scope.matrix[i][j].move;
                }
            }
        }



        $scope.play();

    });
