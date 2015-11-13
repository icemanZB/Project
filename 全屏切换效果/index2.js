;(function ($) {
    var PageSwitch = (function () {

        function PageSwitch(ele, opts) {
            this.settings = $.extend(true, $.fn.PageSwitch.settings, opts || {});
            this.ele = ele;
            this.init(); // 初始化插件
        }

        PageSwitch.prototype = {
            // 初始化dom结构，布局，分页及绑定事件
            init: function () {
                var me = this;
                this.part = this.settings.selectors.part;
                this.container = this.settings.selectors.container;
                this.page = this.settings.selectors.page;
                this.active = this.settings.selectors.active;
                this.vertical = this.settings.selectors.vertical;
                this.horizontal = this.settings.selectors.horizontal;
                this.pagesCount = this.pagesCountFn();
                this.index = (this.settings.index >= 0 && this.settings.index < this.pagesCount ) ? this.settings.index : 0;
                // 判断如果是横屏
                if (!this._isVertical()) {
                    this._initLayout();
                }

                // 初始化分页
                if (this.settings.pagination) {
                    this._initPaging();
                }

                this._initEvent();
            },
            // 获取滑动页面数量
            pagesCountFn: function () {
                return $(this.part).size();
            },
            // 判断是横屏还是竖屏
            _isVertical: function () {
                // this.settings.direction == 'vertical' ? true : false 简写
                return this.settings.direction === 'vertical';
            },
            // 获取滑动的宽度( 横屏滑动 )或高度( 竖屏滑动 )
            switchLength: function () {
                return this.direction ? this.ele.height() : this.ele.width();
            },
            // 主要针对横屏情况进行页面布局 有下划线的命名'_' 表示私有方法，尽量在外部不要调用
            _initLayout: function () {
                var me = this;
                var oWidth = (me.pagesCount * 100) + '%',
                    cellWidth = (100 / me.pagesCount).toFixed(2) + '%';

                $(this.container).width(oWidth);
                $(this.part).width(cellWidth).addClass('left');
            },
            // 实现分页的dom结构及css样式
            _initPaging: function () {
                var className = this.page.substring(1);
                if (!this._isVertical()) {
                    className += ' horizontal';
                } else {
                    className += ' vertical';
                }
                var pageHtml = '<ul class="' + className + '"><li class="' + this.active.substring(1) + '"></li>';
                for (var i = 1, len = this.pagesCount; i < len; i++) {
                    pageHtml += '<li></li>';
                }
                pageHtml += '</ul>';
                $(this.container).after(pageHtml);

            },
            // 初始化插件事件
            _initEvent: function () {
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
            "container": '#container',
            "part": '.part',
            "page": '.pages',
            "vertical": '.vertical',
            "horizontal": 'horizontal',
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
