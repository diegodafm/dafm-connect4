(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('ngMoment', function() {
            return {
                restrict: 'A',
                scope: {
                    value: '@',
                    parse: '@',
                    format: '@',
                    locale: '@'
                },
                link: function(scope, elem) {

                    window.moment.locale(scope.locale || 'pt-br');

                    if (scope.value) {
                        if (scope.parse) {
                            $(elem).html(window.moment(scope.value, scope.parse).format(scope.format));
                        } else {
                            $(elem).html(window.moment(scope.value).format(scope.format));
                        }
                    } else {
                        window.setInterval(function() {
                            $(elem).html(window.moment().format(scope.format));
                        }, 1000);
                    }


                }
            };
        });

})();
