;(function ($) {
    var privateFn = function () {
        // 插件内部私有方法
    };
    var PageSwitch = (function () {

        function PageSwitch(ele, opts) {
            this.settings = $.extend(true, $.fn.PageSwitch.settings, opts || {});
            this.ele = ele;
            this.init(); // 初始化插件
        }

        PageSwitch.prototype = {
            init: function () {
                console.log(1);
            }
        };

        return PageSwitch;

    })();

    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data('PageSwitch');  // 单例模式
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data('PageSwitch', instance);
            }
            // 提供外部调用 PageSwitch 对象的init()方法
            if ($.type(options) === 'string') {
                return instance[options]();
            }

        });
    };
    $.fn.PageSwitch.settings = {
        "selectors": {
            "container":'#container',
            "part": '.part',
            "page": '#pages',
            "active": '.active'
        },
        "index": 0,  // 默认显示第一屏
        "easing": 'ease', // 特效方式，ease-in,ease-out,linear
        "duration": 1000,// 每次动画执行的时间
        "pagination": true,//是否显示分页
        "loop": false,// 是否循环
        "keyboard": true,// 是否支持键盘
        "direction": 'vertical',// 滑动的方向 horizontal,vertical
        "callback": function (pagenum) {
        }
    };
})(jQuery);
