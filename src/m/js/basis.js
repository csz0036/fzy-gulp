$(function () {
  // 头部操作
  $("#head .button").on('click', function () {
    $(this).toggleClass('activeNav')
    $("#head .navListButton").toggleClass('activeNav')

  });
  $(".navListButton").on('click', 'li', function () {
    $(this).addClass('openList').siblings('li').removeClass('openList');

  })

  //获取URL参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

})