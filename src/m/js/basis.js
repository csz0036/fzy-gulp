var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f89837d60f6943bfc1d310429d9f8479";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();


$(function () {
  // 头部操作
  $("#head .button").on('click', function () {
    $(this).toggleClass('activeNav')
    $("#head .navListButton").toggleClass('activeNav')
    $("#head #hideHeadNav").toggleClass('activeNav')

  });
  $(".navListButton").on('click', 'li', function () {
    $(this).toggleClass('openList')
    $(this).siblings('li').removeClass('openList');
  })
  $("#hideHeadNav").on('click', function () {
    $(this).toggleClass('activeNav')
    $("#head .navListButton").toggleClass('activeNav')
    $("#head .button").toggleClass('activeNav')
  })

  //获取URL参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }


})

var apiUrl = 'http://fzy.smartdot.com/api/v1/'