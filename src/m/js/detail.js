$(function () {
    //获取URL参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    // 根据URL 参数 触发
    let tabIdPage = GetQueryString("news_id");
    if (tabIdPage) {
        $.ajax({
            url: apiUrl + "news/detail",
            type: "get",
            dataType: "json",
            data: {
                news_id: tabIdPage,
                page: 1,
                pageSize: 9
            },
            success: function (reuslt) {
                let {
                    title,
                    content,
                    publisher,
                    publish_time,
                    download_url
                } = reuslt.body.newsDetail;

                $("#titlePage").html(title)
                $("#contentAjax").html(content)
                // $("#publisher").html(publisher)
                // $("#publish_time").html(publish_time)
                // $(".download a").attr('href', download_url)
            }
        })
    }
})