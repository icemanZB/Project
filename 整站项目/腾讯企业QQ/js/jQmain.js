(function ($) {
    $(function () {
        var $oBanner = $('#banner'),
            $aLi = $oBanner.find('ul').find('li'),
            $aOlLi = $oBanner.find('ol').find('li'),
            iNow = 0,
            timer = null;

        function autoPlay() {
            iNow++;
            if (iNow === $aLi.length) {
                iNow = 0;
            }

            animate();

        }

        function animate(){
            $aOlLi.each(function () {
                $(this).find('a').removeClass('active');
            });

            $aOlLi.eq(iNow).find('a').addClass('active');
            $aLi.hide().stop().animate({'opacity': 0}, 800).eq(iNow).show().stop().animate({'opacity': 1}, 800);
        }

        timer = setInterval(autoPlay, 2000);

        $aOlLi.hover(function () {
            clearInterval(timer);
            iNow = $(this).index();
            animate();
        }, function () {
            timer = setInterval(autoPlay, 2000);
        });
    });

})(jQuery);
