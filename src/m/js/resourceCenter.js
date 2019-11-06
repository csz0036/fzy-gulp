 $(function () {
     let contentId;
     let pageNumber = 1;
     $("#resourceCenterNav span").on('click', function () {
         $("#loding").show()
         localStorage.removeItem('pageNamber');
         localStorage.removeItem('totalPage')
         let ind = $(this).parent('p').index();
         $("#listScroll ul").html('');
         history.replaceState('resourceCenter.html', '', 'resourceCenter.html?tabId=' + ind);
         eqClass(ind)
         pageNumber = 1;
         $("html,body").animate({
             scrollTop: 0
         }, "fast");
         switch (ind) {
             case 0:
                 $("#titleText").text('新闻动态');
                 getData(0, 1, 'companyNewsWrap');
                 contentId = 'companyNewsWrap';
                 break;
             case 1:
                 $("#titleText").text('专业分析');
                 getData(1, 1, 'majorWrap')
                 contentId = 'majorWrap';
                 break;
             case 2:
                 $("#titleText").text('行业报告');
                 getData(2, 1, 'reportWrap')
                 contentId = 'reportWrap';
                 break;
         }
     });

     function eqClass(ind) {
         $("#resourceCenterNav p").eq(ind).find("span").addClass('activet').end().siblings('p').find("span").removeClass('activet');
         $("#listScroll").find('.caseList').eq(ind).addClass('active').siblings().removeClass('active');
     }

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
             if (pageNumber >= localStorage.getItem('totalPage')) {
                 return
             }
             pageNumber++
             getData($("#" + contentId).index(), pageNumber, contentId);
             localStorage.setItem('pageNamber', pageNumber)
             //  console.log('到底部了', contentId, $("#" + contentId).index() + 1, pageNumber)
         }
     })



     /**
      * 
      * type 0 = 新闻动态 / 1 = 专业分析 / 2 = 行业报告
      * page 默认 1
      * ele 插入的元素
      */
     function getData(type, page, ele) {

         $.ajax({
             url: apiUrl + "news/list",
             type: "get",
             dataType: "json",
             data: {
                 type: type,
                 page: page,
                 pageSize: 10
             },
             success: function (result) {
                 $("#loding").hide()
                 let totalPage = Math.ceil(result.body.total / 10);
                 localStorage.setItem('totalPage', totalPage)
                 // 大于总数之后不处理下面内容
                 if (page > totalPage) {
                     return
                 }

                 //内容加载
                 //  $('#' + ele).html('');
                 let list = result.body.newsList;
                 if (ele === 'reportWrap') {
                     $.each(list, function (n, obj) {
                         $('#' + ele).append(`<li>
                                <a href="./detail.html?news_id=${obj.news_id}"><img class="listImg" src="./images/error.png" data-src="${obj.head_url}"
                                            alt=""></a>
                                <p class="listTitle">${obj.title}</p>
                                <p class = "listContent" >${obj.publish_time}</p> 
                                <span class="dow"><a href="${obj.download_url}" target="_blank">在线预览</a></span>
                            </li>`)
                     });
                 } else {
                     $.each(list, function (n, obj) {
                         $('#' + ele).append(`<li>
                                <a href = "./detail.html?news_id=${obj.news_id}"> <img class="listImg" src="./images/error.png" data-src ="${obj.head_url}"
                                            alt=""></a>
                                <p class="listTitle">${obj.title}</p>
                                <p class = "listContent" >${obj.publish_time}</p> 
                            </li>`)
                     });
                 }
                 //图片懒加载
                 var lazyLoadImg = new LazyLoadImg({
                     //  el: document.querySelector('#companyNewsWrap'),
                     el: document.querySelector('body'),
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
                 lazyLoadImg.start() // 开启懒加载程序
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
     let pageTabId = GetQueryString('tabId')
     if (pageTabId == 0 || !pageTabId) {
         getData(0, 1, 'companyNewsWrap')
         eqClass(0)
         contentId = 'companyNewsWrap';
     } else if (pageTabId == 1) {
         getData(1, 1, 'majorWrap')
         eqClass(1)
         contentId = 'majorWrap';
     } else if (pageTabId == 2) {
         getData(2, 1, 'reportWrap')
         eqClass(2)
         contentId = 'reportWrap';
     }




 })