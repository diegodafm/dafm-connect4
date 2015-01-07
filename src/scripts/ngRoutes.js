/**
 * Created by Diego Alisson on 12/14/14.
 */
(function() {
    angular.module('connect4')
        .config(function config($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'src/views/test.html',
                    controller: 'TestController',
                    data: {
                        pageTitle: 'Test View'
                    }
                })
                .state('players', {
                    url: '/players',
                    templateUrl: 'src/views/players.html',
                    controller: 'PlayersController',
                    data: {
                        pageTitle: 'Players'
                    }
                })
                .state('game', {
                    url: '/game',
                    templateUrl: 'src/views/connect4.html',
                    controller: 'GameController',
                    data: {
                        pageTitle: 'Game'
                    }
                });

        }).run(function($rootScope) {

            $rootScope.$on('$viewContentLoaded', function() {

            });
        });
}());
