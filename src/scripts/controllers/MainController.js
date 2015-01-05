/**
 * Created by Diego Alisson on 12/15/14.
 */
angular.module('connect4')
    .controller('MainController', function($scope, $state) {

        $scope.authBackground = $state.includes('dashboards');


    });
