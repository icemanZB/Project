create(aData);
function create(aData) {
    var oPage = document.getElementById("page");
    var oList = document.getElementsByClassName("picList")[0];
    var aLi = oList.getElementsByTagName("li");
    var aBtns = oPage.getElementsByClassName("btn");
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
            aBtns[1].innerHTML = "选择";
            aBtns[0].style.display = "none";
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].style.opacity = 1;
                aLi[j].removeEventListener("touchend", fnSelected, false); // 取消后删除事件
            }
            aRemove.length = 0;  // 清空数组
        }
        bOff = !bOff;
    }

    // 图片选中事件
    function fnSelected() {
        aRemove.push(this.index);  // 点击的时候把删除图片的index push到arr中
        console.log(this);
        this.style.opacity = 0.1;
        aBtns[0].style.display = "block";
    }

    function fnRemove() {
        // 由于用户点击是很随意的，所以上来要先给数组从小到大的顺序排序
        aRemove = aRemove.sort(function (a, b) {
            return a - b;
        });
        while (aRemove.length) {
            var iNum = aRemove.pop(); // 从后往前删，为了不改变数组中的顺序
            oList.removeChild(aLi[iNum]);
        }
        bOff = false;
        toPosition();
        fnEnd();
    }
}
