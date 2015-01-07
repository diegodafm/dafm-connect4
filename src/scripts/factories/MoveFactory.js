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
                    var move = moves[moves.length - 1];
                    moves.pop();
                    return move;
                },

                forwardMove: function() {

                }
            };
        });
}());
