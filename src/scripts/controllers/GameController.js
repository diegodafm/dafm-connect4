/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('GameController', function($scope, $location, $modal, GameRulesService, PlayerFactory, MoveFactory) {

        $scope.players = PlayerFactory.players;

        $scope.matrix = [];

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

        $scope.updateLowestPiece = function(line, column) {
            if ($scope.isOver === false) {
                for (var i = $scope.matrix.length - 1; i >= line; i--) {
                    for (var j = 7 - 1; j >= 0; j--) {
                        if (j === column) {
                            if ($scope.matrix[i][j].available) {
                                var move = {
                                    player: $scope.getCurrentPlayer(),
                                    position: {
                                        line: i,
                                        column: j
                                    }
                                };
                                MoveFactory.addMove(move);
                                $scope.matrix[i][j].move = move;
                                $scope.matrix[i][j].available = false;

                                var findWinnerMove = GameRulesService.findWinnerMove($scope.matrix);
                                if (findWinnerMove && findWinnerMove.hasWinner) {
                                    $scope.showWinnerMove(findWinnerMove.moves);
                                    $scope.winner = findWinnerMove.winner;
                                    $scope.isOver = true;
                                } else {
                                    $scope.switchPlayer();
                                }
                                return;
                            }
                        }
                    }
                }
            }
        };

        $scope.reset = function() {
            MoveFactory.clearMoves();
            clearPieces();
            $scope.startGame();
        };

        $scope.changePlayers = function() {
            MoveFactory.clearMoves();
            clearPieces();
            clearPieces();
            PlayerFactory.resetPlayers();
            $location.path('/players');
        };

        function clearPieces() {
            for (var i = $scope.matrix.length - 1; i >= 0; i--) {
                for (var j = $scope.matrix[i].length - 1; j >= 0; j--) {
                    $scope.matrix[i][j].available = true;
                    $scope.matrix[i][j].move = null;
                }
            }
        }

        $scope.showWinnerMove = function(moves) {
            for (var i = moves.length - 1; i >= 0; i--) {
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

        $scope.isReady = function() {
            if ($scope.players.player1.ready && $scope.players.player2.ready) {
                return true;
            }
        };

        $scope.startGame = function() {
            $scope.isOver = false;
            if ((Math.floor(Math.random() * 2) + 1) === 1) {
                $scope.currentPlayer = $scope.players.player2;
            } else {
                $scope.currentPlayer = $scope.players.player1;
            }
        };

        $scope.getCurrentPlayer = function() {
            return $scope.currentPlayer;
        };

        $scope.isCurrentPlayer = function(player) {
            return $scope.getCurrentPlayer() === player;
        };

        $scope.switchPlayer = function() {
            if ($scope.currentPlayer === $scope.players.player1) {
                $scope.currentPlayer = $scope.players.player2;
            } else {
                $scope.currentPlayer = $scope.players.player1;
            }
        };

        $scope.undo = function() {
            var move = MoveFactory.undoMove();
            $scope.deletePiece(move);
            $scope.switchPlayer();
        };

        $scope.replay = function() {
            showReplayModal();
        };

        function showReplayModal() {
            var modalInstance = $modal.open({
                templateUrl: 'src/views/partials/replay.html',
                controller: 'ReplayGameController'
            });

            modalInstance.result.then(function() {

            }, function() {

            });
        }

        $scope.undoCondition = function() {
            return (!$scope.isOver && MoveFactory.getMoves().length > 0);
        };


        if ($scope.isReady()) {
            $scope.startGame();
        } else {
            $location.path('/players');
        }
    });
