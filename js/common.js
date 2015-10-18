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
 * delegateEvent('li',click,function(){  console.log(1);  });
 *
 * */
var delegateEvent = function () {
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
        if (arr2[0] = name) {
            return arr2[1];
        }
    }

    return '';
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

    return quickSort(left).concat(pivot, quickSort(aRight));
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
    return Object.prototype.toString.call(obj) === 'object Array';
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