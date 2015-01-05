(function() {

    angular.module('connect4')
        .factory('AuthUsers', function($http, $location, SessionControll) {

            var cacheSession = function(user) {
                SessionControll.set('userLogin', true);
                SessionControll.set('user', user);
            };
            var unCacheSession = function() {
                SessionControll.unset('userLogin');
                SessionControll.unset('user');
            };

            return {
                login: function(user) {
                    return $http({
                        url: 'login/validateLogin',
                        method: 'POST',
                        cache: false,
                        data: 'email=' + user.email + '&password=' + user.password + '&datetime=' + new Date().getTime(),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(data) {
                        if (data.status === true) {
                            cacheSession(JSON.stringify(data.user));
                        }
                    }).error(function() {

                    });
                },

                logout: function() {
                    return $http({
                        url: '/login/logout/?t=' + new Date().getTime(),
                    }).success(function() {
                        unCacheSession();
                        $location.path('/login');
                    });
                },

                isLoggedIn: function() {
                    return SessionControll.get('userLogin');
                }
            };
        });
}());
