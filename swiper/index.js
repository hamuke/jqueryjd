// 封装轮播图插件
// 轮播图构造函数
function Swiper(options, wrap) {
    // 轮播图所在位置
    this.wrap = wrap;
    // 轮播内容列表
    this.contentList = options.contentList || [];
    // 轮播时间
    this.autoChangeTime = options.autoChangeTime || 3000;
    // 轮播类型
    this.type = options.type || "fade";
    // 是否自动轮播
    this.isAuto = options.isAuto == undefined ? true : !!options.isAuto;
    // 是否显示左右轮播按钮
    this.showChangeBtn = options.showChangeBtn || "always";
    // 是否显示小圆点
    this.showSpots = options.showSpots == undefined ? true : !!options.showSpots;
    this.spotsSize = options.spotsSize || 5;
    this.spotsColor = options.spotsColor || "red";
    this.spotsPosition = options.spotsPosition || "center";
    // 轮播图大小
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    // 轮播项的长度
    this.len = this.contentList.length;
    // 当前索引
    this.curIndex = 0;
    // 定时器
    this.timer = null;
    // 是否正在轮播
    this.lock = false;
};

// 轮播图功能初始化
Swiper.prototype.init = function () {
    // 1.创建轮播图结构
    this.createElement();
    // 2.初始化样式
    this.initStyle();
    // 3.功能绑定
    this.bindEvent();
    // 是否自动轮播
    if (this.isAuto) {
        this.autoChange();
    }
};

// 1.创建轮播图结构
Swiper.prototype.createElement = function () {
    //整个轮播图的包裹层
    var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
    //轮播图内容区
    var swiperContent = $('<ul class="my-swiper-content"></ul>');
    //轮播图的左右切换按钮
    var leftBtn = $('<div class="my-swiper-btn my-swiper-left"><i class="iconfont">&#xe628;</i></div>');
    var rightBtn = $('<div class="my-swiper-btn my-swiper-right"><i class="iconfont">&#xe625;</i></div>');
    //轮播图小圆点区域
    var spotsContent = $('<div class="my-swiper-spots"></div>');
    //轮播内容项
    for (var i = 0; i < this.len; i++) {
        // 每一项添加对应的内容并添加到容器中，每一项对应一个小圆点
        $('<li class="my-swiper-item"></li>')
            .html(this.contentList[i])
            .appendTo(swiperContent);
        $('<span></span>').appendTo(spotsContent);
    }
    // 从左到右轮播，实现无缝衔接，在最后添加一项同第一项的内容
    if (this.type === "animate") {
        swiperContent.append(
            $('<li class="my-swiper-item"></li>')
            .html($(this.contentList[0]).clone(true))
        );
    }
    //设置左右按钮是否显示
    switch (this.showChangeBtn) {
        case "hide":
            leftBtn.hide();
            rightBtn.hide();
            break;
        case "hover":
            leftBtn.hide();
            rightBtn.hide();
            swiperWrapper.hover(function () {
                leftBtn.show();
                rightBtn.show();
            }, function () {
                leftBtn.hide();
                rightBtn.hide();
            })
            break;
        case "always":
            leftBtn.show();
            rightBtn.show();
            break;
        default:
            break;
    }
    //设置小圆点不显示
    if (!this.showSpots) {
        spotsContent.hide();
    };
    swiperWrapper
        .append(swiperContent)
        .append(leftBtn)
        .append(rightBtn)
        .append(spotsContent)
        .appendTo(this.wrap)
        .addClass('my-swiper-wrapper_' + this.type);
};

// 2.初始化样式
Swiper.prototype.initStyle = function () {
    //设置轮播内容区的整体大小
    // .find()方法允许我们能够通过查找DOM树中的这些元素的后代元素
    $(this.wrap).find('.my-swiper-content').css({
        //animate方式轮播的内容区宽度等于所有轮播内容宽度之和
        width: this.type === "animate" ?
            this.width * (this.len + 1) : this.width,
        height: this.height,
    }).find('.my-swiper-item').css({
        width: this.width,
        height: this.height,
    });
    // 如果是fade方式的轮播图，直接显示当前内容
    if (this.type === 'fade') {
        // .eq()方法从集合的一个元素中构造新的jQuery对象。所提供的索引标识这个集合中的元素的位置。
        $(this.wrap).find('.my-swiper-item')
            .eq(this.curIndex).show();
    } else {
        //animate方式需要调整位置
        $(this.wrap).find('.my-swiper-item')
            .css({
                left: -this.curIndex * this.width,
            });
    };
    //设置小圆点的样式
    $(this.wrap).find(".my-swiper-spots").css({
        textAlign: this.spotsPosition,
        display: this.showSpots ? 'block' : 'none',
    }).find("span").css({
        width: this.spotsSize,
        height: this.spotsSize,
    }).eq(this.curIndex % this.len).css({
        backgroundColor: this.spotsColor,
    });
};

// 3.功能绑定
Swiper.prototype.bindEvent = function () {
    var self = this;
    //点击左侧按钮
    $(this.wrap).find(".my-swiper-left").click(function () {
        //判断当前是否正在轮播,是则不进行操作，否则执行点击事件
        if (self.lock) {
            return;
        }
        self.lock = true;
        if (self.type === "fade") {
            if (self.curIndex === 0) {
                self.curIndex = self.len - 1;
            } else {
                self.curIndex--;
            }
            self.change();
        } else { //animate方式的轮播要实现无缝衔接会添加一张图片，与轮播项长度偏差1
            if (self.curIndex === 0) {
                $(self.wrap).find(".my-swiper-content").css({
                    left: -self.len * self.width,
                });
                self.curIndex = self.len - 1;
            } else {
                self.curIndex--;
            }
            self.change();
        }
    });
    // 点击右侧按钮
    $(this.wrap).find(".my-swiper-right").click(function () {
        if (self.lock) {
            return;
        }
        self.lock = true;
        if (self.type === "fade") {
            if (self.curIndex === self.len - 1) {
                self.curIndex = 0;
            } else {
                self.curIndex++;
            }
            self.change();
        } else { //animate方式的轮播要实现无缝衔接会添加一张图片，与轮播项长度偏差1
            if (self.curIndex === self.len) {
                $(self.wrap).find(".my-swiper-content").css({
                    left: 0,
                });
                self.curIndex = 1;
            } else {
                self.curIndex++;
            }
            self.change();
        }
    });
    //实现小圆点事件
    $(this.wrap).find(".my-swiper-spots").on('mouseenter', 'span', function () {
        if (self.lock) {
            return;
        }
        self.lock = true;
        // 获得鼠标移入当前小圆点的索引值
        var index = $(this).index();
        self.curIndex = index;
        self.change();
    });
    // 鼠标移入/移出 》》暂停播放/自动轮播
    $(this.wrap).mouseenter(function () {
        clearInterval(self.timer);
    }).mouseleave(function () { //再次判断是否自动轮播
        if (self.isAuto) {
            self.autoChange();
        }
    })
}

// 轮播图片效果切换
Swiper.prototype.change = function () {
    var self = this;
    if (this.type === "fade") {
        $(this.wrap).find(".my-swiper-item").fadeOut()
            .eq(this.curIndex).fadeIn(function () {
                self.lock = false;
            });
    } else {
        (this.wrap).find(".my-swiper-content").animate({
            left: -this.curIndex * this.width,
        }, function () {
            self.lock = false;
        });
    }
    // 小圆点背景颜色切换
    $(this.wrap).find(".my-swiper-spots > span").css({
        backgroundColor: "rgba(255,255,255,.4)",
    }).eq(this.curIndex % this.len).css({
        backgroundColor: this.spotsColor,
    });
}

// 自动轮播(触发右侧按钮的点击事件即可)
Swiper.prototype.autoChange = function () {
    var self = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        $(self.wrap).find(".my-swiper-right").trigger('click');
    }, self.autoChangeTime)
}

// 给JQ的实例对象扩展swiper方法用来添加轮播图
$.fn.extend({
    swiper: function (options) {
        // 存储当前轮播图的所有数据
        var obj = new Swiper(options, this);
        obj.init();
    },
});