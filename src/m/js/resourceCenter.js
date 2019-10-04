 $(function () {
     $("#resourceCenterNav span").on('click', function () {
         $(this).addClass('activet').parent('p').siblings('p').find("span").removeClass(
             'activet');
         let ind = $(this).parent('p').index();
         switch (ind) {
             case 0:
                 $("#titleText").text('公司新闻');
                 break;
             case 1:
                 $("#titleText").text('专业分析');
                 break;
             case 2:
                 $("#titleText").text('行业报告');
                 break;
         }
         $("#listScroll").find('.caseList').eq(ind).addClass('active').siblings().removeClass(
             'active')
     });

     let hadHeight = $("#head").height()
     let navFixed = $("#resourceCenterNav").offset().top - hadHeight
     $(window).scroll(function () {
         let scrollTop = $(this).scrollTop()
         let height = $(this).height()
         // 导航定位
         if (scrollTop > navFixed) {
             $(".navFixed").css({
                 "position": "fixed",
                 "top": hadHeight,
                 "left": 0
             })
         } else {
             $(".navFixed").css({
                 "position": "static",
             })
         }

         // 到底部加载下一页
         if (scrollTop + height == $(document).height()) {
             console.log('到底部了')
         }
     })


     //图片懒加载
     var lazyLoadImg = new LazyLoadImg({
         el: document.querySelector('#companyNewsWrap'),
         mode: 'default', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
         time: 300, // 设置一个检测时间间隔
         done: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
         position: { // 只要其中一个位置符合条件，都会触发加载机制
             top: 0, // 元素距离顶部
             right: 0, // 元素距离右边
             bottom: 0, // 元素距离下面
             left: 0 // 元素距离左边
         },
         before: function () {

         },
         success: function (el) {
             el.classList.add('success')
         },
         error: function (el) {
             el.src = './images/error.png'
         }
     })
     /**
      * 
      * type 0 = 公司新闻 / 1 = 专业分析 / 2 = 行业报告
      * page 默认 1
      * ele 插入的元素
      */
     function getData(type, page, ele) {
         $.ajax({
             url: "http://172.16.5.59:5000/api/v1/news/list",
             type: "get",
             dataType: "json",
             data: {
                 type: type,
                 page: page,
                 pageSize: 10
             },
             success: function (result) {
                 console.log('result----', result)
                 if (ele === 'companyNewsWrap') {
                     $.each(list, function (n, obj) {
                         $('#' + ele).append(`<li>
                                <a href="./detail.html?news_id=${obj.news_id}"><img class="listImg" src="./images/arrowsBlueRight.png" data-src="${obj.head_url}"
                                            alt=""></a>
                                <p class="listTitle">${obj.title}</p>
                                <p class = "listContent" >${obj.publish_time}< /p> 
                                <p class = "dow" > 下载文件 < /p>
                            </li>`)
                     });
                 } else {
                     $.each(list, function (n, obj) {
                         $('#' + ele).append(`<li>
                                <a href="./detail.html?news_id=${obj.news_id}"><img class="listImg" src="./images/arrowsBlueRight.png" data-src="${obj.head_url}"
                                            alt=""></a>
                                <p class="listTitle">${obj.title}</p>
                                <p class = "listContent" >${obj.publish_time}< /p> 
                            </li>`)
                     });
                 }

             }
         })
     }
     //获取URL参数
     function GetQueryString(name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if (r != null) return unescape(r[2]);
         return null;
     }

     if (GetQueryString('typeId') == 0 || !GetQueryString('typeId')) {
         getData(0, 1, 'companyNewsWrap')
     } else if (GetQueryString('typeId') == 1) {
         getData(1, 1, 'majorWrap')
     } else if (GetQueryString('typeId') == 2) {
         getData(2, 1, 'reportWrap')
     }




 })