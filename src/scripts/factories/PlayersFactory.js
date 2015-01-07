/**
 * Created by Diego Alisson on 5/7/14.
 */
(function() {
    angular.module('connect4')
        .factory('PlayersFactory', function() {
            return {
                players: {
                    player1: {
                        nickname: 'diego',
                        color: '#66aa00',
                        ready: false
                    },
                    player2: {
                        nickname: 'cassia',
                        color: '#99aa00',
                        ready: false
                    }
                }
            };
        });
}());
