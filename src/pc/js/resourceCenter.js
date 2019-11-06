 /**
  * ajax 请求
  * @param {*} type 请求类型  0：新闻动态 1：专业分析 2：行业报告
  * @param {*} page 默认 1
  */
 function getAjax(type, page) {
     return new Promise(function (resolve, reject) {
         //获取数据
         //  let page = pageNumber * 1 || 1
         $.ajax({
             url: apiUrl + "news/list",
             type: "get",
             dataType: "json",
             data: {
                 type: type,
                 page: page || 1,
                 pageSize: 9
             },
             success: function (result) {
                 if (result.head.error === 0) {
                     $("#loding").hide()
                     resolve(result.body)
                 } else {
                     reject(result.head.message)
                 }

             }
         })
     })
 }


 /**
  * 
  * @param {*} id  当前tab对应的ID
  * @param {*} page 具体页数
  */
 function appendDemo(id, page = 1) {
     getAjax(id, page).then((result) => {
         let listDate = result.newsList;
         switch (id) {
             case 0:
                 $("#newPageList").find('ul').html('')
                 $.each(listDate, function (n, obj) {
                     $("#newPageList").find('ul').append(`<li>
                                <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img src="${obj.head_url}"
                                            alt=""></a></p>
                                <p class="ct">${obj.title}</p>
                                <p class="downLoad">
                                    <span class="new">新闻动态</span>
                                    <span class="time">${obj.publish_time}</span>
                                </p>
                            </li>`)
                 });
                 /*
                  * 首次调用
                  * @param object:翻页容器对象
                  * @param number:当前页
                  * @param number:总页数
                  * @param number:每页数据条数
                  * */
                 Pagination.Page($('#newPage'), page * 1 - 1, result.total, 9);
                 break;
             case 1:
                 $("#analyzePageList").find('ul').html('')
                 $.each(listDate, function (n, obj) {
                     $("#analyzePageList").find('ul').append(`<li>
                                <p class="img"><a href="./detail.html?news_id=${obj.news_id}"><img src="${obj.head_url}"
                                            alt=""></a></p>
                                <p class="ct">${obj.title}</p>
                                <p class="downLoad">
                                    <span class="new">专业分析</span>
                                    <span class="time">${obj.publish_time}</span>
                                </p>
                            </li>`)
                 });
                 Pagination.Page($('#analyzePage'), page * 1 - 1, result.total, 9);
                 break;
             case 2:
                 $("#reportPageList").find('ul').html('')
                 $.each(listDate, function (n, obj) {
                     $("#reportPageList").find('ul').append(`<li>
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
                 Pagination.Page($('#reportPage'), page * 1 - 1, result.total, 9);
                 break;
         }
         /*
          * 初始化插件
          * @param object:翻页容器对象
          * @param function:回调函数
          * */
         Pagination.init($(".ht-page"), function (i) {
             Pagination.Page($('.ht-page'), i, result.total, 9);
             appendDemo(id, i * 1 + 1)
         });
     })
 }


 /**
  * 
  * @param {*} id tab 切换对应的ID
  */
 function tabChange(id) {
     //修改url不刷新页面
     history.replaceState('resourceCenter.html', '', 'resourceCenter.html?tabId=' + id);
     //demo操作
     $("#loding").show()
     $("#rcCentreNev li").eq(id).addClass('active').siblings('li').removeClass('active');
     $(".bannerConten .bannerCentre_1").eq(id).addClass('active').siblings('.bannerCentre_1').removeClass('active');
     $(".caseNewList .newList").eq(id).addClass('active').siblings('.newList').removeClass('active');

     //数据操作
     appendDemo(id)
 }

 // 根据URL 参数 触发
 let urlQueryId = GetQueryString("tabId") * 1 || 0;
 switch (urlQueryId) {
     case 0:
         // changeTabId("#newPage");
         tabChange(0)
         break;
     case 1:
         // changeTabId("#analyzePage");
         tabChange(1)
         break;
     case 2:
         // changeTabId("#reportPage");
         tabChange(2)
         break;
 }