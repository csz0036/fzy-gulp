$(function () {
    //行业专属
    var swiper = new Swiper('#scrollWrap2', {
        slidesPerView: 'auto',
        // centeredSlides: true,
        freeMode: true,
        pagination: {
            el: '.scrollWrap2-swiper-pagination',
            clickable: true,
        },
    });

    //合作品牌
    var logoSwiper = new Swiper('#logoScroll', {
        loop: true,
        pagination: {
            el: '.swiper-pagination-logo',
        },
    });


    $.ajax({
        url: apiUrl + "banner/list",
        type: "GET",
        dataType: "json",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (result) {
            if (result.head.error == 0) {
                var list = result.body.bannerList;
                $.each(list, function (n, obj) {
                    $("#swiperPlug").append(
                        `<div class='swiper-slide'><a href="${obj.link_url}" target="_blank"><img src="${obj.h5_pic_url}"/></a></div>`)
                });
                //头部焦点图
                var swiper = new Swiper('#scrollWrap', {
                    loop: true, // 循环模式选项
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });
            } else {
                alert(result.head.message)
            }
        }
    })

    //去除HTML标签
    function matchReg(str) {
        let reg = /<\/?.+?\/?>/g;
        // console.log(str.replace(reg, ''));
        return str.replace(reg, '')
    }
    // 行业报告
    $.ajax({
        url: apiUrl + "news/list",
        type: "GET",
        dataType: "json",
        data: {
            page: 1,
            pageSize: 2,
            type: 2
        },
        success: function (obr) {
            if (obr.head.error == 0) {
                let list = obr.body.newsList;
                $.each(list, function (n, obj) {
                    $("#reportList").append(`<li>
                                <a href="./detail.html?news_id=${obj.news_id}">
                                    <img src="${obj.head_url}" alt="" class="listImg">
                                    <p class="liTitle">${obj.title}</p>
                                    <p class="liContent">${matchReg(obj.content)}</p>
                                </a>
                            </li>`)
                });
            } else {
                alert(obr.head.message)
            }

        }
    });
})