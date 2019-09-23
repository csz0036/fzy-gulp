$(function () {
    $("#produvtNav").hover(function () {
        $("#productNavList").show()
    }, function () {
        $("#productNavList").hide()
    })
    //为返回顶部元素添加点击事件
    $('#return_top').click(function () {
        //将当前窗口的内容区滚动高度改为0，即顶部
        $("html,body").animate({
            scrollTop: 0
        }, "fast");
    });

})