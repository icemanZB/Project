function id(obj) {
    return document.getElementById(obj);
}

function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function () {
            fn.call(obj);
        });
    }
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

// 制作进场动画是为了后续页面一些图片元素和其他内容的预加载准备的
function fnLoad() {
    var iTime = new Date().getTime();
    var oW = id("welcome");
    // var arr = [""];
    var bImgLoad = true; // 判断图片是否加载完成
    var bTime = false;  // 判断动画是否执行完成
    var oTimer = null;
    // 动画执行完成后，去掉oW的pageShow样式
    bind(oW, "webkitTransitionEnd", end);
    bind(oW, "transitionend", end);
    oTimer = setInterval(function () {
        // 整个欢迎页面的动画是5s的  现在的时间-之前的时间 >=5000 说明动画完成
        if (new Date().getTime() - iTime >= 5000) {
            bTime = true;
        }
        if (bImgLoad && bTime) {
            clearInterval(oTimer);
            oW.style.opacity = 0;
        }
    }, 1000);

    function end() {
        removeClass(oW, "pageShow");
        fnTab();
    }
    // 这里暂时没有写
    /*for(var i=0;i<arr.length;i++)
     {
     var oImg=new Image();
     oImg.src=arr[i];
     oImg.onload=function()
     {

     }

     }*/
}

function fnTab() {
    var oTab = id("tabPic");
    var oList = id("picList");
    var aNav = oTab.getElementsByTagName("nav")[0].children;
    var iNow = 0;
    var iX = 0;  // 就是控制 translateX(-100px)
    var iW = view().w;  // 屏幕宽度 640
    var oTimer = 0;
    var iStartTouchX = 0;
    var iStartX = 0;
    bind(oTab, "touchstart", fnStart); // 手指按下 ( 相当于onmousedown )
    bind(oTab, "touchmove", fnMove); // 手指移动 ( 相当于onmousemove )
    bind(oTab, "touchend", fnEnd); // 手指抬起来 ( 相当于onmouseup )
    auto();
    if (!window.BfnScore) {
        fnScore();
        window.BfnScore = true;
    }

    function auto() {
        oTimer = setInterval(function () {
            iNow++;
            iNow = iNow % aNav.length; // 过界处理
            tab();
        }, 2000);
    }

    function fnStart(ev) {
        oList.style.transition = "none";
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX; // 当前手指的位置
        iStartX = iX; // 当前元素的位置
        clearInterval(oTimer);
    }

    function fnMove(ev) {
        ev = ev.changedTouches[0];
        // ev.pageX 当前手指屏幕的位置 - 一开始手指按下的位置，求出手指在屏幕移动的距离
        var iDis = ev.pageX - iStartTouchX;
        iX = iStartX + iDis; // 设置元素的距离
        oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
    }

    function fnEnd() {
        iNow = iX / iW; // 当拖动距离比较大的时候，就显示下一张图片，当拖动距离比较小的时候就显示当前图片
        iNow = -Math.round(iNow);
        if (iNow < 0) {
            iNow = 0;
        }
        if (iNow > aNav.length - 1) {
            iNow = aNav.length - 1;
        }
        tab();
        auto();
    }

    function tab() {
        iX = -iNow * iW;
        oList.style.transition = "0.5s"; // 加上动画效果
        oList.style.WebkitTransform = oList.style.transform = "translateX(" + iX + "px)";
        for (var i = 0; i < aNav.length; i++) {
            removeClass(aNav[i], "active");
        }
        addClass(aNav[iNow], "active");
    }
}

function fnScore() {
    var oScore = id("score");
    var aLi = oScore.getElementsByTagName("li");
    var arr = ["好失望", "没有想象的那么差", "很一般", "良好", "棒极了"];
    for (var i = 0; i < aLi.length; i++) {
        fn(aLi[i]);
    }

    function fn(oLi) {
        var aNav = oLi.getElementsByTagName("a");
        var oInput = oLi.getElementsByTagName("input")[0];
        for (var i = 0; i < aNav.length; i++) {
            aNav[i].index = i;
            bind(aNav[i], "touchstart", function () {
                for (var i = 0; i < aNav.length; i++) {
                    if (i <= this.index) {
                        addClass(aNav[i], "active");
                    } else {
                        removeClass(aNav[i], "active");
                    }
                }
                oInput.value = arr[this.index];
            });
        }
    }

    fnIndex();
}

function fnInfo(oInfo, sInfo) {
    oInfo.innerHTML = sInfo;
    oInfo.style.WebkitTransform = "scale(1)";
    oInfo.style.opacity = 1;
    setTimeout(function () {
        oInfo.style.WebkitTransform = "scale(0)";
        oInfo.style.opacity = 0;
    }, 1000);
}

function fnIndex() {
    var oIndex = id("index");
    var oBtn = oIndex.getElementsByClassName("btn")[0];
    var oInfo = oIndex.getElementsByClassName("info")[0];
    var bScore = false;
    bind(oBtn, "touchend", fnEnd);

    function fnEnd() {
        bScore = fnScoreChecked();
        if (bScore) {
            if (bTag()) {
                fnIndexOut();
            } else {
                fnInfo(oInfo, "给景区添加标签");
            }
        } else {
            fnInfo(oInfo, "给景区评分");
        }
    }

    function fnScoreChecked() {
        var oScore = id("score");
        var aInput = oScore.getElementsByTagName("input");
        for (var i = 0; i < aInput.length; i++) {
            if (aInput[i].value == 0) {
                return false;
            }
        }
        return true;
    }

    function bTag() {
        var oTag = id("indexTag");
        var aInput = oTag.getElementsByTagName("input");
        for (var i = 0; i < aInput.length; i++) {
            if (aInput[i].checked) {
                return true;
            }
        }
        return false;
    }
}

function fnIndexOut() {
    var oMask = id("mask");
    var oIndex = id("index");
    var oNew = id("news");
    addClass(oMask, "pageShow");
    addClass(oNew, "pageShow");
    fnNews();
    setTimeout(function () {
        oMask.style.opacity = 1;
        oIndex.style.WebkitFilter = oIndex.style.filter = "blur(5px)";
    }, 14);
    setTimeout(function () {
        oNew.style.transition = "0.5s";
        oMask.style.opacity = 0;
        oIndex.style.WebkitFilter = oIndex.style.filter = "blur(0px)";
        oNew.style.opacity = 1;
        removeClass(oMask, "pageShow");
    }, 3000);
}

function fnNews() {
    var oNews = id("news");
    var oInfo = oNews.getElementsByClassName("info")[0];
    var aInput = oNews.getElementsByTagName("input");
    aInput[0].onchange = function () {
        if (this.files[0].type.split("/")[0] == "video") {
            fnNewsOut();
            this.value = "";
        } else {
            fnInfo(oInfo, "请上传视频");
        }
    };
    aInput[1].onchange = function () {
        if (this.files[0].type.split("/")[0] == "image") {
            fnNewsOut();
            this.value = "";
        } else {
            fnInfo(oInfo, "请上传图片");
        }
    };
}

function fnNewsOut() {
    var oNews = id("news");
    var oForm = id("form");
    addClass(oForm, "pageShow");
    oNews.style.cssText = "";
    removeClass(oNews, "pageShow");
    formIn();
}

function formIn() {
    var oForm = id("form");
    var oOver = id("over");
    var aFormTag = id("formTag").getElementsByTagName("label");
    var oBtn = oForm.getElementsByClassName("btn")[0];
    var bOff = false;
    for (var i = 0; i < aFormTag.length; i++) {
        bind(aFormTag[i], "touchend", function () {
            bOff = true;
            addClass(oBtn, "submit");
        });
    }
    bind(oBtn, "touchend", function () {
        if (bOff) {
            for (var i = 0; i < aFormTag.length; i++) {
                aFormTag[i].getElementsByTagName("input")[0].checked = false;
            }
            bOff = false;
            addClass(oOver, "pageShow");
            removeClass(oForm, "pageShow");
            removeClass(oBtn, "submit");
            over();
        }
    });
}

function over() {
    var oOver = id("over");
    var oBtn = oOver.getElementsByClassName("btn")[0];
    bind(oBtn, "touchend", function () {
        removeClass(oOver, "pageShow");
    });
}
