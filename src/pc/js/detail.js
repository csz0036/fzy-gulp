$(function () {

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
                console.log(reuslt)
                let {
                    title,
                    content,
                    publisher,
                    publish_time,
                    download_url
                } = reuslt.body.newsDetail;

                $("#titlePage").html(title)
                $("#contentAjax").html(content)
                $("#publisher").html(publisher)
                $("#publish_time").html(publish_time)
                if (download_url) {
                    $(".download").show().find('a').attr('href', download_url)
                } else {
                    $(".download").hide()
                }

            }
        })
    }

})