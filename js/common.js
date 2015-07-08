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


var getElementLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
};

// alert(addDate('2015/07/07',31));
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
}

