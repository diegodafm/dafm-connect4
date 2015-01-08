/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('GameController', function($scope, $location, PlayerFactory, MoveFactory) {

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

                            validateHorizontally();
                            validateVertically();
                            validateDiagonally();

                            $scope.switchPlayer();
                            return;
                        }
                    }
                }
            }
        };

        $scope.updatePiece = function(move) {
            $scope.matrix[move.position.line][move.position.column].move = move;
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
        };


        function validateHorizontally() {
            var count = 1;
            for (var i = $scope.matrix.length - 1; i >= 0; i--) {
                for (var j = $scope.matrix[i].length - 1; j >= 0; j--) {
                    if (!$scope.matrix[i][j].available && ($scope.matrix[i][j - 1] && !$scope.matrix[i][j - 1].available)) {
                        if ($scope.matrix[i][j].move.player.nickname === $scope.matrix[i][j - 1].move.player.nickname) {
                            count++;
                        } else {
                            count = 1;
                        }
                        if (count === 4) {
                            console.log($scope.matrix[i][j]);
                            console.log('winner ' + $scope.matrix[i][j].move.player.nickname);
                            return;
                        }

                    }
                }
            }
        }

        function validateVertically() {

            function verticalBottom2Top(piece) {
                if (piece.line <= 3) {
                    for (var i = 1; i <= 3; i++) {

                    }
                }

            }

            for (var i = $scope.matrix.length - 1; i >= 0; i--) {
                for (var j = $scope.matrix[i].length - 1; j >= 0; j--) {


                    if (!$scope.matrix[i][j].available) {
                        verticalBottom2Top($scope.matrix[i][j]);
                    }

                    /*
                                         && ($scope.matrix[i - 1][j] && !$scope.matrix[i - 1][j].available)) {
                                            if ($scope.matrix[i][j].move.player.nickname === $scope.matrix[i - 1][j].move.player.nickname) {
                                                count++;
                                            } else {
                                                count = 1;
                                            }
                                            if (count === 4) {
                                                console.log('winner ' + $scope.matrix[i][j].move.player.nickname);
                                                return;
                                            }
                                        }
                                        */
                }
            }
        }

        function validateDiagonally() {

            function diagonalBottomLeft(piece) {
                var count = 1;
                if (piece.line >= 3 && piece.column >= 3) {
                    for (var i = 1; i <= 3; i++) {
                        if (!$scope.matrix[piece.line - i][piece.column - i].available) {
                            if (piece.move.player.nickname === $scope.matrix[piece.line - i][piece.column - i].move.player.nickname) {
                                count++;
                            } else {
                                count = 1;
                            }
                            if (count === 4) {
                                console.log('winner ' + piece.move.player.nickname);
                                return;
                            }
                        }
                    }
                }
            }

            function diagonalBottomRight(piece) {
                var count = 1;
                if (piece.line >= 3 && piece.column <= 3) {
                    for (var i = 1; i <= 3; i++) {
                        if (!$scope.matrix[piece.line - i][piece.column + i].available) {
                            if (piece.move.player.nickname === $scope.matrix[piece.line - i][piece.column + i].move.player.nickname) {
                                count++;
                            } else {
                                count = 1;
                            }
                            if (count === 4) {
                                console.log('winner ' + piece.move.player.nickname);
                                return;
                            }
                        }
                    }
                }
            }

            for (var i = $scope.matrix.length - 1; i >= 0; i--) {
                for (var j = $scope.matrix[i].length - 1; j >= 0; j--) {
                    if (!$scope.matrix[i][j].available) {
                        diagonalBottomLeft($scope.matrix[i][j]);
                        diagonalBottomRight($scope.matrix[i][j]);
                    }
                }
            }
        }

        if ($scope.isReady()) {
            $scope.startGame();
        } else {
            $location.path('/players');
        }
    });
