/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('PlayersController', function($scope, $location, PlayerFactory) {

        $scope.players = PlayerFactory.players;


        $scope.isReady = function() {
            if ($scope.players.player1.ready && $scope.players.player2.ready) {
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
        };

        $scope.$watch('players', function() {
            if ($scope.isReady()) {
                $location.path('/game');
            }
        }, true);

    });
