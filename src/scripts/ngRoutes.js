/**
 * Created by Diego Alisson on 12/14/14.
 */
(function() {
    angular.module('connect4')
        .config(function config($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/test');

            $stateProvider
                .state('test', {
                    url: '/test',
                    templateUrl: 'src/views/test.html',
                    controller: 'TestController',
                    data: {
                        pageTitle: 'Test View'
                    }
                });

        }).run(function($rootScope) {

            $rootScope.$on('$viewContentLoaded', function() {

            });
        });
}());
