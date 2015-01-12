/**
 * Created by Diego Alisson on 5/7/14.
 */
(function() {
    angular.module('connect4')
        .factory('MoveFactory', function() {
            var moves = [];

            return {
                addMove: function(move) {
                    moves.push(move);
                },

                undoMove: function() {
                    if (moves.length > 0) {
                        var move = moves[moves.length - 1];
                        moves.pop();
                        return move;
                    } else {
                        return null;
                    }
                },

                forwardMove: function() {

                },

                getMoves: function() {
                    return moves;
                },

                getMovesByPlayer: function(player) {
                    var playerMoves = [];
                    for (var i = moves.length - 1; i >= 0; i--) {
                        if (moves[i].player.nickname === player.nickname) {
                            playerMoves.push(moves[i]);
                        }
                    }
                    return playerMoves;
                },

                clearMoves: function() {
                    moves = [];
                }


            };
        });
}());
