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
    var t = 0
    $(window).scroll(function () {
        var scrollT = $(this).scrollTop();
        if (t < scrollT) {
            //下滚
            if (scrollT > 100) {
                // $("#pageHeader").css('top', '-' + 44 + 'px')
                $("#pageHeader").stop(true).animate({
                    top: '-44px'
                }, 30)
            }
        } else {
            //上滚            
            let headTop = ($("#pageHeader").css('top')).substring(1, 3)
            if (headTop != 0) {
                $("#pageHeader").stop(true).animate({
                    top: 0
                }, 30)
            }
        }
        setTimeout(function () {
            t = scrollT;
        }, 0)


    })

})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// var apiUrl = 'http://192.168.1.243:5000/api/v1/'
var apiUrl = 'http://fzy2.smartdot.com:38080/api/v1/'