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
                 // status == 0 ,是关闭状态
                 if (obj.status !== 0) {
                     $("#swiperPlug").append(`<div class='swiper-slide'><a href="${obj.link_url}" target="_blank"><img src="${obj.web_pic_url}"
                        width='100%' height='100%' /></a></div>`)
                 }
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
             type: 1
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
                                     <span class="ddow">专业分析</span>
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
         if (winTop > 1120 && !$("#scroll_4_box").hasClass('scrollTopEle')) {
             $("#scroll_4_box").addClass('scrollTopEle')
         }
         if (winTop > 1450 && !$("#scroll_5_box").hasClass('scrollTopEle')) {
             $("#scroll_5_box").addClass('scrollTopEle')
         }
         if (winTop > 2200 && !$("#scroll_14_box").hasClass('scrollTopEle')) {
             $("#scroll_14_box").addClass('scrollTopEle')
         }
         if (winTop > 2550 && !$("#scroll_6_box").hasClass('scrollTopEle')) {
             $("#scroll_6_box").addClass('scrollTopEle')
         }
         if (winTop > 2970 && !$("#scroll_7_box").hasClass('scrollTopEle')) {
             $("#scroll_7_box").addClass('scrollTopEle')
         }
         if (winTop > 3050 && !$("#scroll_8_box").hasClass('scrollTopEle')) {
             $("#scroll_8_box").addClass('scrollTopEle')
         }
         if (winTop > 3250 && !$("#scroll_9_box").hasClass('scrollTopEle')) {
             $("#scroll_9_box").addClass('scrollTopEle')
         }
         if (winTop > 3550 && !$("#scroll_10_box").hasClass('scrollTopEle')) {
             $("#scroll_10_box").addClass('scrollTopEle')
         }
         if (winTop > 3950 && !$("#scroll_11_box").hasClass('scrollTopEle')) {
             $("#scroll_11_box").addClass('scrollTopEle')
         }
         if (winTop > 4350 && !$("#scroll_12_box").hasClass('scrollTopEle')) {
             $("#scroll_12_box").addClass('scrollTopEle')
         }
         if (winTop > 4450 && !$("#scroll_13_box").hasClass('scrollTopEle')) {
             $("#scroll_13_box").addClass('scrollTopEle')
         }
     })



 })