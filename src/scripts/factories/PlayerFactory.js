/**
 * Created by Diego Alisson on 5/7/14.
 */
(function() {
    angular.module('connect4')
        .factory('PlayerFactory', function() {

            var players = {
                player1: {
                    nickname: 'Diego',
                    color: '#00aa66',
                    ready: false
                },
                player2: {
                    nickname: 'Cassia',
                    color: '#995500',
                    ready: false
                }
            };

            return {


                players: players,

                resetPlayers: function() {
                    players.player1.ready = false;
                    players.player2.ready = false;
                }
            };
        });
}());
