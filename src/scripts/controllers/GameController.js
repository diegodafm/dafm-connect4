/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('GameController', function($scope) {

        $scope.player1 = {
            ready: false
        };

        $scope.player2 = {
            ready: false
        };

        $scope.matrix = [];

        $scope.currentPlayer = null;

        for (var i = 6 - 1; i >= 0; i--) {
            $scope.matrix[i] = [];
            for (var j = 7 - 1; j >= 0; j--) {
                $scope.matrix[i][j] = {
                    available: true,
                    line: i,
                    column: j
                };
            }
        }

        $scope.checkAvailability = function(line, column) {
            if ($scope.isReady()) {
                for (var i = 6 - 1; i >= 0; i--) {
                    if (i === line) {
                        for (var j = 7 - 1; j >= 0; j--) {
                            if (j === column) {
                                $scope.updateLowestPiece(line, column);
                            }
                        }
                    }
                }
            }
        };

        $scope.updateLowestPiece = function(line, column) {
            for (var i = $scope.matrix.length - 1; i >= line; i--) {
                for (var j = 7 - 1; j >= 0; j--) {
                    if (j === column) {
                        if ($scope.matrix[i][j].available) {
                            $scope.matrix[i][j].player = $scope.getCurrentPlayer();
                            $scope.matrix[i][j].available = false;
                            $scope.switchPlayer();
                            return;
                        }
                    }
                }
            }
        };

        $scope.isReady = function() {
            if ($scope.player1.ready && $scope.player2.ready) {
                return true;
            }
        };

        $scope.validatePlayer = function(player) {
            if (player.nickname !== '' && player.color !== '') {
                player.ready = true;
            } else {
                player.errorMessage = 'Please inform your nickname and select your color';
                player.hasError = true;
            }

            if ($scope.isReady()) {
                $scope.startGame();
            }
        };

        $scope.startGame = function() {
            if ((Math.floor(Math.random() * 2) + 1) === 1) {
                $scope.currentPlayer = $scope.player2;
            } else {
                $scope.currentPlayer = $scope.player1;
            }
        };

        $scope.getCurrentPlayer = function() {
            return $scope.currentPlayer;
        };

        $scope.switchPlayer = function() {
            if ($scope.currentPlayer === $scope.player1) {
                $scope.currentPlayer = $scope.player2;
            } else {
                $scope.currentPlayer = $scope.player1;
            }
        };

    });
