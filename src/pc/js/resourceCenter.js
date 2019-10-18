 $(function () {

     // 根据URL 参数 触发
     let tabIdPage = GetQueryString("tabId") * 1 || 0;
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
         //  $("#rcCentreNev li").eq(tabIdPage).trigger('click');
         let pn = localStorage.getItem('pageNamber') || 1
         getPagesData(pn).then(function (obr) {
             let list = obr.body.newsList;
             let postInfo = localStorage.getItem('postInfo')

             if (list.length < 1) return;
             $(divId + "List").find('ul').html('')
             switch (tabIdPage) {
                 case 0:
                 case 1:
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
                     $.each(list, function (n, obj) {
                         $(divId + "List").find('ul').append(`<li>
                                <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img src="${obj.head_url}"
                                            alt=""></a></p>
                                <p class="ct">${obj.title}</p>
                                <p class="downLoad">
                                    <span class="dow"> <a class = "gotoApply"
                                    href="./applyLoding.html"
                                    style="distplay:${postInfo}"></a><a href="${obj.download_url}"
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
                 getPagesData(i);
                 localStorage.setItem('pageNamber', i)
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
         /**
          state： 与要跳转到的URL对应的状态信息。
          title： 不知道干啥用， 传空字符串就行了。
          url： 要跳转到的URL地址， 不能跨域。
          */
         history.replaceState('resourceCenter.html', '', 'resourceCenter.html?tabId=' + $(this).index());
         localStorage.removeItem('pageNamber')

         let ind = $(this).index();
         eqClick(ind)
         let divId = $(this).attr('name');
         tabIdPage = $(this).index()
         changeTabId(divId)
     })

     function eqClick(ind) {
         $("#rcCentreNev li").eq(ind).addClass('active').siblings('li').removeClass('active');
         $(".bannerConten .bannerCentre_1").eq(ind).addClass('active').siblings(
             '.bannerCentre_1').removeClass('active');
         $(".caseNewList .newList").eq(ind).addClass('active').siblings(
             '.newList').removeClass('active');
     }

     //初始化
     console.log('tabIdPage----', tabIdPage)
     switch (tabIdPage) {
         case 0:
             eqClick(0)
             changeTabId("#newPage");
             break;
         case 1:
             eqClick(1)
             changeTabId("#analyzePage");
             break;
         case 2:
             eqClick(2)
             changeTabId("#reportPage");
             break;
     }

 })