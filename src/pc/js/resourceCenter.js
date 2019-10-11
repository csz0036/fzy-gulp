 $(function () {
     $(".but > span").hover(function () {
         $(this).find('img').stop().animate({
             'margin-left': "18px"
         }, 300)
     }, function () {
         $(this).find('img').stop().animate({
             'margin-left': "10px"
         }, 300)
     });

     // 根据URL 参数 触发
     let tabIdPage = GetQueryString("tabId") - 1 || 0;
     $("#rcCentreNev li").eq(tabIdPage).trigger("click");

     function getPagesData(pageNumber) {
         return new Promise(function (resolve, reject) {
             //获取数据
             let page = pageNumber * 1 || 1
             $.ajax({
                 url: apiUrl + "news/list",
                 type: "get",
                 dataType: "json",
                 data: {
                     type: tabIdPage,
                     page: page,
                     pageSize: 9
                 },
                 success: function (obr) {
                     resolve(obr)
                 }
             })



         })
     }

     function changeTabId(divId) {
         getPagesData(0).then(function (obr) {
             let list = obr.body.newsList;

             if (list.length < 1) return;
             switch (tabIdPage) {
                 case 0:
                 case 1:
                     $(divId + "List").find('ul').html('')
                     $.each(list, function (n, obj) {
                         $(divId + "List").find('ul').append(`<li>
                                <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img src="${obj.head_url}"
                                            alt=""></a></p>
                                <p class="ct">${obj.title}</p>
                                <p class="downLoad">
                                    <span class="new">公司新闻</span>
                                    <span class="time">${obj.publish_time}</span>
                                </p>
                            </li>`)
                     });
                     break;
                 case 2:
                     $(divId + "List").find('ul').html('')
                     $.each(list, function (n, obj) {
                         $(divId + "List").find('ul').append(`<li>
                                <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img src="${obj.head_url}"
                                            alt=""></a></p>
                                <p class="ct">${obj.title}</p>
                                <p class="downLoad">
                                    <span class="dow"><a href="${obj.download_url}"
                                            download="下载文件">下载文件</a></span>
                                    <span class="time">${obj.publish_time}</span>
                                </p>
                            </li>`)
                     });
                     break;
             }


             /*
              * 定义回掉函数
              * @param number:跳转页
              * */
             function pageChange(i) {
                 Pagination.Page($(divId), i - 1, Math.ceil(obr.body.total / 9), 9);
                 getPagesData(i)
             }

             /*
              * 初始化插件
              * @param object:翻页容器对象
              * @param function:回调函数
              * */
             Pagination.init($(".ht-page"), pageChange);

             /*
              * 首次调用
              * @param object:翻页容器对象
              * @param number:当前页
              * @param number:总页数
              * @param number:每页数据条数
              * */

             // Pagination.Page($(divId), 1, 100, 9);
             Pagination.Page($(divId), 0, Math.ceil(obr.body.total / 9), 9);

         })
     }

     $("#rcCentreNev li").on('click', function () {
         $(this).addClass('active').siblings('li').removeClass('active');
         let ind = $(this).index();
         $(".bannerConten .bannerCentre_1").eq(ind).addClass('active').siblings(
             '.bannerCentre_1').removeClass('active');
         $(".caseNewList .newList").eq(ind).addClass('active').siblings(
             '.newList').removeClass('active');

         let divId = $(this).attr('name');
         tabIdPage = $(this).index()
         changeTabId(divId)
     })
     switch (tabIdPage) {
         case 0:
             changeTabId("#newPage");
             break;
         case 1:
             changeTabId("#analyzePage");
             break;
         case 2:
             changeTabId("#reportPage");
             break;
     }

 })