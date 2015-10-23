create(aData);
function open3D(obj) {
    var aDiv = obj.getElementsByTagName("div");
    for (var i = 0; i < aDiv.length; i++) {
        aDiv[i].style.transition = "0.5s";
        aDiv[i].className = "show";
    }
}
function clos3D(obj, oLi) {
    var aDiv = obj.getElementsByTagName("div");
    aDiv[aDiv.length - 1].addEventListener("webkitTransitionEnd", fn, false);
    aDiv[aDiv.length - 1].addEventListener("transitionend", fn, false);
    for (var i = 0; i < aDiv.length; i++) {
        aDiv[i].style.transition = "0.5s";
        aDiv[i].className = "";
    }
    function fn() {
        var oPage = document.getElementById("page");
        aDiv[aDiv.length - 1].removeEventListener("webkitTransitionEnd", fn, false);
        aDiv[aDiv.length - 1].removeEventListener("transitionend", fn, false);
        oLi.style.opacity = 1;
        oPage.removeChild(obj);  // 去掉3d图的div
    }
}
function getOffset(obj) {
    var l = 0;
    var t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {l: l, t: t};
}
function create(aData) {
    var oPage = document.getElementById("page");
    var oList = document.getElementsByClassName("picList")[0];
    var aLi = oList.getElementsByTagName("li");
    var aBtns = oPage.getElementsByClassName("btn");
    var aRecycle = oPage.getElementsByClassName("recycle");
    var aPicBox = oPage.getElementsByClassName("picBox");
    var sHtml = "";
    var aRemove = [];  // 存删除的图片
    var bOff = true;
    for (var i = 0; i < aData.length; i++) {
        sHtml += "<li style='background-image:url(" + aData[i] + ");'></li>"
    }
    oList.innerHTML = sHtml;
    setTimeout(toPosition, 60); // 延迟60ms，为了让 transition 起效果
    aBtns[1].addEventListener("touchend", fnEnd, false);
    aBtns[0].addEventListener("touchend", fnRemove, false);
    function toPosition() {
        /*
         *   0 left:0,top:0
         *   1 left:1,top:0
         *   2 left:2,top:0
         *   3 left:0,top:1
         *   4 left:1,top:1
         *   5 left:2,top:1
         * */
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].style.left = i % 3 + "rem";
            aLi[i].style.top = Math.floor(i / 3) + "rem";
        }
    }

    function fnEnd() {
        if (bOff) {
            aBtns[1].innerHTML = "取消";
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index = i;
                aLi[i].addEventListener("touchend", fnSelected, false);
            }
        }
        else {
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].removeEventListener("touchend", fnSelected, false); // 取消后删除事件
            }
            for (var k = 0; k < aRemove.length; k++) {
                clos3D(aPicBox[k], aLi[aRemove[k]]);
            }
            aRemove.length = 0;  // 清空数组
            aBtns[1].innerHTML = "选择";
            aBtns[0].style.display = "none";
        }
        bOff = !bOff;
    }

    // 图片选中事件
    function fnSelected() {
        aRemove.push(this.index);  // 点击的时候把删除图片的index push到arr中
        this.style.opacity = 0;
        aBtns[0].style.display = "block";
        aRecycle[0].style.top = aRecycle[1].style.top = "calc(100% - 0.4rem)";
        create3d(this);
    }

    function create3d(oLi) {
        var oDiv = document.createElement("div");
        var oXy = getOffset(oLi);
        oDiv.className = "picBox";
        oDiv.style.backgroundImage = oLi.style.backgroundImage;
        oDiv.style.left = oXy.l + "px";
        oDiv.style.top = oXy.t + "px";
        oDiv.innerHTML = '<div><div style="background-position:-0.1rem 0;"><div style="background-position:-0.2rem 0;"><div style="background-position:-0.3rem 0;"><div style="background-position:-0.4rem 0;"><div style="background-position:-0.5rem 0;"><div style="background-position:-0.6rem 0;"><div style="background-position:-0.7rem 0;"><div style="background-position:-0.8rem 0;"><div style="background-position:-0.9rem 0;"></div></div></div></div></div></div></div></div></div></div>';
        oPage.appendChild(oDiv);
        setTimeout(function () {
            open3D(oDiv);
        }, 30);
    }

    function fnRemove() {
        // 由于用户点击是很随意的，所以上来要先给数组从小到大的顺序排序
        aRemove = aRemove.sort(function (a, b) {
            return a - b;
        });
        // 默认设置的top是100%，所以是100% - 0.6rem  0.6是测试后的数字
        aRecycle[0].style.top = aRecycle[1].style.top = "calc(100% - 0.6rem)";
        for (var i = 0; i < aRemove.length; i++) {
            fnDle(i);
        }
        setTimeout(function () {
            aRecycle[0].className = aRecycle[1].className = "recycle recycleShow";
            while (aRemove.length) {
                oPage.removeChild(aPicBox[aRemove.length - 1]);
                var iNub = aRemove.pop();   // 从后往前删，为了不改变数组中的顺序
                oList.removeChild(aLi[iNub]);
            }
            toPosition();
            fnEnd();
        }, 650);
        // 隐藏垃圾桶
        setTimeout(function () {
            aRecycle[0].style.top = aRecycle[1].style.top = "100%";
        }, 1000);
    }

    function fnDle(i) {
        var obj = aPicBox[i];
        // var oLi = aLi[aRemove[i]];
        obj.style.transition = ".3s left,.5s 0.3s top";
        obj.style.left = "calc(50% - 0.5rem)"; // 居中
        obj.style.top = "100%";
    }
}
