/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('GameController', function($scope) {

        $scope.matrix = [];

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
            for (var i = 6 - 1; i >= 0; i--) {
                if (i === line) {
                    for (var j = 7 - 1; j >= 0; j--) {
                        if (j === column) {
                            return $scope.matrix[i][j].available;
                        }
                    }
                }
            }
        };

        $scope.updateLowestPiece = function(line, column) {
            for (var i = 6 - 1; i >= 0; i--) {
                for (var j = 7 - 1; j >= 0; j--) {
                    if (j === column) {

                    }
                }
            }
        };

    });
