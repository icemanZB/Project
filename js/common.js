/*
 * 事件绑定
 * addEvent('id','click',function(){ console.log(1);  });
 * addEvent('id','click',function(){ console.log(2);  });
 *
 * */
var addEvent = function (id, event, fn) {
    var el = document.getElementById(id) || document;
    if (el.addEventListener) {
        el.addEventListener(event, fn, false);
    } else {
        el.attachEvent('on' + event, function () {
            fn.call(el);
        });
    }
};

var removeEvent = function (obj, evname, fn) {
    if (obj.detachEvent) {
        obj.detachEvent('on' + evname, fn);
    } else {
        obj.removeEventListener(evname, fn, false);
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
    var result = d.getFullYear() + "/" + month + "/" + day;
    return result;
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