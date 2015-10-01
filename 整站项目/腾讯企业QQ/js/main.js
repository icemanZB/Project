window.onload = function () {
    qq.app.toBanner();
};

var qq = {};

qq.ui = {};

qq.ui.fadeIn = function (aOliObj, aLiObj) {
    aOliObj.getElementsByTagName('a')[0].className = 'active';

    aLiObj.style.display = 'block';

    startMove(aLiObj, {opacity: 100});

};

qq.ui.fadeOut = function (aOliObj, aLiObj) {
    aOliObj.getElementsByTagName('a')[0].className = '';

    aLiObj.style.display = 'none';

    startMove(aLiObj, {opacity: 0});
};

qq.app = {};


qq.app.toBanner = function () {
    var oBanner = document.getElementById('banner'),
        oUl = oBanner.getElementsByTagName('ul')[0],
        aLi = oUl.getElementsByTagName('li'),
        ol = oBanner.getElementsByTagName('ol')[0],
        aOlLi = ol.getElementsByTagName('li'),
        iNow = 0,
        timer = null;

    function autoPlay() {
        iNow++;
        if (iNow === aOlLi.length) {
            iNow = 0;
        }

        for (var i = 0; i < aLi.length; i++) {
            qq.ui.fadeOut(aOlLi[i], aLi[i]);
        }

        qq.ui.fadeIn(aOlLi[iNow], aLi[iNow]);

    }

    timer = setInterval(autoPlay, 2000);

    oBanner.onmouseover = function () {
        clearInterval(timer);
    };

    oBanner.onmouseout = function () {
        timer = setInterval(autoPlay, 2000);
    };

    for (var i = 0; i < aOlLi.length; i++) {
        aOlLi[i].index = i;
        aOlLi[i].onmouseover = function () {
            for (var i = 0; i < aOlLi.length; i++) {
                qq.ui.fadeOut(aOlLi[i], aLi[i]);
            }
            iNow = this.index;
            qq.ui.fadeIn(aOlLi[iNow], aLi[iNow]);
        };
    }
};








