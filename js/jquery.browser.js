;(function ($) {
    var userAgent = navigator.userAgent.toLowerCase();

    $.browser = {
        msie: /msie/.test(userAgent),
        mozilla: /firefox/.test(userAgent),
        webkit: /webkit/.test(userAgent),
        opera: /opera/.test(userAgent),

        version: (function () {


        })()

    };



})(jQuery);