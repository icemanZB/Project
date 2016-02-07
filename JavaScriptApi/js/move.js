function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, null)[name];
	}
}


function startMove(obj, attr, iTarget) {
	clearInterval(obj.time);
	// offsetWidth 若现在样式表中有border 他会把他算进去
	// 那减出来的就错了 越减越大
	obj.time = setInterval(function() {
		var cur = 0;

		if (attr == 'opacity') {
			cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
		} else {
			cur = parseInt(getStyle(obj, attr));
		}

		var speed = (iTarget - cur) / 6;

		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		if (cur == iTarget) {
			clearInterval(obj.time);
		} else {
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity=' + cur + speed + ')';
				obj.style.opacity = (cur + speed) / 100;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
	}, 30);
}

