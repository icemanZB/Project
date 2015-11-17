;(function ($) {
    $.fn.Fixed = function (options) {
        var defaults = {
            x: 0,
            y: 0
        };
        var o = jQuery.extend(defaults, options);

        var isIe6 = !window.XMLHttpRequest;

        var html = $('html');
        if (isIe6 && html.css('backgroundAttachment') !== 'fixed') { // 防止抖动
            html.css('backgroundAttachment', 'fixed')
                .css('backgroundImage', 'url(about:blank)');
        }

        return this.each(function () {
            var $obj = $(this);
            if (isIe6) {
                $obj.css('position', 'absolute');
                this.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
                this.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
            } else {
                $obj.css('position', 'fixed').css('top', o.y).css('left', o.x);
            }
        });
    };
})(jQuery);
