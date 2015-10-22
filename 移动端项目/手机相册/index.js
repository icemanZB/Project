window.onload = fnLoad;
function fnLoad() {
    var oPage = document.getElementById("page");
    var oWrap = document.getElementById("wrap");
    var oList = oWrap.children[0];
    var aImg = oWrap.getElementsByTagName("li");
    var aBtn = document.getElementById("btn");
    var aBtn2 = document.getElementById("btn2");
    var oRecycle = document.getElementById("recycle");
    var oRecycle2 = document.getElementById("recycle2");
    var bOff = true;
    var arr = [];
    var iCeil = 3;
    var bStart = true;
    var oScroll = new mScroll("wrap", "y");
    oList.style.height = Math.ceil(aImg.length / iCeil) + "rem";
    aBtn.addEventListener("touchend", init, false);
    aBtn2.addEventListener("touchend", fnDel, false);
    oScroll.onScrollMove = function () {
        selected();
    };
    selected();
    function selected() {
        for (var i = 0; i < aImg.length; i++) {
            aImg[i].style.transition = "1s";
            if (aImg[i].offsetTop >= Math.abs(oScroll.iScroll) && aImg[i].offsetTop + aImg[i].offsetHeight <= Math.abs(oScroll.iScroll) + oWrap.clientHeight) {
                aImg[i].className = "show";
            }
            else {
                aImg[i].className = "";
            }
        }
    }

    function init() {
        if (bOff) {
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].index = i;
                aImg[i].addEventListener("touchend", fnRemove, false);
            }
            aBtn.innerHTML = "取消";
        }
        else {
            var aPicBox = oPage.getElementsByClassName("picBox");
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].removeEventListener("touchend", fnRemove, false);
            }
            aBtn.innerHTML = "选择";
            aBtn2.style.display = "none";
            for (var i = 0; i < aPicBox.length; i++) {
                fn3dOpen(aPicBox[i]);
            }
            arr.length = 0;
        }
        bOff = !bOff;
    }

    function fnDel() {
        var aPicBox = oPage.getElementsByClassName("picBox");
        var oTimer = null;
        oRecycle2.className = oRecycle.className = "recycleUp2";
        for (var i = 0; i < aPicBox.length; i++) {
            aPicBox[i].style.transition = ".5s .3s top,.3s left";
            aPicBox[i].style.left = (oPage.clientWidth - aPicBox[i].offsetWidth) / 2 - 10 + "px";
            aPicBox[i].style.top = "calc(100% - 10px)";
            aPicBox[i].addEventListener("webkitTransitionEnd", end, false);
            aPicBox[i].addEventListener("transitionend", end, false);
        }
        function end(ev) {
            if (ev.propertyName == "top") {
                arr.push(this.index);
                oPage.removeChild(this);
                if (!oTimer) {
                    oTimer = setTimeout(function () {
                        oRecycle2.addEventListener("webkitTransitionEnd", end2, false);
                        oRecycle2.addEventListener("transitionend", end2, false);
                        oRecycle2.className = oRecycle.className = "";
                        oRecycle2.style.cssText = oRecycle.style.cssText = "";
                    }, 300);
                }
            }
        }

        function end2() {
            // var i = 0;
            this.removeEventListener("webkitTransitionEnd", end2, false);
            this.removeEventListener("transitionend", end2, false);
            arr = arr.sort(function (a, b) {
                return a - b;
            });
            while (arr.length) {
                var iNub = arr.pop();
                oList.removeChild(aImg[iNub]);
            }
            init();
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].style.transition = ".5s";
            }
            toSize();
        }
    }

    function fnRemove() {
        if (this.className != "show") {
            return;
        }
        aBtn2.style.display = "block";
        oRecycle2.className = oRecycle.className = "recycleUp";
        fn3dCreate(this.index);
    }

    toSize();
    function toSize() {
        for (var i = 0; i < aImg.length; i++) {
            aImg[i].index = i;
            if (bStart) {
                aImg[i].style.backgroundImage = "url(video/" + (i + 1) + ".jpg)";
            }
            aImg[i].style.cssText += "position:absolute;left:" + (i % iCeil) + "rem;top:" + (Math.floor(i / iCeil)) + "rem";
        }
        oList.style.height = Math.ceil(aImg.length / iCeil) + "rem";
        setTimeout(function () {
            selected();
        }, 500);
        if (bStart) {
            bStart = false;
        }
    }

    function fn() {
        this.style.transition = "0s";
        this.removeEventListener("webkitTransitionEnd", fn, false);
        this.removeEventListener("transitionend", fn, false);
    }

    function fn3dCreate(index) {
        var oLi = aImg[index];
        var oBox = document.createElement("div");
        var iWidth = oLi.clientWidth;
        var iHeight = oLi.clientHeight;
        var iLeft = fnOffset(oLi).l + 1;
        var iTop = fnOffset(oLi).t + 1 + oScroll.iScroll;
        var sBg = getComputedStyle(oLi)["backgroundImage"];
        var aDiv = oBox.getElementsByTagName("div");
        oBox.index = index;
        oBox.innerHTML = "<div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>";
        oBox.className = "picBox";
        oBox.style.width = iWidth + "px";
        oBox.style.height = iHeight + "px";
        oBox.style.left = iLeft + "px";
        oBox.style.top = iTop + "px";
        oPage.appendChild(oBox);
        var iDivW = Math.ceil(iWidth / aDiv.length);
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].style.width = iDivW + "px";
            aDiv[i].style.left = iDivW + "px";
            aDiv[i].style.backgroundImage = sBg;
            aDiv[i].style.backgroundPosition = -iDivW * i + "px 0";
        }
        oLi.style.backgroundSize = "0px 0px";
        fn3dClos(oBox, aDiv);
    }

    function fn3dClos(oBox, aDiv) {
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].style.transition = ".8s";
        }
        setTimeout(function () {
            oBox.className = "picBox picBoxOpen";
        }, 30);
    }

    function fn3dOpen(oBox) {
        var aDiv = oBox.getElementsByTagName("div");
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].style.transition = ".4s";
        }
        oBox.className = "picBox";
        aDiv[i - 1].addEventListener("webKitTransitionEnd", end, false);
        aDiv[i - 1].addEventListener("transitionend", end, false);
        function end() {
            this.removeEventListener("transitionend", end, false);
            this.removeEventListener("webKitTransitionEnd", end, false);
            aImg[oBox.index].style.backgroundSize = "cover";
            oPage.removeChild(oBox);
        }
    }
}
;
function fnOffset(obj) {
    var t = l = 0;
    while (obj) {
        t += obj.offsetTop;
        l += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {l: l, t: t};
}
