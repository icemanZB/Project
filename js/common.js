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
        el.attachEvent('on' + event, fn);
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
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return {
        x: ev.clientX + scrollLeft,
        y: ev.clientY + scrollTop
    };
};

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



