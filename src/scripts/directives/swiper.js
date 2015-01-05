(function() {
    /**
     * pageTitle - Directive for set Page title - mata title
     */
    angular
        .module('connect4')
        .directive('swiper', function() {
            return {
                restrict: 'AE',
                link: function(scope, el) {



                    var container = window.document.createElement('div');
                    container.className = 'swiper-container';

                    $(el).addClass('swiper-container');

                    var mySwiper = new Swiper($(el).get(0), {
                        slidesPerView: 'auto',
                        loop: true
                    });

                    console.log(mySwiper);



                    $(window).bind('load resize', function() {
                        mySwiper.resizeFix();
                    });
                }
            };
        });

})();
