/*
 * 事件绑定 ( 解决了无法解绑的问题 )
 * addEvent('id','click',function(){ console.log(1);  });
 * addEvent('id','click',function(){ console.log(2);  });
 *
 * */
var addEvent = function (id, event, fn) {
	var obj = document.getElementById(id) || document;
	obj['bind' + event] = obj['bind' + event] || {};
	obj['bind' + event]['bind' + fn] = obj['bind' + event]['bind' + fn] || function () {
			fn.call(obj);
		};
	if (obj.addEventListener) {
		obj.addEventListener(event, obj['bind' + event]['bind' + fn], false);
	} else {
		obj.attachEvent('on' + event, obj['bind' + event]['bind' + fn]);
	}
};

/**
 * removeEvent
 * @param obj
 * @param event
 * @param fn
 */
var removeEvent = function (obj, event, fn) {
	if (obj['bind' + event] && obj['bind' + event]['bind' + fn]) {
		if (obj.detachEvent) {
			obj.detachEvent('on' + event, obj['bind' + event]['bind' + fn]);
		} else {
			obj.removeEventListener(event, obj['bind' + event]['bind' + fn], false);
		}
	}
};

/*
 * 事件代理 ( 委托 ) 绑定在父元素上,使其子元素也拥有这个事件
 * delegateEvent('li','click',function(){  console.log(1);  });
 *
 * */
var delegateEvent = function (target, event, fn) {
	addEvent(document, event, function (e) {
		if (e.target.nodeName === target.toUpperCase()) {
			fn.call(e.target);
		}
	});
};

// 获取一个元素到页面绝对距离
var getElementPos = function (obj) {
	var pos = {left: 0, top: 0};

	while (obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}

	return pos;
};


var addDate = function (date, days) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	return d.getFullYear() + "/" + month + "/" + day;

};
// alert(addDate('2015/07/07',31));

var getScrollPos = function (ev) {
	var scrollTop = getPageScroll().scrollTop;
	var scrollLeft = getPageScroll().scrollLeft;
	return {
		x: ev.clientX + scrollLeft,
		y: ev.clientY + scrollTop
	};
};

function getPageScroll() {
	var json = {scrollTop: 0, scrollLeft: 0};
	json.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	json.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	return json;
}

var distinctArr = function (arr) {
	var aResult = [];
	var json = {};
	for (var i = 0; i < arr.length; i++) {
		// 判断json中是否有该元素，没有就添加到数组中
		if (!json[arr[i]]) {
			aResult.push(arr[i]);
			json[arr[i]] = 1; // 赋值为1表示上面的判断就是为否不添加到新的数组中
		}
	}
	return aResult;
};


var getByClassName = function (parent, className) {
	var aEls = parent.getElementsByTagName('*');
	var aResult = [];

	for (var i = 0; i < aEls.length; i++) {
		var aClassName = aEls[i].className.split(' ');
		for (var j = 0; j < aClassName.length; j++) {
			if (aClassName[j] === className) {
				aResult.push(aEls[i]);
				break;
			}
		}
	}

	return aResult;
};

var getByClass = function (oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var result = [];
	var re = new RegExp('\\b' + sClass + '\\b', 'i');

	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			result.push(aEle[i]);
		}
	}

	return result;
};

var addClass = function (obj, className) {
	if (obj.className === '') {
		obj.className = className;
	} else {
		var aClassName = obj.className.split(' ');
		var _index = arrIndexOf(aClassName, className);
		if (_index === -1) {
			obj.className += ' ' + className;
		}
	}
};

var removeClass = function (obj, className) {
	if (obj.className !== '') {
		var aClassName = obj.className.split(' ');
		var _index = arrIndexOf(aClassName, className);
		if (_index !== -1) {
			aClassName.splice(_index, 1);
			obj.className = aClassName.join(' ');
		}
	}
};

var arrIndexOf = function (arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1;
};

function setCookie(name, value, iDay) {
	var oDate = new Date();

	oDate.setDate(oDate.getDate() + iDay);

	document.cookie = name + '=' + value + ';expirse=' + oDate.toUTCString();
}

function getCookie(name) {
	var arr = document.cookie.split(';');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if (arr2[0] === name) {
			return arr2[1];
		}
	}

	return '';

	/*var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	 if (arr != null) return unescape(arr[2]);
	 return null*/
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}


// 高效数组去重
Array.prototype.unique = function () {
	var r = [];
	for (var i = 0, l = this.length; i < l; i++) {
		for (var j = i + 1; j < l; j++)
			if (this[i] === this[j]) j = ++i;
		r.push(this[i]);
	}
	return r;
};

/**
 * 快速排序
 * @param  arr
 * @return Array
 */
function quickSort(arr) {
	if (arr.length <= 1) return arr;

	var aLeft = [];
	var aRight = [];

	var oNum = Math.floor(arr.length / 2);
	var pivot = arr.splice(oNum, 1); // 剔除选中的"基准"

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			aLeft.push(arr[i]);
		} else {
			aRight.push(arr[i]);
		}
	}

	return quickSort(aLeft).concat(pivot, quickSort(aRight));
}

/**
 * 判断是否是string
 * @param  str
 * @return Boolean
 */
function isString(str) {
	return (typeof str == "string" || str.constructor == String);
}

/**
 * 判断是否是JSON
 * @return Boolean
 */
function isJSON() {
	return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}

/**
 * 获取随机数
 * @param  start 开始(包括)
 * @param  end 结束(包括)
 * @return Number
 */
function getRandom(start, end) {
	var max = Math.max(start, end);
	var min = Math.min(start, end);

	var total = max - min + 1;
	return Math.floor(Math.random() * total + min);

}

/**
 * 获取当前浏览器路径上的参数值
 * @param  parm
 * @return String
 */
function parseQueryString(parm) {
	var sValue = location.search.match(new RegExp("[\?\&]" + parm + "=([^\&]*)(\&?)", "i"));
	return sValue ? decodeURIComponent(sValue[1]) : decodeURIComponent(sValue);
}

/**
 * 传入Url返回键值对
 * @param  url
 * @return object
 */
function parseUrlQueryString(url) {
	var str = url.split("?")[1],
		items = str.split("&");
	var result = {},
		arr = [];
	for (var i = 0; i < items.length; i++) {
		arr = items[i].split("=");
		result[arr[0]] = arr[1];
	}

	return result;
}

/**
 * 获取 url 中的参数
 1. 指定参数名称，返回该参数的值 或者 空字符串
 2. 不指定参数名称，返回全部的参数对象 或者 {}
 3. 如果存在多个同名参数，则返回数组
 console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key'));
 * @param  sUrl
 * @param  sKey
 * @return object
 *
 * */
function getUrlParam(sUrl, sKey) {
	var json = {};
	// 如果不是字符串返回空对象
	if (typeof sUrl !== 'string') {
		return json;
	}

	var pram = sUrl.split("?")[1].split("#")[0].split("&");


	for (var i = 0; i < pram.length; i++) {
		var key = pram[i].split('=')[0];
		var value = pram[i].split('=')[1];

		if (!json[key]) {
			json[key] = [];
		}
		json[key].push(value);
	}

	if (sKey) {
		return json[sKey].length > 1 ? json[sKey] : json[sKey].join("");
	} else {
		return json;
	}

}

/**
 * 类数组转换为数组
 * @param  obj
 * @return Array arr
 */
function toArray(obj) {
	try {
		// Array.prototype.slice.call(obj,0)
		return Array.prototype.slice.call(obj);
	} catch (e) {
		var arr = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			arr[i] = obj[i]; // 这样比push快
		}
		return arr;
	}
}

/**
 * 判断是否是数组
 * @param  obj
 * @return Boolean
 */
function isArray(obj) {
	try {
		return Array.isArray(obj);  // Array.isArray(obj);  ecma5
	} catch (e) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}

}

/**
 * 判断对象是否为函数，如果当前运行环境对可调用对象(如正则表达式)
 * 的typeof返回'function'，采用通用方法，否则采用优化方法
 *
 * @param arg 需要检测是否为函数的对象
 * @return {boolean} 如果参数是函数，返回true，否则false
 */
function isFunction(arg) {
	if (arg) {
		if (typeof (/./) !== 'function') {
			return typeof arg === 'function';
		} else {
			return Object.prototype.toString.call(arg) === '[object Function]';
		}
	}
	return false;
}

/**
 * 数组去重
 * @param  arr
 * @return Array aResult
 */
function arrayDistinct(arr) {
	var aResult = [];
	var json = {};
	for (var i = 0; i < arr.length; i++) {
		if (!json[arr[i]]) { // 判断json中是否有该元素，没有就添加到数组中
			aResult.push(arr[i]);
			json[arr[i]] = 1; // 赋值为1表示上面的判断是否添加到新的数组中
		}
	}
	return aResult; // JSON.stringify() 把数组转为json
}

function deepClone(obj) {
	var _toString = Object.prototype.toString;

	// null, undefined, non-object, function
	if (!obj || typeof obj !== 'object') {
		return obj;
	}

	// DOM Node
	if (obj.nodeType && 'cloneNode' in obj) {
		return obj.cloneNode(true);
	}

	// Date
	if (_toString.call(obj) === '[object Date]') {
		return new Date(obj.getTime());
	}

	// RegExp
	if (_toString.call(obj) === '[object RegExp]') {
		var flags = [];
		if (obj.global) {
			flags.push('g');
		}
		if (obj.multiline) {
			flags.push('m');
		}
		if (obj.ignoreCase) {
			flags.push('i');
		}

		return new RegExp(obj.source, flags.join(''));
	}

	var result = Array.isArray(obj) ? [] :
		obj.constructor ? new obj.constructor() : {};

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			result[key] = deepClone(obj[key]);
		}
	}

	return result;
}

/**
 *  使用{}作为转义标记，中间的数字表示替换目标，format实参用来替换模板内标记
 *
 *  var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
 console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
 *
 * */
function stringFormat(str) {
	var arg = Array.prototype.slice.call(arguments, 0);
	return this.str.replace(/\{\s*(\d+)\s*\}/g, function (a, b) {
		return arg[b] || '';
	});
}

// 判断原型中有的属性
function isProperty(obj, attr) {
	return !obj.hasOwnProperty(attr) && (attr in obj);

}

// 判断是否支持css3
var supports = (function () {
	var div = document.createElement('div'),
		vendors = 'Khtml Ms O Moz Webkit'.split(' '),
		len = vendors.length;

	return function (prop) {

		if (prop in div.style) return true;

		prop = prop.replace(/^[a-z]/, function (val) {
			return val.toUpperCase();
		});

		while (len--) {
			if (vendors[len] + prop in div.style) {
				return true;
			}
		}
		return false;
	};
})();

var isType = function (type) {

	return function (obj) {
		return Object.prototype.toString.call(obj) === "[object " + type + "]";
	};
};

function findCharInStrPos(char, str) {
	var arr = [],
		pos = str.indexOf(char);
	while (pos > -1) {
		arr.push(pos);
		pos = str.indexOf(char, pos + 1);
	}
	return arr;
}

function selectForm(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

// 判断属性是存在于实例中还是存在于原型中
function hasOwnPrototypeProperty(obj, name) {
	return !obj.hasOwnProperty(name) && (name in obj);
}

// 获取绝对的url 用法 getAbsoluteUrl('/something');
var getAbsoluteUrl = (function () {
	var a;
	return function (url) {
		if (!a) a = document.createElement('a');
		a.href = url;

		return a.href;
	};
})();

// 字符串长度截取
function cutstr(str, len) {
	var temp,
		icount = 0,
		patrn = /[^\x00-\xff]/,
		strre = "";
	for (var i = 0; i < str.length; i++) {
		if (icount < len - 1) {
			temp = str.substr(i, 1);
			if (patrn.exec(temp) == null) {
				icount = icount + 1;
			} else {
				icount = icount + 2;
			}
			strre += temp;
		} else {
			break;
		}
	}
	return strre + "...";
}

// 替换全部
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};

// 清除空格
String.prototype.trim = function () {
	var reExtraSpace = /^\s*(.*?)\s+$/;
	return this.replace(reExtraSpace, "$1")
};

// 清除左右空格
function ltrim(s) {
	return s.replace(/^(\s*|　*)/, "");
}
function rtrim(s) {
	return s.replace(/(\s*|　*)$/, "");
}

// 判断是否以某个字符串开头
String.prototype.startWith = function (s) {
	return this.indexOf(s) == 0;
};

// 判断是否以某个字符串结束
String.prototype.endWith = function (s) {
	var d = this.length - s.length;
	return (d >= 0 && this.lastIndexOf(s) == d);
};

// 转义html标签
function HtmlEncode(text) {
	return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
}

// 时间日期格式转换
Date.prototype.Format = function (formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, (this.getMonth() + 1));
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
};

// 判断是否为数字类型
function isDigit(value) {
	var patrn = /^[0-9]*$/;
	return (patrn.exec(value) == null || value == "");
}


// 加入收藏夹
function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

// 设为首页
function setHomepage() {
	if (document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage('http://w3cboy.com');
	} else if (window.sidebar) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage', 'http://w3cboy.com')
	}
}

// 为元素添加trigger方法
Element.prototype.trigger = function (type, data) {
	var event = document.createEvent('HTMLEvents');
	event.initEvent(type, true, true);
	event.data = data || {};
	event.eventName = type;
	event.target = this;
	this.dispatchEvent(event);
	return this;
};

NodeList.prototype.trigger = function (event) {
	[]['forEach'].call(this, function (el) {
		el['trigger'](event);
	});
	return this;
};

// 完美判断是否为网址
function IsURL(strUrl) {
	var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
	if (regular.test(strUrl)) {
		return true;
	} else {
		return false;
	}
}

// getElementsByClassName
function getElementsByClassName(name) {
	var tags = document.getElementsByTagName('*') || document.all;
	var els = [];
	for (var i = 0; i < tags.length; i++) {
		if (tags.className) {
			var cs = tags.className.split(' ');
			for (var j = 0; j < cs.length; j++) {
				if (name == cs[j]) {
					els.push(tags);
					break
				}
			}
		}
	}
	return els
}

// 获取页面高度
function getPageHeight() {
	var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
		? a
		: g.documentElement;
	return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}

// 获取页面scrollLeft
function getPageScrollLeft() {
	var a = document;
	return a.documentElement.scrollLeft || a.body.scrollLeft;
}

// 获取页面可视宽度
function getPageViewWidth() {
	var d = document, a = d.compatMode == "BackCompat"
		? d.body
		: d.documentElement;
	return a.clientWidth;
}

// 获取页面宽度
function getPageWidth() {
	var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
		? a
		: g.documentElement;
	return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

// 获取页面scrollTop
function getPageScrollTop() {
	var a = document;
	return a.documentElement.scrollTop || a.body.scrollTop;
}

// 获取页面可视高度
function getPageViewHeight() {
	var d = document, a = d.compatMode == "BackCompat"
		? d.body
		: d.documentElement;
	return a.clientHeight;
}

// 去掉url前缀
function removeUrlPrefix(a) {
	a = a.replace(/：/g, ":").replace(/．/g, ".").replace(/／/g, "/");
	while (trim(a).toLowerCase().indexOf("http://") == 0) {
		a = trim(a.replace(/http:\/\//i, ""));
	}
	return a;
}

// 随机数时间戳
function uniqueId() {
	var a = Math.random, b = parseInt;
	return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}

// 全角半角转换 iCase: 0全到半，1半到全，其他不转化
function chgCase(sStr, iCase) {
	if (typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)) {
		return sStr;
	}
	var i, oRs = [], iCode;
	if (iCase) {/*半->全*/
		for (i = 0; i < sStr.length; i += 1) {
			iCode = sStr.charCodeAt(i);
			if (iCode == 32) {
				iCode = 12288;
			} else if (iCode < 127) {
				iCode += 65248;
			}
			oRs.push(String.fromCharCode(iCode));
		}
	} else {/*全->半*/
		for (i = 0; i < sStr.length; i += 1) {
			iCode = sStr.charCodeAt(i);
			if (iCode == 12288) {
				iCode = 32;
			} else if (iCode > 65280 && iCode < 65375) {
				iCode -= 65248;
			}
			oRs.push(String.fromCharCode(iCode));
		}
	}
	return oRs.join("");
}

// alert(new Date().format("yyyy-MM-dd hh:mm:ss"));日期格式化函数+调用方法
Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(),    //day
		"h+": this.getHours(),   //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S": this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (o.hasOwnProperty(k)) {
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

// 时间个性化输出功能
/*
 1、< 60s, 显示为“刚刚”
 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 */
function timeFormat(time) {
	var date = new Date(time),
		curDate = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 10,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		curYear = curDate.getFullYear(),
		curHour = curDate.getHours(),
		timeStr;

	if (year < curYear) {
		timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
	} else {
		var pastTime = curDate - date,
			pastH = pastTime / 3600000;

		if (pastH > curHour) {
			timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
		} else if (pastH >= 1) {
			timeStr = '今天 ' + hour + ':' + minute + '分';
		} else {
			var pastM = curDate.getMinutes() - minute;
			if (pastM > 1) {
				timeStr = pastM + '分钟前';
			} else {
				timeStr = '刚刚';
			}
		}
	}
	return timeStr;
}

// 解决offsetX兼容性问题
// 针对火狐不支持offsetX/Y
function getOffset(e) {
	var target = e.target, // 当前触发的目标对象
		eventCoord,
		pageCoord,
		offsetCoord;

	// 计算当前触发元素到文档的距离
	pageCoord = getPageCoord(target);

	// 计算光标到文档的距离
	eventCoord = {
		X: window.pageXOffset + e.clientX,
		Y: window.pageYOffset + e.clientY
	};

	// 相减获取光标到第一个定位的父元素的坐标
	offsetCoord = {
		X: eventCoord.X - pageCoord.X,
		Y: eventCoord.Y - pageCoord.Y
	};
	return offsetCoord;
}

function getPageCoord(element) {
	var coord = {X: 0, Y: 0};
	// 计算从当前触发元素到根节点为止，
	// 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和
	while (element) {
		coord.X += element.offsetLeft;
		coord.Y += element.offsetTop;
		element = element.offsetParent;
	}
	return coord;
}

// backTop('goTop'); 返回顶部的通用方法
function backTop(btnId) {
	var btn = document.getElementById(btnId);
	var d = document.documentElement;
	var b = document.body;
	window.onscroll = set;
	btn.style.display = "none";
	btn.onclick = function () {
		btn.style.display = "none";
		window.onscroll = null;
		this.timer = setInterval(function () {
			d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
			b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
			if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
		}, 10);
	};
	function set() {
		btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
	}
}

// 按字母排序，对每行进行数组排序
function SetSort() {
	var text = K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序
	var test = K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序
	K1.value = K1.value != text ? text : test;
}

// 字符串反序
function IsReverse(text) {
	return text.split('').reverse().join('');
}










































