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
    //为返回顶部元素添加点击事件
    $('body').on('click', '#return_top', function () {
        //将当前窗口的内容区滚动高度改为0，即顶部
        $("html,body").animate({
            scrollTop: 0
        }, "fast");
    });

})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}