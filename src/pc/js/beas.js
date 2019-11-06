//页面最顶部黑条滚动效果
var headroomJs = document.createElement('script');
headroomJs.type = 'text/javaScript';
if (window.location.pathname.indexOf('exampleList') == -1) {
    headroomJs.src = './js/headroom.min.js'; //  一级地址
} else {
    headroomJs.src = '../js/headroom.min.js'; //  一级地址
}

document.getElementsByTagName('head')[0].appendChild(headroomJs);

/**
 * 判断是否为IE
 */
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}
if (isIE()) {
    //IE支持Promise
    var script = document.createElement('script');
    script.type = 'text/javaScript';
    if (window.location.pathname.indexOf('exampleList') == -1) {
        script.src = './js/bluebird.min.js'; //  一级地址
    } else {
        script.src = '../js/bluebird.min.js'; //  一级地址
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}



$(function () {
    $("#produvtNav").hover(function () {
        $("#productNavList").show()
    }, function () {
        $("#productNavList").hide()
    })
    $("#resourceCentre").hover(function () {
        $("#resourceList").show()
    }, function () {
        $("#resourceList").hide()
    })
    $("#aboutCentre").hover(function () {
        $("#aboutList").show()
    }, function () {
        $("#aboutList").hide()
    })
    //为返回顶部元素添加点击事件
    $('body').on('click', '#return_top', function () {
        //将当前窗口的内容区滚动高度改为0，即顶部
        $("html,body").animate({
            scrollTop: 0
        }, "fast");
    });

    //顶部导航交互效果
    // var t = 0
    // $(window).scroll(function () {
    //     var scrollT = $(this).scrollTop();
    //     if (t < scrollT) {
    //         //下滚
    //         if (scrollT > 100) {
    //             // $("#pageHeader").css('top', '-' + 44 + 'px')
    //             $("#pageHeader").stop(true).animate({
    //                 top: '-44px'
    //             }, 30)
    //         }
    //     } else {
    //         //上滚            
    //         let headTop = ($("#pageHeader").css('top')).substring(1, 3)
    //         if (headTop != 0) {
    //             $("#pageHeader").stop(true).animate({
    //                 top: 0
    //             }, 30)
    //         }
    //     }
    //     setTimeout(function () {
    //         t = scrollT;
    //     }, 0)
    // })




    // $("#headTransform").Headroom({
    //     // 在元素没有固定之前，垂直方向的偏移量（以px为单位）
    //     offset: 0,
    //     // scroll tolerance in px before state changes
    //     tolerance: 0,
    //     // 对于每个状态都可以自定义css classes 
    //     classes: {
    //         // 当元素初始化后所设置的class
    //         initial: "headroom",
    //         // 向上滚动时设置的class
    //         pinned: "headroom--pinned",
    //         // 向下滚动时所设置的class
    //         unpinned: "headroom--unpinned"
    //     }
    // });




})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?42dc1b1c0bd9f1d4cd5743ba834c08dd";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


// var apiUrl = 'http://192.168.1.243:5000/api/v1/'
var apiUrl = 'http://fzy.smartdot.com/api/v1/'