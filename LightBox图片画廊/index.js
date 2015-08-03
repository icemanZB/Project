;
(function($) {

	var LightBox = function(settings) {
		var self = this;

		this.settings = {
			speed: 500
		};

		$.extend(this.settings, settings || {});

		// 创建遮罩和弹出框
		this.mask = $('<div id="lightbox-mask">');
		this.popup = $('<div id="lightbox-popup">');
		// 保存 body 标签
		this.bodyNode = $(document.body);
		this.groupName = null; // 通过组名获取页面中同一组的数据
		this.groupData = []; // 存储一组的数据

		// 渲染剩余的 DOM 并且插入到 BODY 中去
		this.renderDom();

		// 图片预览区域
		this.picViewArea = this.popup.find('.lightbox-pic-view');
		// 图片
		this.popupPic = this.popup.find('.lightbox-img');
		// 图片标题区域
		this.picCaptionArea = this.popup.find('.lightbox-pic-caption');
		this.nextBtn = this.popup.find('.next');
		this.prevBtn = this.popup.find('.prev');
		// 图片描述
		this.captionText = this.popup.find('.lightbox-pic-desc');
		// 图片当前索引
		this.curIndex = this.popup.find('.lightbox-of-index');
		this.closeBtn = this.popup.find('.lightbox-close');

		// 获取页面需要使用 LightBox 插件的图片 使用事件委托来获取提高性能
		// var aLightBox=$('.js-lightbox,[data-role=lightbox]'); 不使用传统的形式获取
		// 防止后面动态加载出来的图片没有事件
		this.bodyNode.on('click', 'img.js-lightbox,img[data-role=lightbox]', function(ev) {
			// 当我点击图片的时候不希望冒泡他父级上,如果他父级有人为绑定的click事件的话,那会影响到
			ev.stopPropagation(); // 阻止事件冒泡

			var curGroupName = $(this).data('group'); // 当前的组名

			// 为了防止重复获取数据
			// 点击的时候是属于同一组的,下一次点击还是同一组的,那就表示这一组的数据已经获取过了
			if (curGroupName !== self.groupName) {
				self.groupName = curGroupName;

				// 根据当前组名,获取同一组数据,放到 this.groupData 数组里面
				self.getGroupData();
			}

			// 初始化弹框 传入当前点击的对象
			self.initPopup($(this));

		});

		// 关闭弹出框
		this.mask.click(function() {
			$(this).fadeOut();
			self.popup.fadeOut();
			self.clear = false;
		});

		this.closeBtn.click(function() {
			self.mask.fadeOut();
			self.popup.fadeOut();
			self.clear = false;
		});

		this.flag = true;

		// 绑定上下切换的事件
		this.nextBtn.hover(function() {
			if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
				$(this).addClass('next-show');
			}
		}, function() {
			if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
				$(this).removeClass('next-show');
			}
		}).click(function(ev) {
			if (!$(this).hasClass('disabled') && self.flag) {
				self.flag = false;
				ev.stopPropagation();
				self.tabClick("next");
			}
		});

		this.prevBtn.hover(function() {
			if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
				$(this).addClass('prev-show');
			}
		}, function() {
			if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
				$(this).removeClass('prev-show');
			}
		}).click(function(ev) {
			if (!$(this).hasClass('disabled') && self.flag) {
				self.flag = false;
				ev.stopPropagation();
				self.tabClick("prev");
			}
		});

		// 绑定窗口调整事件
		var timer = null;
		this.clear = false;
		$(window).resize(function() {
			if (self.clear) {
				// 防止连续调整
				clearTimeout(timer);
				timer = setTimeout(function() {
					self.loadPicSize(self.groupData[self.index].src);
				}, 500);
			}

		});

	};
	LightBox.prototype = {

		tabClick: function(dir) {
			var srcPic = "";
			if (dir === "next") {
				this.index++;
				if (this.index >= this.groupData.length - 1) {
					this.nextBtn.addClass('disabled').removeClass('next-show');
				}
				// 显示向上切换的按钮
				if (this.index !== 0) {
					this.prevBtn.removeClass('disabled');
				}

				srcPic = this.groupData[this.index].src;

				this.loadPicSize(srcPic);

			} else if (dir === "prev") {
				this.index--;
				if (this.index <= 0) {
					this.prevBtn.addClass('disabled').removeClass('prev-show');
				}

				if (this.index !== this.groupData.length - 1) {
					this.nextBtn.removeClass('disabled');
				}

				srcPic = this.groupData[this.index].src;

				this.loadPicSize(srcPic);
			}

		},

		loadPicSize: function(sourceSrc) {
			var self = this;
			// 每一次点击时候的图片的宽高设为自动,保证下一次点的时候是新加载进来的图片宽高
			self.popupPic.css({
				"width": "auto",
				"hieght": "auto"
			}).hide();
			// this.picCaptionArea.hide();
			// 判断图片是否完成加载 加载完成就给  this.popupPic 图片上来,相应的获取宽高
			this.preLoadImg(sourceSrc, function() {
				self.popupPic.attr('src', sourceSrc); // 图片加载完成设置弹出框的图片的src
				var picWidth = self.popupPic.width();
				var picHeight = self.popupPic.height();
				console.log(picWidth + " : " + picHeight);
				// 改变图片的宽高
				self.changePic(picWidth, picHeight);
			});
		},

		changePic: function(picWidth, picHeight) {
			var self = this;
			// 获取当前视口的宽高
			var winWidth = $(window).width(),
				winHeight = $(window).height();

			// 如果图片的宽高大于浏览器视口的宽高,就看下图片的宽高是否溢出
			// 10 是图片的边框
			// 计算宽高比例 极端情况 图片与浏览器宽高相同
			var scale = Math.min(winWidth / (picWidth + 10), winHeight / (picHeight + 10));

			// 现在计算出来的宽高是 .lightbox-pic-view 的 div 宽高
			// 并不是图片的宽高,所以用的时候要减掉10个边框
			picWidth = picWidth * scale;
			picHeight = picHeight * scale;

			// 设置图片预览区域的过渡效果
			this.picViewArea.animate({
				"width": picWidth - 10,
				"height": picHeight - 10
			}, self.settings.speed);
			// 设置水平垂直居中
			this.popup.animate({
				"width": picWidth,
				"height": picHeight,
				"margin-left": -picWidth / 2,
				"top": (winHeight - picHeight) / 2 // (当前视口的高度-图片的高度) / 2
			}, self.settings.speed, function() {
				self.popupPic.css({
					"width": picWidth - 10,
					"height": picHeight - 10
				}).fadeIn();

				self.picCaptionArea.fadeIn();

				self.flag = true;
				self.clear = true;

			});

			// 设置描述文字和当前的索引
			this.captionText.text(this.groupData[this.index].caption);
			this.curIndex.text("当前索引: " + (this.index + 1) + " of " + this.groupData.length);

		},

		preLoadImg: function(sourceSrc, callback) {
			var img = new Image();
			// 判断是否是 IE 浏览器
			if (!!window.ActiveXObject) {
				img.onreadystatechange = function() {
					if (this.readyState === 'complete') {
						callback();
					}
				};
			} else {
				img.onload = function() {
					callback();
				};
			}

			img.src = sourceSrc;

		},

		initPopup: function(obj) {
			var sourceSrc = obj.data('source'),
				currentID = obj.data('id');

			// 显示遮罩层
			this.showMaskAndPopup(sourceSrc, currentID);
		},

		showMaskAndPopup: function(sourceSrc, currentID) {
			var self = this;
			// 首先隐藏图片和图片标题区域
			this.popupPic.hide();
			this.picCaptionArea.hide();

			// 显示遮罩层
			this.mask.fadeIn();

			// 获取当前视口的宽高
			var winWidth = $(window).width(),
				winHeight = $(window).height();


			// 设置图片预览区域的宽度高度(分别是视口宽度,高度的一半)
			// this.picViewArea 是内层的 .lightbox-pic-view
			this.picViewArea.css({
				"width": winWidth / 2,
				"height": winHeight / 2
			});

			var viewHeight = winHeight / 2 + 10;

			// 把弹出框显示出来,在设置宽度高度并且左右居中
			// this.popup 就是外层的 .lightbox-popup 所以需要加上5px的边框
			this.popup.fadeIn().css({
				// 10是边框的距离
				"width": winWidth / 2 + 10,
				"height": viewHeight,
				"margin-left": -(winWidth / 2 + 10) / 2, // 宽度的一半,把边框算在内,除以2就是水平方向居中
				"top": -viewHeight // 先设置到看不到的位置,所以是负的,在通过动画展现出来
			}).animate({
				"top": (winHeight - viewHeight) / 2 // 动画过渡到当前视口的垂直位置的中间(当前视口的高度-自身的高度)/2
			}, self.settings.speed, function() {
				// 加载图片
				self.loadPicSize(sourceSrc);
			});

			// 弹出的时候,通过根据当前元素的ID获取当前组别的索引值的位置判断是否显示上下切换的按钮
			// 这里不用$(this).index()的原因是,如果页面中的imgList列表中 加了其他的一些的标签
			// 此时的 index 就不准确了
			this.index = this.getIndex(currentID);
			var groupDataLength = this.groupData.length;
			// 一组里面是一张图片或者是第一张图片、最后一张图片 就不用显示按钮
			if (groupDataLength > 1) {
				// this.index为0 就说明他是组里面第张图片,那就禁用掉
				if (this.index === 0) {
					this.prevBtn.addClass('disabled');
					this.nextBtn.removeClass('disabled');
				} else if (this.index === groupDataLength - 1) { // 等于最后一张图片
					this.nextBtn.addClass('disabled');
					this.prevBtn.removeClass('disabled');
				} else {
					this.nextBtn.removeClass('disabled');
					this.prevBtn.removeClass('disabled');
				}
			}

		},

		getIndex: function(currentID) {
			var index = 0;
			$(this.groupData).each(function(i) {
				index = i;
				if (this.id === currentID) {
					return false; // 跳出循环
				}
			});
			return index;
		},

		getGroupData: function() {
			var self = this;
			// 清空数组数据
			self.groupData.length = 0;
			// 获取页面中相同组别的对象
			var aImgList = this.bodyNode.find('img[data-group=' + this.groupName + ']');
			aImgList.each(function() {
				self.groupData.push({
					"src": $(this).data('source'),
					"id": $(this).data('id'),
					"caption": $(this).data('caption')
				});
			});

		},

		renderDom: function() {
			var strDom = '<div class="lightbox-pic-view">' +
				'<span class="lightbox-btn prev"></span>' +
				'<img class="lightbox-img" src="" alt="" />' +
				'<span class="lightbox-btn next"></span>' +
				'</div>' +
				'<div class="lightbox-pic-caption">' +
				'<div class="lightbox-area">' +
				'<p class="lightbox-pic-desc"></p>' +
				'<span class="lightbox-of-index">当前索引: 0 of 0</span>' +
				'</div>' +
				'<span class="lightbox-close"></span>' +
				'</div>';

			// 插入到 this.popup ( 弹出层)
			this.popup.html(strDom);

			// 把遮罩和弹出框插入到 body
			this.bodyNode.append(this.mask, this.popup)
		}
	};

	window['LightBox'] = LightBox;

})(jQuery);
