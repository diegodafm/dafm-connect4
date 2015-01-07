/**
 * Created by Diego Alisson on 5/7/14.
 */
(function() {
    angular.module('connect4')
        .factory('PlayerFactory', function() {
            return {
                players: {
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
                }
            };
        });
}());
