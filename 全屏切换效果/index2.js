;(function ($) {

    function _isSuportCss(property) {
        var body = $("body")[0];
        for (var i = 0; i < property.length; i++) {
            if (property[i] in body.style) {
                return true;
            }
        }
        return false;
    }

    var PageSwitch = (function () {

        function PageSwitch(ele, opts) {
            this.settings = $.extend(true, $.fn.PageSwitch.settings, opts || {});
            this.ele = ele;  // $('#container')
            this.part = ele.find(this.settings.selectors.part);
            this.page = this.settings.selectors.page;
            this.active = this.settings.selectors.active.substring(1);
            this.pagesCount = this.part.size();
            this.index = (this.settings.index >= 0 && this.settings.index < this.pagesCount ) ? this.settings.index : 0;
            this.canScroll = true; // 锁
            this.init(); // 初始化插件
        }

        PageSwitch.prototype = {
            // 初始化dom结构，布局，分页及绑定事件
            init: function () {
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
            /** 上一页 */
            prev: function () {
                if (this.index > 0) {
                    this.index--;
                } else if (this.settings.loop) {
                    this.index = this.pagesCount - 1;
                }
                this._scrollPage();
            },
            /** 下一页 */
            next: function () {
                if (this.index < this.pagesCount) {
                    this.index++;
                } else if (this.settings.loop) {
                    this.index = 0;
                }
                this._scrollPage();
            },
            /** 判断是横屏还是竖屏 */
            _isVertical: function () {
                // this.settings.direction == 'vertical' ? true : false 简写
                return this.settings.direction === 'vertical';
            },
            /** 获取滑动的宽度( 横屏滑动 )或高度( 竖屏滑动 ) */
            switchLength: function () {
                var win = $(window);
                return this._isVertical() ? win.height() : win.width();
            },
            // 主要针对横屏情况进行页面布局 有下划线的命名'_' 表示私有方法，尽量在外部不要调用
            /** 初始化页面横向布局 */
            _initLayout: function () {
                var me = this;
                var oWidth = (me.pagesCount * 100) + '%',
                    cellWidth = (100 / me.pagesCount).toFixed(2) + '%';

                this.ele.width(oWidth);
                this.part.width(cellWidth).addClass('left');
            },
            /** 实现分页的dom结构及css样式 */
            _initPaging: function () {
                var className = this.page.substring(1);
                if (!this._isVertical()) {
                    className += ' horizontal';
                } else {
                    className += ' vertical';
                }
                var pageHtml = '<ul class="' + className + '"><li class="' + this.active + '"></li>';
                for (var i = 1, len = this.pagesCount; i < len; i++) {
                    pageHtml += '<li></li>';
                }
                pageHtml += '</ul>';
                this.ele.after(pageHtml);

            },
            /** 初始化插件事件 */
            _initEvent: function () {
                var me = this;
                this.ele.next(this.page).on('click', 'li', function () {
                    me.index = $(this).index();
                    me._scrollPage();
                });
                // 鼠标滚轮事件
                this.part.on("mousewheel DOMMouseScroll", function (ev) {
                    if (me.canScroll) {
                        /**
                         * IE6 用的是 mousewheel  ff 用的是 DOMMouseScroll
                         * 每次向下滑动wheelDelta为-120，而ff的detail 是 3
                         * 由于ff浏览器方向是相反的，所以要加个负号
                         * */
                        var data = ev.originalEvent.wheelDelta || -ev.originalEvent.detail;
                        // 上一页  如果当前是第一页，并且插件不允许循环播放，在向上滑动是没有相应的 ( 最后一页同理 )
                        // 可以循环播放，第一页向上滑动就到了最后一页
                        if (data > 0 && ( me.index && !me.settings.loop || me.settings.loop )) {
                            me.prev();
                        } else if (data < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop )) {
                            me.next();
                        }
                    }

                });
                // 键盘事件 left 37 up 38 right 39 down 40
                if (this.settings.keyboard) {
                    $(window).on('keydown', function (ev) {
                        var keyCode = ev.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            me.prev();
                        } else if (keyCode == 39 || keyCode == 40) {
                            me.next();
                        }
                    });
                }
                // 当窗口改变大小的时候触发
                $(window).resize(function () {
                    var currentLength = me.switchLength(); //  可视区的宽高度
                    var offsetDis = 0;  // 当前页面相对文档的坐标
                    if (me._isVertical()) {
                        offsetDis = me.part.eq(me.index).offset().top;
                    } else {
                        offsetDis = me.part.eq(me.index).offset().left;
                    }

                    // 当前页面相对文档的高度 大于 当前页面的高度，那么页面就向下滑动，否则就是当前页面
                    // 如果是第一页和最后一页，都是当前页面
                    if (Math.abs(offsetDis) > currentLength / 2 && me.index < (me.pagesCount - 1)) {

                        me.index++;
                    }

                    if (me.index) {
                        me._scrollPage();
                    }

                    me.part.on('webkitTransitionEnd msTransitionend mozTransitionend transitionend', function () {
                        me.canScroll = true;
                        if (me.settings.callback && $.type(me.settings.callback) === 'function') {
                            me.settings.callback();
                        }
                    });


                });

            },

            /** 添加动画效果 */
            _scrollPage: function () {
                var me = this;
                // 获取当前页面的offset的坐标
                var dest = this.part.eq(this.index).position();
                if (!dest) return;

                me.canScroll = false;

                var transform = ["-webkit-transform", "-ms-transform", "-moz-transform", "transform"],
                    transition = ["-webkit-transition", "-ms-transition", "-moz-transition", "transition"];

                if (_isSuportCss(transform) && _isSuportCss(transition)) {
                    var traslate = "";
                    if (this._isVertical()) {
                        traslate = "0px, -" + dest.top + "px, 0px";
                    } else {
                        traslate = "-" + dest.left + "px, 0px, 0px";
                    }
                    this.ele.css({
                        "-webkit-transition": "all " + me.settings.duration + "ms " + me.settings.easing,
                        "transform": "translate3d(" + traslate + ")"
                    });


                    this.ele.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function () {
                        me.canScroll = true;
                        me.settings.callback();
                    });
                } else {
                    var animateCSS = this._isVertical() ? {top: -dest.top} : {left: -dest.left};
                    this.ele.animate(animateCSS, this.settings.duration, function () {
                        me.canScroll = true;
                        if (me.settings.callback && $.type(me.settings.callback) === 'function') {
                            me.canScroll = true;
                            me.settings.callback();
                        }
                    });
                }

                if (this.settings.pagination) {
                    this.ele.next(this.page).find('li').eq(this.index).addClass(this.active).siblings().removeClass(this.active);
                }

            }

        };

        return PageSwitch;

    })();

    /** 对外提供的插件入口 */
    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data('PageSwitch');  // 单例模式
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data('PageSwitch', instance);
            }
            // 提供外部调用 PageSwitch 对象中的方法
            if ($.type(options) === 'string') {
                return instance[options]();
            }

        });
    };
    /** 默认参数 */
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
