/*
写插件 最好是以闭包的形式,这样所有的变量都会变成局部变量

(function($){  // $ 接收
	
})(jQuery);  // 传入jQuery 对象

$.fn  // 扩展插件的方法

// 方法前面的元素  $('#div1') 就是插件中的this


*/

(function($) {
	$.fn.TabControl = function() {

	};
})(jQuery);