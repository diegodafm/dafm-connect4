(function() {
    'use strict';

    /**
     * @name testDirective
     * @description This is a test directive
     * ###How to use this directive
     * <div test-directive></div>
     */

    angular.module('connect4')
        .service('GameRulesService', function() {

            var matrix = null;

            function defaultReturns(count, movesList) {
                if (count === 4) {
                    return {
                        hasWinner: true,
                        moves: movesList
                    };
                } else {
                    return {
                        hasWinner: false
                    };
                }
            }

            function validateHorizontally() {


                function right2Left(piece) {
                    var count = 1;
                    var movesList = [];

                    if (piece.column >= 3) {
                        movesList.push(piece);

                        for (var i = 1; i <= 3; i++) {
                            if (!matrix[piece.line][piece.column - i].available) {
                                if (piece.move.player.nickname === matrix[piece.line][piece.column - i].move.player.nickname) {
                                    movesList.push(matrix[piece.line][piece.column - i]);
                                    count++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    return defaultReturns(count, movesList);
                }

                for (var i = matrix.length - 1; i >= 0; i--) {
                    for (var j = matrix[i].length - 1; j >= 0; j--) {
                        if (!matrix[i][j].available) {
                            var result = right2Left(matrix[i][j]);
                            if (result.hasWinner) {
                                return result;
                            }

                        }
                    }
                }
            }

            function validateVertically() {

                function verticalBottom2Top(piece) {
                    var count = 1;
                    var movesList = [];
                    if (piece.line >= 3) {
                        for (var i = 1; i <= 3; i++) {
                            movesList.push(piece);
                            if (!matrix[piece.line - i][piece.column].available) {
                                if (piece.move.player.nickname === matrix[piece.line - i][piece.column].move.player.nickname) {
                                    movesList.push(matrix[piece.line - i][piece.column]);
                                    count++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    return defaultReturns(count, movesList);

                }
                for (var i = matrix.length - 1; i >= 0; i--) {
                    for (var j = matrix[i].length - 1; j >= 0; j--) {
                        if (!matrix[i][j].available) {
                            var result = verticalBottom2Top(matrix[i][j]);
                            if (result.hasWinner) {
                                return result;
                            }
                        }
                    }
                }
            }

            function validateDiagonally() {

                function diagonalBottomLeft(piece) {
                    var count = 1;
                    var movesList = [];
                    if (piece.line >= 3 && piece.column >= 3) {
                        for (var i = 1; i <= 3; i++) {
                            movesList.push(piece);
                            if (!matrix[piece.line - i][piece.column - i].available) {
                                if (piece.move.player.nickname === matrix[piece.line - i][piece.column - i].move.player.nickname) {
                                    movesList.push(matrix[piece.line - i][piece.column - i]);
                                    count++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    return defaultReturns(count, movesList);
                }

                function diagonalBottomRight(piece) {
                    var count = 1;
                    var movesList = [];
                    if (piece.line >= 3 && piece.column <= 3) {
                        movesList.push(piece);
                        for (var i = 1; i <= 3; i++) {
                            if (!matrix[piece.line - i][piece.column + i].available) {
                                if (piece.move.player.nickname === matrix[piece.line - i][piece.column + i].move.player.nickname) {
                                    movesList.push(matrix[piece.line - i][piece.column + i]);
                                    count++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    return defaultReturns(count, movesList);
                }

                for (var i = matrix.length - 1; i >= 0; i--) {
                    for (var j = matrix[i].length - 1; j >= 0; j--) {
                        if (!matrix[i][j].available) {

                            var result = diagonalBottomLeft(matrix[i][j]);
                            if (result.hasWinner) {
                                return result;
                            }

                            result = diagonalBottomRight(matrix[i][j]);
                            if (result.hasWinner) {
                                return result;
                            }
                        }
                    }
                }
            }


            this.findWinnerMove = function(_matrix) {
                matrix = _matrix;

                var checkHorizontally = validateHorizontally();
                var checkVertically = validateVertically();
                var checkDiagonally = validateDiagonally();

                if (checkHorizontally && checkHorizontally.hasWinner) {
                    return checkHorizontally;
                } else if (checkVertically && checkVertically.hasWinner) {
                    return checkVertically;
                } else if (checkDiagonally && checkDiagonally.hasWinner) {
                    return checkDiagonally;
                }
            };

        });
})();
