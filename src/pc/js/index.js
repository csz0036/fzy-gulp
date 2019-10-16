 $(function () {
     // 底部轮播图
     var swiper = new Swiper('#scroll_13_box', {
         pagination: {
             clickable: true,
             el: '.logoScroll',
         },
     });

     function formatter(b, a) {
         return b.toFixed();
     }
     $(".upNumber").data("countToOptions", {
         formatter: function (b, a) {
             return b.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
         }
     });
     $(".upNumber").each(count);

     function count(a) {
         a = $.extend({},
             a || {},
             $(this).data("countToOptions") || {});
         $(this).countTo(a)
     };
     $(".item").hover(function () {
         $(this).find('.hoverShow').stop().animate({
             "top": "0"
         }, 300)
     }, function () {
         $(this).find('.hoverShow').stop().animate({
             "top": "260px"
         }, 300)
     });

     //焦点图
     $.ajax({
         url: apiUrl + "banner/list",
         type: "GET",
         dataType: "json",
         data: {
             page: 1,
             pageSize: 100
         },
         success: function (obr) {
             var list = obr.body.bannerList;
             $.each(list, function (n, obj) {
                 $("#swiperPlug").append(`<div class='swiper-slide'><img src="${obj.web_pic_url}"
                        width='100%' height='100%' /></div>`)
             });
             var mySwiper = new Swiper('.swiper-container', {
                 autoplay: true, // 自动播放
                 loop: true, // 循环模式选项

                 // 如果需要分页器
                 pagination: {
                     clickable: true,
                     el: '.swiper-pagination',
                 },
             })
         }
     })

     // 行业报告
     $.ajax({
         url: apiUrl + "news/list",
         type: "GET",
         dataType: "json",
         data: {
             page: 1,
             pageSize: 3,
             type: 2
         },
         success: function (obr) {
             let list = obr.body.newsList;
             $.each(list, function (n, obj) {
                 $("#reportList").append(`<li>
                                 <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img
                                             src="${obj.head_url}" alt="" width="290"
                                             height="160"></a></p>
                                 <p class="ct">${obj.title}</p>
                                 <p class="downLoad">
                                     <span class="ddow"><a href="${obj.download_url}" download="下载文件">下载文件</a></span>
                                     <span class="dtime">${obj.publish_time}</span>
                                 </p>
                             </li>`)
             });
         }
     });


     //滚动视差效果
     $(window).scroll(function () {
         let winTop = $(this).scrollTop()
         if (winTop > 150 && !$("#scroll_2_box").hasClass('scrollTopEle')) {
             $("#scroll_2_box").addClass('scrollTopEle')
         }
         if (winTop > 320 && !$("#scroll_3_box").hasClass('scrollTopEle')) {
             $("#scroll_3_box").addClass('scrollTopEle')
         }
         if (winTop > 720 && !$("#scroll_4_box").hasClass('scrollTopEle')) {
             $("#scroll_4_box").addClass('scrollTopEle')
         }
         if (winTop > 1150 && !$("#scroll_5_box").hasClass('scrollTopEle')) {
             $("#scroll_5_box").addClass('scrollTopEle')
         }
         if (winTop > 1700 && !$("#scroll_6_box").hasClass('scrollTopEle')) {
             $("#scroll_6_box").addClass('scrollTopEle')
         }
         if (winTop > 2420 && !$("#scroll_7_box").hasClass('scrollTopEle')) {
             $("#scroll_7_box").addClass('scrollTopEle')
         }
         if (winTop > 2600 && !$("#scroll_8_box").hasClass('scrollTopEle')) {
             $("#scroll_8_box").addClass('scrollTopEle')
         }
         if (winTop > 2800 && !$("#scroll_9_box").hasClass('scrollTopEle')) {
             $("#scroll_9_box").addClass('scrollTopEle')
         }
         if (winTop > 3100 && !$("#scroll_10_box").hasClass('scrollTopEle')) {
             $("#scroll_10_box").addClass('scrollTopEle')
         }
         if (winTop > 3500 && !$("#scroll_11_box").hasClass('scrollTopEle')) {
             $("#scroll_11_box").addClass('scrollTopEle')
         }
         if (winTop > 4000 && !$("#scroll_12_box").hasClass('scrollTopEle')) {
             $("#scroll_12_box").addClass('scrollTopEle')
         }
         if (winTop > 4100 && !$("#scroll_13_box").hasClass('scrollTopEle')) {
             $("#scroll_13_box").addClass('scrollTopEle')
         }
     })



 })