// 从服务器载入数据并且将返回的 HTML 代码并插入至 匹配的元素 中。
$('.shortcut > .w').load('./components/shortcut.html');
$('.header > .w').load('./components/header.html');
$('.fs-1').load('./components/menu.html');

$('.sliderWrapper').load('./components/sliderWrapper.html', function (res) {
    $(this).swiper({
        contentList: $(".focus-item__core"),
        type: "fade",
        width: 590,
        height: 470,
        spotsSize: 10,
        spotsPosition: "left",
        spotsColor: "#fff"
    })
});

$('.sliderBanner').load('./components/sliderBanner.html', function (res) {
    $(this).swiper({
        contentList: $(this).find(".focus-item__recommend"),
        type: "fade",
        width: 190,
        height: 470,
        showSpots: false,
        showChangeBtn: "hover"
    })
});

$('.fs-3 .user').load('./components/user.html');
$('.fs-3 .news').load('./components/news.html');
$('.fs-3 .service').load('./components/service.html');
$('.seckill .seckill-content .seckill-list').load('./components/seckillList.html', function () {
    $(this).swiper({
        contentList: $(".seckill-list-item"),
        type: "animate",
        isAuto: false,
        width: 800,
        height: 260,
        showSpots: false,
        showChangeBtn: "always"
    })
});
$('.seckill .seckill-content .seckill-brand').load('./components/seckillBrand.html', function () {
    $(this).swiper({
        contentList: $(".brand-item"),
        type: "animate",
        width: 180,
        height: 240,
        showChangeBtn: "hide",
        spotsSize: 6,
        spotsPosition: "center",
        spotsColor: "#e83632"
    })
});

// 京东秒杀倒计时
(function () {
    var endTime = new Date('2021-12-01 00:00');
    var timer = setInterval(function () {
            var curTime = new Date();
            // 得到剩余毫秒数
            var disTime = endTime.getTime() - curTime.getTime();
            if (disTime <= 0) {
                clearInterval(timer);
            } else {
                var days = parseInt(disTime / 1000 / 60 / 60 / 24);
                var hours = parseInt(disTime / 1000 / 60 / 60 % 24);
                var minutes = parseInt(disTime / 1000 / 60 % 60);
                var seconds = parseInt(disTime / 1000 % 60);
            }
            if (days < 10) {
                days = '0' + days;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            $('.seckill-count .timer__unit--day').text(days);
            $('.seckill-count .timer__unit--hour').text(hours);
            $('.seckill-count .timer__unit--minute').text(minutes);
            $('.seckill-count .timer__unit--second').text(seconds);
        },
        1000);
})()